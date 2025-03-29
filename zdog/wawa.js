import Zdog from 'zdog';

const illo = new Zdog.Illustration({
  element: 'canvas',
  dragRotate: true,
  zoom: 2,
});

new Zdog.Shape({
  addTo: illo,
  stroke: 40,
  color: '#636',
});

function animate() {
  illo.rotate.y += 0.03;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}
animate();