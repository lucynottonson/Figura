const canvas = document.querySelector('canvas');
const scale = 0.8; 
const size = Math.min(window.innerWidth, window.innerHeight) * scale;
canvas.width = size;
canvas.height = size;
canvas.style.width = `${size}px`;
canvas.style.height = `${size}px`;

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