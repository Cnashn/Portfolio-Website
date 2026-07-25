// Interactive 3D particle hero built following Mat Simon's technique:
// https://www.matsimon.dev/blog/building-an-interactive-3d-hero-animation
// The curly-brackets, iMac and heart point clouds are Mat Simon's own shape
// assets (files.matsimon.dev). Thanks to Mat Simon for the approach and shapes.
const SHAPE_NAMES = ["logo", "brackets", "imac"];
const HEART_SHAPE = "heart"; // hidden shape revealed by the name-click easter egg
const COLOR_PURPLE = "#804dee";
const COLOR_BLUE = "#1cb9d7";
// One of these is picked per page load, so the gradient reads either way up.
const COLOR_PRESETS = [
  { top: COLOR_PURPLE, bottom: COLOR_BLUE },
  { top: COLOR_BLUE, bottom: COLOR_PURPLE },
];

const PARTICLE_COUNT = 30000;
const Z_OFFSET = -7;
const Z_DIST = -Z_OFFSET;
const FOV = Math.PI / 4;
const ROTATION_SPEED = 0.14;
const JITTER_STRENGTH = 0.07;
const JITTER_EASE_RATE = 3.71;
const JITTER_INTERVAL_BASE = 400;
const JITTER_INTERVAL_SPREAD = 1000;
const CONVERGE_RATE = 8.59;
const MAX_DELTA = 1 / 30;
const CURSOR_RADIUS_SQ = 0.5;
const CURSOR_RADIUS = Math.sqrt(CURSOR_RADIUS_SQ);
const CURSOR_PUSH = 0.5;
const SPAWN_SCALE = 1.4;
const MODEL_SCALE = 1.5;
const SHAPE_INTERVAL = 6000;
// `chroma` terminal command: light flowing up the model, colour only. A cosine
// in model height scrolls upward, and the shader blends the resting gradient
// coordinate toward it. Every colour produced is still a mix of the two preset
// colours, so the wave never leaves the palette.
const WAVE_PERIOD = 2800; // ms for one wavelength to travel the model
const WAVE_CYCLES = 3;
export const WAVE_DURATION = WAVE_PERIOD * WAVE_CYCLES;
// Amplitude is how far the wave pulls the gradient off its resting shape.
const WAVE_AMPLITUDE = 0.9;
const WAVE_FADE = 600; // ms of eased ramp in and out, so it never pops
// Stops the wave runs through, anchored at both ends by the brand colours. The
// warm three are the terminal's own traffic-light colours, so the palette is
// drawn from the site rather than invented. Only WAVE_SPAN of the ramp is on
// the model at once, so it reads as light flowing through, not as fixed bands.
export const WAVE_PALETTE = [
  "#1cb9d7", // brand cyan
  "#28c840", // green
  "#febc2e", // yellow
  "#ff8f3f", // orange
  "#ff5f57", // red
  "#804dee", // brand purple
];
const WAVE_SPAN = 0.5;

const hexToRgb = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)]
    : null;
};

const glslVec3 = (hex) =>
  `vec3(${hexToRgb(hex)
    .map((value) => (value / 255).toFixed(4))
    .join(", ")})`;

// Cumulative mixes, each eased, so the ramp is smooth across stops rather than
// showing a crease at every one. The last stop wraps to the first, which is
// what lets the wave repeat without a seam.
const WAVE_RAMP = WAVE_PALETTE.map(
  (_, i) =>
    `  c = mix(c, ${glslVec3(
      WAVE_PALETTE[(i + 1) % WAVE_PALETTE.length]
    )}, smoothstep(0.0, 1.0, clamp(t - ${i}.0, 0.0, 1.0)));`
).join("\n");

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
uniform float u_wave_phase;
uniform float u_wave_amp;

const float WAVE_SPAN = ${WAVE_SPAN.toFixed(4)};

