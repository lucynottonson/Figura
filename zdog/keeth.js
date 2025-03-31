const canvas = document.querySelector('canvas');
canvas.classList.add('zdog-canvas');

const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

const illo = new Zdog.Illustration({
  element: canvas,
  dragRotate: true,
  zoom: 4,
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