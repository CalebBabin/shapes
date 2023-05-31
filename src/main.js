import { createNoise3D } from 'simplex-noise';
import './main.css';

const noise3D = createNoise3D(Math.sin);

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');


function resize() {
	canvas.width = window.innerWidth * window.devicePixelRatio;
	canvas.height = window.innerHeight * window.devicePixelRatio;
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

	ctx.strokeStyle = '#999';
	ctx.lineWidth = 4;
	ctx.beginPath();
	const circleRadius = Math.min(cx, cy) * 0.1;
	const circlePoints = 64;
	const t = Date.now() * 0.00015;
	for (let i = 0; i < circlePoints; i++) {
		const angle = i / circlePoints * Math.PI * 2;
		let x = cx + Math.cos(angle) * circleRadius;
		let y = cy + Math.sin(angle) * circleRadius;
		const radiusModifier = noise3D(x * 0.01 + t, y * 0.01 + t, t);

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


const params = new URLSearchParams(window.location.search);
if (params.has('refresh')) {
	setTimeout(() => {
		window.location.reload();
	}, 1000 * 60 * 10);
}