vec3 wavePalette(float x) {
  float t = fract(x) * ${WAVE_PALETTE.length}.0;
  vec3 c = ${glslVec3(WAVE_PALETTE[0])};
${WAVE_RAMP}
  return c;
}

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5, 0.5);
  float dist = length(coord);
  if(dist > 0.5) {
    discard;
  }

  vec3 color = mix(u_color_bottom, u_color_top, v_gradient);

  // v_gradient is the particle's height in the model, 0 at the bottom, so
  // subtracting the phase makes the ramp travel upward and each particle
  // changes purely as a function of its own height. Uniform branch, so the
  // resting colour path is untouched while the wave is not running.
  if (u_wave_amp > 0.0) {
    color = mix(color, wavePalette(v_gradient * WAVE_SPAN - u_wave_phase), u_wave_amp);
  }
  float alpha = max(0.3, v_z);
  gl_FragColor = vec4(color * alpha, alpha);
}`;


export class ParticleScene {
  mouse = [-1000, -1000];
  scroll = 0;

  #canvas;
  #containerInfo;
  #dpr = 1;
  #reduced = false;
  #colors = COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)];
  #history = [];
  #cache = new Map();
  #shape;
  #shapeName;
  #gl;
  #program;
  #projection = [];
  #shapeTimer;
  #burstPending = false;
  #chromaPending = false;

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
    this.#shapeName = name;
  }

  burst() {
    if (!this.#gl) return;
    const heart = this.#cache.get(HEART_SHAPE);
    if (heart) {
      this.#shape = heart;
      this.#shapeName = HEART_SHAPE;
    }
    this.#burstPending = true;
    if (!this.#reduced) this.#scheduleNextShape();
  }

  chroma() {
    if (!this.#gl) return;
    this.#chromaPending = true;
  }

  destroy() {
    clearTimeout(this.#shapeTimer);
    this.#gl?.getExtension("WEBGL_lose_context")?.loseContext();
    this.#gl = undefined;
    this.#program = undefined;
  }

  async #createScene() {
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    const gl = this.#canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) throw new Error("WebGL not supported");
    this.#gl = gl;
    this.#resize();
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);

    // Seeded from the first frame timestamp: in a worker the rAF clock does not
    // necessarily share an origin with performance.now().
    let start = -1;
    let last = -1;
    const frameTime = (now) => {
      if (start < 0) {
        start = now;
        last = now;
      }
      const delta = Math.min((now - last) / 1000, MAX_DELTA);
      last = now;
      return [delta, now - start];
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
    gl.uniform1f(gl.getUniformLocation(program, "u_scale"), this.#dpr * 1.4);
    const wavePhaseLocation = gl.getUniformLocation(program, "u_wave_phase");
    const waveAmpLocation = gl.getUniformLocation(program, "u_wave_amp");
    gl.uniform1f(wavePhaseLocation, 0);
    gl.uniform1f(waveAmpLocation, 0);
    this.#applyColors();

    await this.loadNewShape();
    if (!this.#shape) throw new Error("Shape was not loaded.");

    // Preload the hidden heart shape for the name-click easter egg.
    fetch(`/points/${HEART_SHAPE}.dat`)
      .then((r) => (r.ok ? r.arrayBuffer() : null))
      .then((b) => b && this.#cache.set(HEART_SHAPE, new Float32Array(b)))
      .catch(() => {});

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = this.#shape[i * 3 + 0] * SPAWN_SCALE * MODEL_SCALE;
      positions[i * 3 + 1] = this.#shape[i * 3 + 1] * SPAWN_SCALE * MODEL_SCALE;
      positions[i * 3 + 2] = this.#shape[i * 3 + 2] * MODEL_SCALE + Z_OFFSET;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");

    let angle = 0;
    let waveStart = -1;
    const rotationSpeed = this.#reduced ? 0 : ROTATION_SPEED;
    const jitterStrength = this.#reduced ? 0 : JITTER_STRENGTH;
    const jitterOffset = new Float32Array(PARTICLE_COUNT * 3);
    const jitterTarget = new Float32Array(PARTICLE_COUNT * 3);
    const jitterBucket = new Int32Array(PARTICLE_COUNT).fill(-1);

    const updateParticles = (shape, now) => {
      const [delta, elapsed] = frameTime(now);
      angle += rotationSpeed * delta;
      const convergence = 1 - Math.exp(-CONVERGE_RATE * delta);
      const jitterEase = 1 - Math.exp(-JITTER_EASE_RATE * delta);

      if (this.#burstPending) {
        this.#burstPending = false;
        for (let k = 0; k < positions.length; k += 3) {
          const px = positions[k];
          const py = positions[k + 1];
          const pz = positions[k + 2] - Z_OFFSET;
          const d = Math.hypot(px, py, pz) || 0.001;
          const kick = 1.4 + Math.random() * 1.0;
          positions[k] += (px / d) * kick;
          positions[k + 1] += (py / d) * kick;
          positions[k + 2] += (pz / d) * kick * 0.6;
        }
      }

      // The rAF clock is the only timebase shared with the worker, so the wave
      // is driven off `elapsed` rather than performance.now(). Re-triggering
      // mid-wave would jump the phase, so a wave in flight swallows it.
      if (this.#chromaPending) {
        this.#chromaPending = false;
        if (waveStart < 0) waveStart = elapsed;
      }
      if (waveStart >= 0) {
        const t = elapsed - waveStart;
        if (t >= WAVE_DURATION) {
          waveStart = -1;
          gl.uniform1f(waveAmpLocation, 0);
        } else {
          // Phase wraps every period; the cosine is 2*pi-periodic, so the wrap
          // cannot be seen and each cycle flows into the next.
          const ramp = Math.min(1, t / WAVE_FADE, (WAVE_DURATION - t) / WAVE_FADE);
          gl.uniform1f(wavePhaseLocation, (t / WAVE_PERIOD) % 1);
          gl.uniform1f(waveAmpLocation, ramp * ramp * (3 - 2 * ramp) * WAVE_AMPLITUDE);
        }
      }

      // The CS logo never rotates (always front-facing, always readable);
      // brackets and iMac keep the full spin.
      const activeAngle = this.#shapeName === "logo" ? 0 : angle;

      let cos, sin;
      if (this.#shapeName === "logo" || this.scroll <= 0) {
        cos = Math.cos(activeAngle);
        sin = Math.sin(activeAngle);
      } else {
        const turned = activeAngle + Math.min(this.scroll, 500) / 100;
        cos = Math.cos(turned);
        sin = Math.sin(turned);
      }

      const mouseX = this.mouse[0] * 5;
      const mouseY = this.mouse[1] * 5;

      for (let i = 0; i < shape.length / 3; i++) {
        const j = i * 3;
        const currentZ = positions[j + 2] - Z_OFFSET;
        // The cursor field follows the view ray instead of the world Z axis. A
        // world-aligned field meets the near and far sides of a shape at two
        // different screen positions, which reads as two separate holes.
        const depth = (Z_DIST - currentZ) / Z_DIST;
        const cursorRadius = CURSOR_RADIUS * depth;
        const toMouseX = positions[j] - mouseX * depth;
        const toMouseY = positions[j + 1] - mouseY * depth;
        const mouseDistSq = toMouseX * toMouseX + toMouseY * toMouseY;

        // One new target per interval, not one per frame: easing toward a value
        // that is re-rolled every frame is what made the particles buzz.
        const interval =
          JITTER_INTERVAL_BASE + (Math.sin(i) * 0.5 + 0.5) * JITTER_INTERVAL_SPREAD;
        const bucket = (elapsed / interval) | 0;
        if (bucket !== jitterBucket[i]) {
          jitterBucket[i] = bucket;
          jitterTarget[j + 0] = Math.pow(Math.random(), 2) * jitterStrength;
          jitterTarget[j + 1] = Math.pow(Math.random(), 2) * jitterStrength;
          jitterTarget[j + 2] = Math.pow(Math.random(), 2) * jitterStrength;
        }
        jitterOffset[j + 0] += (jitterTarget[j + 0] - jitterOffset[j + 0]) * jitterEase;
        jitterOffset[j + 1] += (jitterTarget[j + 1] - jitterOffset[j + 1]) * jitterEase;
        jitterOffset[j + 2] += (jitterTarget[j + 2] - jitterOffset[j + 2]) * jitterEase;

        const targetX = (shape[j + 0] * cos - shape[j + 2] * sin) * MODEL_SCALE + jitterOffset[j + 0];
        const targetY = shape[j + 1] * MODEL_SCALE + jitterOffset[j + 1];
        const targetZ = (shape[j + 0] * sin + shape[j + 2] * cos) * MODEL_SCALE + jitterOffset[j + 2];

        // Cursor influence tapers across the whole radius and is blended against
        // the pull back to target rather than replacing it. Switching between the
        // two left a zero-force surface at the rim that particles could reach but
        // never leave, packing them into a tube spanning the depth of the cloud.
        let influence = 0;
        if (mouseDistSq < cursorRadius * cursorRadius) {
          const dist = Math.max(Math.sqrt(mouseDistSq), 1e-4);
          const edge = 1 - dist / cursorRadius;
          influence = edge * edge * (3 - 2 * edge);
          const push = (1 - dist) * CURSOR_PUSH * influence;
          positions[j + 0] += (toMouseX / dist) * push + (jitterOffset[j + 0] / 2) * influence;
          positions[j + 1] += (toMouseY / dist) * push + (jitterOffset[j + 1] / 2) * influence;
        }

        const pull = convergence * (1 - influence);
        positions[j + 0] += (targetX - positions[j + 0]) * pull;
        positions[j + 1] += (targetY - positions[j + 1]) * pull;
        positions[j + 2] = currentZ + (targetZ - currentZ) * pull + Z_OFFSET;
      }
    };

    const render = (now = performance.now()) => {
      if (!this.#gl || !this.#shape) return;
      updateParticles(this.#shape, now);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions);
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
    const pad = this.#containerInfo.pad ?? 1;
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
    this.#projection[0] *= 1 / pad;
    this.#projection[5] *= 1 / pad;
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
    case "burst":
      scene.burst();
      break;
    case "chroma":
      scene.chroma();
      break;
  }
};
