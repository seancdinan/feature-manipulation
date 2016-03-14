var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var spotlight = new THREE.SpotLight();
spotlight.position.set(0,2000,2000);

scene.add(spotlight);	

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xeeeeee);
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
var cube = new THREE.Mesh( geometry, material );

cube.rotation.x -= 0.5;
cube.rotation.y -= 0.5;

scene.add( cube );

var render = function () {
	requestAnimationFrame( render );

	renderer.render(scene, camera);
};

// Mouse Control / Rotation
var mouse = new THREE.Vector2();
var raycaster, INTERSECTED;

raycaster = new THREE.Raycaster();


document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event){
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0){
		console.log(intersects[0])
		intersects[0].face.color.setHex(0x404040);
	}
}


render();