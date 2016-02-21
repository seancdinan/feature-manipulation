//*************************************************
//***************** COLOR SELECTOR ****************
//*************************************************
function colorDiv(target, color){
	target.material.color.setHex(color);
}

function pickEm(whichDropdown, whichBall){
	var selection = document.getElementById(whichDropdown);
	var colorValue = selection.options[selection.selectedIndex].value;
	colorDiv(whichBall, colorValue);
};

//*************************************************
//*****************  3D SECTION *******************
//*************************************************

//Set up the scene, the camera, and the renderer
	var testCanvas = document.getElementById('testCanvas');
	testCanvas.height = 700;
	testCanvas.width = 1200;


	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, testCanvas.width/testCanvas.height, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer({canvas: testCanvas, alpha: true});
	document.body.appendChild(renderer.domElement);
	renderer.setClearColor(0x444444)

// Make some shadows
var ambient = new THREE.AmbientLight(0x444444);
//scene.add(ambient);

light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 2 );
light.position.set( 0, 1500, 1000 );
light.target.position.set( 0, 0, 0 );

light.castShadow = true;

light.shadow.camera.near = 1200;
light.shadow.camera.far = 2500;
light.shadow.camera.fov = 50;


// The render loop will draw the scene at 60fps
function render(){
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

var geometry = new THREE.SphereGeometry(1.25, 20, 20);
var ball1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false}));
var ball2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false}));
var ball3 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false}));
var ball4 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false}));
var ball5 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false}));
scene.add(ball1, ball2, ball3, ball4, ball5, light);
ball1.position.x = -3; ball1.position.z = -5;
ball2.position.x = -1.5; ball2.position.z = -2.5;
ball3.position.x = 0; ball3.position.z = 0;
ball4.position.x = 1.5; ball4.position.z = -2.5;
ball5.position.x = 3; ball5.position.z = -5;
camera.position.set(0,0,10);
render();


//*************************************************
//***************** Mouse Control   ***************
//*************************************************
var isMouseDown;
var mouseDownPosition = [];
var mouseMovement = [];
var camX, camY;
document.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('mousedown', function(event){
	isMouseDown = true;
	mouseDownPosition[0] = event.clientX;
	mouseDownPosition[1] = event.clientY;
	});
document.addEventListener('mouseup', function(){isMouseDown = false;});


function onDocumentMouseMove(event){
	if (isMouseDown){
		mouseMovement[0] = event.clientX;
		mouseMovement[1] = event.clientY;
		camX = (mouseDownPosition[0] - mouseMovement[0])/window.innerWidth;
		camY = (mouseDownPosition[1] - mouseMovement[1])/window.innerHeight;
		if (Math.abs(camera.position.x + camX) < 4){
			camera.position.x += camX;
		}
		if (Math.abs(camera.position.y - camY) < 4){
			camera.position.y -= camY;
		}
	}

}































	
