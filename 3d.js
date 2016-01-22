/*var objects = [
	{
		 type: "point"
		,x: 0
		,y: 0
		,z: 0
	}
	,{
		 type: "point"
		,x: 0.5
		,y: 0
		,z: 0
	}
	,{
		 type: "point"
		,x: 1
		,y: 0
		,z: 0
	}
	,{
		 type: "point"
		,x: 0
		,y: 0
		,z: 0.5
	}
	,{
		 type: "point"
		,x: 0
		,y: 0
		,z: 1
	}
	,{
		 type: "point"
		,x: 1
		,y: 0
		,z: 0.5
	}
	,{
		 type: "point"
		,x: 0.5
		,y: 0
		,z: 1
	}
	,{
		 type: "point"
		,x: 1
		,y: 0
		,z: 1
	}
	,{
		 type: "point"
		,x: 0
		,y: 0.5
		,z: 0
	}
	,{
		 type: "point"
		,x: 0
		,y: 1
		,z: 0
	}
	,{
		 type: "point"
		,x: 0.5
		,y: 1
		,z: 0
	}
	,{
		 type: "point"
		,x: 1
		,y: 0.5
		,z: 0
	}
	,{
		 type: "point"
		,x: 1
		,y: 1
		,z: 0
	}
	,{
		 type: "point"
		,x: 0
		,y: 0.5
		,z: 1
	}
	,{
		 type: "point"
		,x: 0
		,y: 1
		,z: 0.5
	}
	,{
		 type: "point"
		,x: 0
		,y: 1
		,z: 1
	}
	,{
		 type: "point"
		,x: 0.5
		,y: 1
		,z: 1
	}
	,{
		 type: "point"
		,x: 1
		,y: 0.5
		,z: 1
	}
	,{
		 type: "point"
		,x: 1
		,y: 1
		,z: 0.5
	}
	,{
		 type: "point"
		,x: 1
		,y: 1
		,z: 1
	}
];
*/

var objects = [];

var World = {
	vanishingPoint: 800
};

var PI = Math.PI;

setInterval(rotateAndRender, 10);

function rotateAndRender(){
	
	for(var i = 0; i < 2; i++){
		objects.push(
			{
				 type: "point"
				,x: Math.random()
				,y: Math.random()
				,z: Math.random()
			}
		);
		
		scale(objects[objects.length-1], 1200);
		transform(objects[objects.length-1], [-300, 900, -300]);
	}
	
	var i = objects.length;
	while(i--){
		if(objects[i].y < 0){
			objects.splice(i, 1);
		}
	}
	
	//console.log("Point count: "+objects.length);
	
	var canvas = document.getElementById('renderCanvas');
	var context = canvas.getContext("2d");
	//context.fillStyle = "rgba(0, 0, 0, 0.1)";
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	for(var i in objects){
		//rotate(objects[i], [PI/80, PI/110, PI/210], [300, 400, 300]);
		//rotate(objects[i], [(PI/910), (PI/1320), (PI/600)], [600, 400, 600]);
		//transform(objects[i], [0, 2, -0.5]);
		
		rotate(objects[i], [0, (PI/800), 0], [300, 400, 300]);
		
		//transform(objects[i], [0, 0, Math.sin((objects[i].y / World.vanishingPoint)*5)*2]);
		
		transform(objects[i], [0, -2, 0]);
		
		render(objects[i], canvas);
	}
}

function render(object, canvas){
	var context = canvas.getContext("2d");
	if(object.type == "point"){
		if(object.y < World.vanishingPoint && object.y > 0){
			var c = minmax(Math.round(255 * (object.y / World.vanishingPoint)), 0, 255);
			c = 255-c;
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


