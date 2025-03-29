const canvas = document.querySelector('canvas');
const size = Math.min(window.innerWidth, window.innerHeight);
canvas.width = size;
canvas.height = size;

const illo = new Zdog.Illustration({
  element: canvas,
  dragRotate: true,
  zoom: 2,
});

new Zdog.Box({
  addTo: illo,
  width: 80,
  height: 80,
  depth: 80,
  stroke: false,
  color: '#C25',
  leftFace: '#EA0',
  rightFace: '#E62',
  topFace: '#ED0',
  bottomFace: '#636',
});

function animate() {
  illo.rotate.y += 0.03;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}
animate();