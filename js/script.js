// async function getOptions(options) {
// 	let responce = await fetch('options.json', {
// 		method: 'GET'
// 	});
// 	if (responce.ok) {
// 		const options = await responce.json();
// 		console.log('options:', options);
// 	} else {
// 		console.log('false');

//const { default: imask } = require("./imask");

// 	}
// }
// getOptions(options);

const options = JSON.parse(data)[0];
const myCanvas = document.getElementById("myCanvas");
// options = {
// 	data: {
// 		"Великолепно": 130,
// 		"Хорошо": 80,
// 		"Удовлетворительно": 65,
// 		"Разочарован": 12
// 	},
// 	colors: {
// 		"Великолепно": ["#FFE39C", "#FFBA9C"],
// 		"Хорошо": ["#6FCF97", "#66D2EA"],
// 		"Удовлетворительно": ["#BC9CFF", "#8BA4F9"],
// 		"Разочарован": ["#909090", "#3D4975"]
// 	}
// }
const conva = options.conva;
if (myCanvas) {
	var ctx = myCanvas.getContext('2d');
	ctx.height = myCanvas.getAttribute('height') || 150;
	ctx.width = myCanvas.getAttribute('width') || 300;
	var canvas = { start: ctx.height / 2, end: ctx.height / 2, radiusIn: ctx.height / 2 - 4, radiusOut: ctx.height / 2 }

	draw();
}

function draw() {
	let totalValue = 0;
	for (var categ in options.data) {
		let val = options.data[categ];
		totalValue += val;
	}

	let endAngle = -Math.PI / 2;
	for (sector in options.data) {
		startAngle = endAngle;
		endAngle -= 2 * Math.PI / totalValue * options.data[sector];

		ctx.fillStyle = '#ffffff';
		ctx.beginPath();
		ctx.moveTo(canvas.start, canvas.end);
		ctx.arc(canvas.start, canvas.end, canvas.radiusOut, startAngle, startAngle - conva * Math.PI / 360, true);
		ctx.closePath();
		ctx.fill();

		let linerGradient = ctx.createLinearGradient(canvas.start, canvas.end - canvas.radiusOut, canvas.start, canvas.end + canvas.radiusOut);
		linerGradient.addColorStop(0, options.colors[sector][0]);
		linerGradient.addColorStop(1, options.colors[sector][1]);
		ctx.fillStyle = linerGradient;
		ctx.beginPath();
		ctx.moveTo(canvas.start, canvas.end);
		ctx.arc(canvas.start, canvas.end, canvas.radiusOut, startAngle - conva * Math.PI / 360, endAngle + conva * Math.PI / 360, true);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = '#ffffff';
		ctx.beginPath();
		ctx.moveTo(canvas.start, canvas.end);
		ctx.arc(canvas.start, canvas.end, canvas.radiusOut, endAngle + conva * Math.PI / 360, endAngle, true);
		ctx.closePath();
		ctx.fill();
	}
	//ctx.fillRect(canvas.start, canvas.end, 30, -30);
	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	ctx.moveTo(canvas.start, canvas.end);
	ctx.arc(canvas.start, canvas.end, canvas.radiusIn, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();

	if (options.desc) {
		document.querySelector(`[for="${myCanvas.id}"]`).innerHTML = "<span>" + totalValue + "</span> голосов";
	}
}
// ==========================================================================================================================================================================================================================================
document.addEventListener('DOMContentLoaded', () => {
	const elements = document.querySelectorAll('[data-mask="phone"]')
	const maskOptions = {
		mask: Date,
		lazy: false,
		overwrite: true,
		autofix: true,
		blocks: {
			d: { mask: IMask.MaskedRange, placeholderChar: 'Д', from: 1, to: 31, maxLength: 2 },
			m: { mask: IMask.MaskedRange, placeholderChar: 'М', from: 1, to: 12, maxLength: 2 },
			Y: { mask: IMask.MaskedRange, placeholderChar: 'Г', from: 1900, to: 2999, maxLength: 4 }
		}
	}
	if (!elements) return
	elements.forEach((element) => {
		let mask = new IMask(element, maskOptions);
	});
});




