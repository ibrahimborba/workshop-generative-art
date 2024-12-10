const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palletes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
	const colorCount = random.rangeFloor(1, 6)
	const pallete = random.shuffle(random.pick(palletes)).slice(0, colorCount);
  const count = 40;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.2;
        points.push({
          radius,
          position: [ u, v ],
					color: random.pick(pallete),
          rotation: random.noise2D(u, v),
        });
      }
    }
    return points;
  };

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 100;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
			const {
				position,
				radius,
				color,
        rotation
			} = data;
			const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, Math.abs(radius * width), 0, Math.PI * 2);
      // context.fillStyle = color;
      // context.fill();

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText('=', 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
