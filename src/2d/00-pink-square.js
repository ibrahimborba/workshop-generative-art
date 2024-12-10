const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: 'A4',
  orientation: 'landscape',
  units: 'cm',
  pixelsPerInch: 300,

};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);
    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.2, 0, Math.PI * 2, false)
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = width * 0.02;
    context.strokeStyle = 'cyan';
    context.stroke();
  };
};

canvasSketch(sketch, settings);
