import { ParticleScene, dispatchSceneMessage } from "./particleScene";

const scene = new ParticleScene();

self.onmessage = ({ data }) => {
  dispatchSceneMessage(scene, data);
};
