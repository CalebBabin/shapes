import { createNoise3D } from 'simplex-noise';
import './main.css';


const params = new URLSearchParams(window.location.search);
if (params.has('refresh')) {
	setTimeout(() => {
		window.location.reload();
	}, 1000 * 60 * 10);
}

function getPixelRatio () {
	return Number(params.get('pixelRatio')) || window.devicePixelRatio || 1;
}

const noise3D = createNoise3D(Math.sin);

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');


function resize() {
	canvas.width = window.innerWidth * getPixelRatio();
	canvas.height = window.innerHeight * getPixelRatio();
}
resize();
window.addEventListener('resize', resize);


let lastFrame = performance.now();
// Called once per frame
function draw() {
	window.requestAnimationFrame(draw);

	// number of seconds since the last frame was drawn
	const delta = Math.min(1, Math.max(0, (performance.now() - lastFrame) / 1000));
	lastFrame = performance.now();

	ctx.clearRect(0, 0, canvas.width, canvas.height);


	const cx = canvas.width / 2;
	const cy = canvas.height / 2;
	const cUnit = Math.min(cx, cy) * 0.01;

	ctx.strokeStyle = '#999';
	ctx.lineWidth = cUnit;
	ctx.beginPath();
	const circleRadius = Math.min(cx, cy) * 0.2;
	const circlePoints = 80;
	const t = Date.now() * 0.00015;
	for (let i = 0; i < circlePoints; i++) {
		const angle = i / circlePoints * Math.PI * 2;
		let x = cx + Math.cos(angle) * circleRadius;
		let y = cy + Math.sin(angle) * circleRadius;
		const radiusModifier = noise3D(x * 0.007 + t, y * 0.007 + t, t);

		x += Math.cos(angle) * radiusModifier * circleRadius * 0.1;
		y += Math.sin(angle) * radiusModifier * circleRadius * 0.1;

		if (i === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}
	}
	ctx.closePath();
	ctx.stroke();


}

draw();