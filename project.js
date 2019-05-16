const ctx = canvas.getContext("2d");

//draw planet
ctx.beginPath();
ctx.arc(100, 100, 80, 0, Math.PI*2);
ctx.fillStyle = "red";
ctx.fill();
//save non-clipped state.
ctx.save();
//clip range by planet area.
ctx.clip();
//draw shadow
ctx.beginPath();
ctx.arc(200, 200, 200, 0, Math.PI*2);
ctx.lineWidth = 100;
ctx.stroke();
//dispose clip range.
ctx.restore();