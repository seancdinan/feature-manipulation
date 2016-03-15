// -----------------------------------------------------------
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var spotlight = new THREE.SpotLight();
spotlight.position.set(0,2000,2000);

scene.add(spotlight);	

var renderer = new THREE.WebGLRenderer({precision: 'lowp'});
console.log(renderer.info);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xeeeeee);
document.body.appendChild( renderer.domElement );


// -----------------------------------------------------------
var originBallGeo = new THREE.SphereGeometry(0.15, 10, 10);
var originMaterial = new THREE.MeshPhongMaterial({color: 0x404040});
var originBall = new THREE.Mesh(originBallGeo, originMaterial);
scene.add(originBall);

// -----------------------------------------------------------
var loader = new THREE.PLYLoader();
var teeth, pivot, holder;
loader.load('20160127-095722-FinalHighColorMesh.ply', function(geometry){
	geometry.computeFaceNormals();
	geometry.center();
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		vertexColors: THREE.VertexColors,
		shininess: 30,
		ambient: 0xededed,
		side: THREE.DoubleSide
	});

	teeth = new THREE.Mesh(geometry, material);
	teeth.name = 'teeth';

	teeth.scale.set(0.05,0.05,0.05);

	teeth.rotation.x = 3 * Math.PI / 2;
	teeth.rotation.z = - Math.PI / 2;
	//teeth.rotation.y = - Math.PI / 8;

	var box = new THREE.Box3().setFromObject(teeth);


	scene.add(teeth);


})



// -----------------------------------------------------------


// Mouse Control / Rotation
var mouse = new THREE.Vector2();
var raycaster, INTERSECTED, intersects, isMouseDown = false, clickCoords = [], teethSelect = false;
raycaster = new THREE.Raycaster();

function onDocumentMouseDown(event){
	isMouseDown = true;
	clickCoords[0] = mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	clickCoords[1] = mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	intersect = raycaster.intersectObjects(scene.children);

	if (intersect.length > 0){
		if (intersect[0].object.name == 'teeth'){
			teethSelect = true;
		}
	}
}

function onDocumentMouseMove(event){
	if (isMouseDown == true && teethSelect == true){
		var distanceMoved = [];
		distanceMoved[0] = clickCoords[0] - ((event.clientX / window.innerWidth) * 2 - 1);
		distanceMoved[1] = clickCoords[1] - (- (event.clientY / window.innerHeight) * 2 + 1);

		teeth.rotation.z -= 0.2 * distanceMoved[0];
		teeth.rotation.x += 0.2 * distanceMoved[1];
	}
}

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', function(){
	isMouseDown = false;
	teethSelect = false;
}, false);

// -----------------------------------------------------------
var render = function () {
	requestAnimationFrame( render );

	renderer.render(scene, camera);
};
render();