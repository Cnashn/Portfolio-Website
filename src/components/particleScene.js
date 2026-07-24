const SHAPE_NAMES = ["photo", "logo"];
const PALETTE = ["#1cb9d7", "#6ee7ff", "#4c68d5", "#804dee"];

const PARTICLE_COUNT = 10000;
const Z_OFFSET = -7;
const FOV = Math.PI / 4;
const ROTATION_SPEED = 0.22;
const JITTER_STRENGTH = 0.07;
const JITTER_EASE = 0.06;
const JITTER_INTERVAL_BASE = 400;
const JITTER_INTERVAL_SPREAD = 1000;
const CURSOR_RADIUS_SQ = 1;
const CURSOR_PUSH = 0.5;
const SPAWN_SCALE = 1.4;
const SHAPE_INTERVAL = 6000;

const VERTEX_SHADER = `attribute vec3 a_position;
uniform mat4 u_matrix;

uniform float u_scale;
uniform mediump float u_z_offset;
varying mediump float v_z;
varying mediump float v_gradient;

float near = -0.5;
float far = 1.0;

void main() {
  vec4 transformed_position = u_matrix * vec4(a_position, 1.0);
  gl_Position = transformed_position;
  gl_PointSize = u_scale;

  float z = (transformed_position.z + u_z_offset);
  v_z = clamp((far - z) / (far - near), 0.0, 1.0);

  v_gradient = a_position.y / 2.0 + 0.5;
}`;

const FRAGMENT_SHADER = `precision mediump float;

varying float v_z;
varying float v_gradient;

uniform vec3 u_color_top;
uniform vec3 u_color_bottom;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5, 0.5);
  float dist = length(coord);
  if(dist > 0.5) {
    discard;
  }

  vec3 color = mix(u_color_bottom, u_color_top, v_gradient);
  float alpha = max(0.3, v_z);
  gl_FragColor = vec4(color * alpha, alpha);
}`;

const hexToRgb = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)]
    : null;
};

export class ParticleScene {
  mouse = [-1000, -1000];
  scroll = 0;

  #canvas;
  #containerInfo;
  #dpr = 1;
  #reduced = false;
  #colors = { top: PALETTE[0], bottom: PALETTE[1] };
  #history = [];
  #cache = new Map();
  #shape;
  #gl;
  #program;
  #projection = [];
  #shapeTimer;

  async init({ canvas, containerInfo, scroll, devicePixelRatio, reduced }) {
    this.#canvas = canvas;
    this.#containerInfo = containerInfo;
    this.#dpr = devicePixelRatio;
    this.#reduced = reduced ?? false;
    this.scroll = scroll;
    await this.#createScene();
  }

  set containerInfo(info) {
    this.#containerInfo = info;
    this.#resize();
  }

