var objects = [];

var World = {
	vanishingPoint: 800
};

var PI = Math.PI;

var canvas = document.getElementById("renderCanvas");
canvas.width = document.getElementById("container").offsetWidth;
canvas.height = document.getElementById("container").offsetHeight;
var context = canvas.getContext("2d");

window.onresize = function(){
	canvas.width = document.getElementById("container").offsetWidth;
	canvas.height = document.getElementById("container").offsetHeight;
};

rotateAndRender();

function rotateAndRender(){
	
	for(var i = 0; i < 5; i++){
		objects.push(
			{
				 type: "point"
				,x: Math.random() * canvas.width * 2
				,y: 0
				,z: Math.random() * canvas.width * 2 - (canvas.width - canvas.height)
			}
		);
		
		//scale(objects[objects.length-1], canvas.width);
		transform(objects[objects.length-1], [0-canvas.width/2, World.vanishingPoint, 0-canvas.height/2]);
	}
	
	var i = objects.length;
	while(i--){
		if(objects[i].y < 0){
			objects.splice(i, 1);
		}
	}
	
	//console.log("Point count: "+objects.length);
	
	context.fillStyle = "rgba(0, 0, 0, 0.6)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	for(var i in objects){
		
		rotate(objects[i], [0, (PI/800), 0], [canvas.width/2, 400, canvas.height/2]);
		
		transform(objects[i], [0, -2, 0]);
		
		render(objects[i], canvas);
	}

	window.requestAnimationFrame(rotateAndRender);
	
}

function render(object, canvas){
	if(object.type == "point"){
		if(object.y < World.vanishingPoint && object.y > 0){
			var c = minmax(Math.round(255 * (object.y / World.vanishingPoint)), 0, 255);
			c = 255-c;
			//c = 255;
			context.fillStyle = "rgb("+c+", "+c+", "+c+")";
			context.fillRect(
				 (object.x + (1-(1/(5*(object.y / World.vanishingPoint)))) * (canvas.width/2 - object.x)) - 1
				,(object.z + (1-(1/(5*(object.y / World.vanishingPoint)))) * (canvas.height/2 - object.z)) - 1
				// Math.round(object.x + (object.y / World.vanishingPoint) * (canvas.width/2 - object.x))
				//,Math.round(object.z + (object.y / World.vanishingPoint) * (canvas.height/2 - object.z))
				,2 , 2
			);
		}
	}
}

function rotate(object, angles, center){

	var vector = {x: object.x - center[0], y: object.y - center[1], z: object.z - center[2]};
	
	// x axis
	vector.y = vector.y * Math.cos(angles[0]) - vector.z * Math.sin(angles[0]);
	vector.z = vector.y * Math.sin(angles[0]) + vector.z * Math.cos(angles[0]);
	
	// y axis
	vector.z = vector.z * Math.cos(angles[1]) - vector.x * Math.sin(angles[1]);
	vector.x = vector.z * Math.sin(angles[1]) + vector.x * Math.cos(angles[1]);
	
	// z axis
	vector.x = vector.x * Math.cos(angles[2]) - vector.y * Math.sin(angles[2]);
	vector.y = vector.x * Math.sin(angles[2]) + vector.y * Math.cos(angles[2]);
	
	object.x = center[0] + vector.x;
	object.y = center[1] + vector.y;
	object.z = center[2] + vector.z;
}

function scale(object, factor){
	object.x *= factor;
	object.y *= factor;
	object.z *= factor;
	
	return object;
}

function transform(object, coords){
	object.x += coords[0];
	object.y += coords[1];
	object.z += coords[2];
	
	return object;
}

function minmax(number, min, max){
	if(number < min){
		number = min;
	}
	if(number > max){
		number = max;
	}
	return number;
}


