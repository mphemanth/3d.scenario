// Global variable
var img = null,
	needle = null,
	ctx = null,
	degrees = 0;

function clearCanvas_compass() {
	 // clear canvas
	ctx.clearRect(0, 0, 200, 200);
}

function draw_compass(angle) {

	clearCanvas_compass();

	// Draw the compass onto the canvas
	ctx.drawImage(img, 0, 0);

	// Save the current drawing state
	ctx.save();

	// Now move across and down half the 
	ctx.translate(100, 100);

	// Rotate around this point
	//ctx.rotate(degrees * (Math.PI / 180));
	ctx.rotate(angle);

	// Draw the image back and up
	ctx.drawImage(needle, -100, -100);

	// Restore the previous drawing state
	ctx.restore();

	// Increment the angle of the needle by 5 degrees
	//degrees += 5;
}

function imgLoaded() {
	// Image loaded event complete.  Start the timer
	setInterval(draw_compass, 100);
}

function init_compass() {
	// Grab the compass element
	var canvas = document.getElementById('compass');

	// Canvas supported?
	if (canvas.getContext('2d')) {
		ctx = canvas.getContext('2d');

		// Load the needle image
		needle = new Image();
		needle.src = 'textures/needle.png';

		// Load the compass image
		img = new Image();
		img.src = 'textures/compass.png';
		//img.onload = imgLoaded;
	} else {
		alert("Canvas not supported!");
	}
}