  set isVisible(visible) {
    if (this.#reduced) return;
    if (visible) this.#scheduleNextShape();
    else clearTimeout(this.#shapeTimer);
  }

  async loadNewShape() {
    if (!this.#gl) return;
    if (this.#history.length === SHAPE_NAMES.length) {
      this.#history = [this.#history.at(-1)];
    }
    const remaining = SHAPE_NAMES.filter((name) => !this.#history.includes(name));
    const name = remaining[Math.floor(Math.random() * remaining.length)];
    this.#history.push(name);
    if (!this.#cache.has(name)) {
      const response = await fetch(`/points/${name}.dat`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const buffer = await response.arrayBuffer();
      this.#cache.set(name, new Float32Array(buffer));
    }
    this.#shape = this.#cache.get(name);
  }

  destroy() {
    clearTimeout(this.#shapeTimer);
    this.#gl?.getExtension("WEBGL_lose_context")?.loseContext();
    this.#gl = undefined;
    this.#program = undefined;
  }

  async #createScene() {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    this.#pickColors();

    const gl = this.#canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) throw new Error("WebGL not supported");
    this.#gl = gl;
    this.#resize();
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);

    const start = performance.now();
    let last = performance.now();
    const frameTime = () => {
      const delta = (performance.now() - last) / 1000;
      last = performance.now();
      return [delta, performance.now() - start];
    };

    const vertexShader = this.#compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = this.#compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
    }
    this.#program = program;
    gl.useProgram(program);

    gl.uniform1f(gl.getUniformLocation(program, "u_z_offset"), Z_OFFSET);
    gl.uniform1f(gl.getUniformLocation(program, "u_scale"), this.#dpr * 2);
    this.#applyColors();

    await this.loadNewShape();
    if (!this.#shape) throw new Error("Shape was not loaded.");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = this.#shape[i * 3 + 0] * SPAWN_SCALE;
      positions[i * 3 + 1] = this.#shape[i * 3 + 1] * SPAWN_SCALE;
      positions[i * 3 + 2] = this.#shape[i * 3 + 2] + Z_OFFSET;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");

    let angle = 0;
    const rotationSpeed = this.#reduced ? 0 : ROTATION_SPEED;
    const jitterStrength = this.#reduced ? 0 : JITTER_STRENGTH;
    const jitterOffset = new Float32Array(PARTICLE_COUNT * 3);
    const jitterTarget = new Float32Array(PARTICLE_COUNT * 3);

    const updateParticles = (shape) => {
      const [delta, elapsed] = frameTime();
      angle += rotationSpeed * delta;
      const convergence = Math.min(2, delta * 8);

      let cos, sin;
      if (this.scroll <= 0) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
      } else {
        const turned = angle + Math.min(this.scroll, 500) / 100;
        cos = Math.cos(turned);
        sin = Math.sin(turned);
      }

      const mouseX = this.mouse[0] * 5;
      const mouseY = this.mouse[1] * 5;

      for (let i = 0; i < shape.length / 3; i++) {
        const j = i * 3;
        const toMouseX = positions[j] - mouseX;
        const toMouseY = positions[j + 1] - mouseY;
        const mouseDistSq = toMouseX * toMouseX + toMouseY * toMouseY;

        const interval = JITTER_INTERVAL_BASE + Math.sin(i) * JITTER_INTERVAL_SPREAD;
        if (Math.floor(elapsed / interval) % 2 === 0) {
          jitterTarget[j + 0] = Math.pow(Math.random(), 2) * jitterStrength;
          jitterTarget[j + 1] = Math.pow(Math.random(), 2) * jitterStrength;
          jitterTarget[j + 2] = Math.pow(Math.random(), 2) * jitterStrength;
        }
        jitterOffset[j + 0] += (jitterTarget[j + 0] - jitterOffset[j + 0]) * JITTER_EASE;
        jitterOffset[j + 1] += (jitterTarget[j + 1] - jitterOffset[j + 1]) * JITTER_EASE;
        jitterOffset[j + 2] += (jitterTarget[j + 2] - jitterOffset[j + 2]) * JITTER_EASE;

        const targetX = shape[j + 0] * cos - shape[j + 2] * sin + jitterOffset[j + 0];
        const targetY = shape[j + 1] + jitterOffset[j + 1];
        const targetZ = shape[j + 0] * sin + shape[j + 2] * cos + jitterOffset[j + 2];

        if (mouseDistSq < CURSOR_RADIUS_SQ) {
          const dist = Math.sqrt(mouseDistSq);
          const push = (1 - dist) * CURSOR_PUSH;
          positions[j + 0] += (toMouseX / dist) * push + jitterTarget[j + 0] / 2;
          positions[j + 1] += (toMouseY / dist) * push + jitterTarget[j + 1] / 2;
        } else {
          positions[j + 0] += (targetX - positions[j + 0]) * convergence;
          positions[j + 1] += (targetY - positions[j + 1]) * convergence;
          const currentZ = positions[j + 2] - Z_OFFSET;
          positions[j + 2] = currentZ + (targetZ - currentZ) * convergence + Z_OFFSET;
        }
      }
    };

    const render = () => {
      if (!this.#gl || !this.#shape) return;
      updateParticles(this.#shape);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      gl.uniformMatrix4fv(matrixLocation, false, this.#projection);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
      requestAnimationFrame(render);
    };
    render();

    if (!this.#reduced) this.#scheduleNextShape();
  }

  #scheduleNextShape() {
    clearTimeout(this.#shapeTimer);
    this.#shapeTimer = setTimeout(async () => {
      await this.loadNewShape();
      this.#scheduleNextShape();
    }, SHAPE_INTERVAL);
  }

  #resize() {
    const gl = this.#gl;
    if (!gl || !this.#containerInfo || !this.#canvas) return;
    this.#canvas.width = this.#containerInfo.width * this.#dpr;
    this.#canvas.height = this.#containerInfo.height * this.#dpr;
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.viewport(0, 0, this.#canvas.width, this.#canvas.height);
    gl.enable(gl.BLEND);
    this.#projection = this.#perspective(
      FOV,
      this.#canvas.width / this.#canvas.height,
      0.1,
      100
    );
  }

  #perspective(fov, aspect, near, far) {
    const f = 1 / Math.tan(fov / 2);
    const rangeInverse = 1 / (near - far);
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * rangeInverse, -1,
      0, 0, 2 * far * near * rangeInverse, 0,
    ];
  }

  #compileShader(type, source) {
    const gl = this.#gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile error: ${log}`);
    }
    return shader;
  }

  #pickColors() {
    const colors = [...PALETTE].sort(() => Math.random() - 0.5);
    this.#colors = { top: colors[0], bottom: colors[1] };
  }

  #applyColors() {
    this.#setColorUniform("u_color_top", this.#colors.top);
    this.#setColorUniform("u_color_bottom", this.#colors.bottom);
  }

  #setColorUniform(name, hex) {
    if (!this.#gl || !this.#program) return;
    const location = this.#gl.getUniformLocation(this.#program, name);
    const rgb = hexToRgb(hex).map((value) => value / 255);
    this.#gl.uniform3fv(location, rgb);
  }
}

export const dispatchSceneMessage = (scene, data) => {
  switch (data.type) {
    case "init":
      scene.init(data).catch((err) => console.error("[particles] init failed:", err));
      break;
    case "mouse":
      scene.mouse = data.position;
      break;
    case "resize":
      scene.containerInfo = data.containerInfo;
      break;
    case "scroll":
      scene.scroll = data.scroll;
      break;
    case "visibility":
      scene.isVisible = data.visible;
      break;
  }
};
