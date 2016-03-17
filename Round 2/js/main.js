// -----------------------------------------------------------
// Do the standard scene setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var spotlight = new THREE.SpotLight();
spotlight.position.set(0,2000,2000);

scene.add(spotlight);	

var renderer = new THREE.WebGLRenderer({precision: 'lowp'});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xeeeeee);
document.body.appendChild( renderer.domElement );


// -----------------------------------------------------------
// Create the ball that gets placed places
var originBallGeo = new THREE.SphereGeometry(0.15, 10, 10);
var originMaterial = new THREE.MeshPhongMaterial({color: 0x404040, transparent: true, opacity: 0.5, visible: false});
var originBall = new THREE.Mesh(originBallGeo, originMaterial);
// scene.add(originBall);

// -----------------------------------------------------------
// Load in the 3D model
var loader = new THREE.PLYLoader();
var teeth, pivot, holder;
loader.load('monkey.ply', function(geometry){
	geometry.computeFaceNormals();
	geometry.center();
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		vertexColors: THREE.VertexColors,
		shininess: 30,
		side: THREE.DoubleSide
	});

	teeth = new THREE.Mesh(geometry, material);
	teeth.name = 'teeth';

	teeth.scale.set(1,1,1);

	//teeth.rotation.x = 3 * Math.PI / 2;
	//teeth.rotation.z = - Math.PI / 2;

	var box = new THREE.Box3().setFromObject(teeth);

	scene.add(teeth);

})

// -----------------------------------------------------------
// Dropable Options
var optionMap1 = new THREE.TextureLoader().load('./img/option1.png');
var optionMap2 = new THREE.TextureLoader().load('./img/option2.png');
var optionMap3 = new THREE.TextureLoader().load('./img/option3.png');
optionMap1.minFilter = THREE.LinearFilter 
optionMap2.minFilter = THREE.LinearFilter 
optionMap3.minFilter = THREE.LinearFilter 

var material1 = new THREE.SpriteMaterial({map: optionMap1, color: 0xffffff});
var material2 = new THREE.SpriteMaterial({map: optionMap2, color: 0xffffff});
var material3 = new THREE.SpriteMaterial({map: optionMap3, color: 0xffffff});

var option1 = new THREE.Sprite(material1);
var option2 = new THREE.Sprite(material2);
var option3 = new THREE.Sprite(material3);

option1.name = 'option1';
option2.name = 'option2';
option3.name = 'option3';

option1.position.set(-2, 3, 0);
option2.position.set(0, 3, 0);
option3.position.set(2, 3, 0);

scene.add(option1, option2, option3);

// -----------------------------------------------------------
// Mouse Control / Rotation
var mouse = new THREE.Vector2();
var raycaster, INTERSECTED, intersects, isMouseDown = false, clickCoords = [], teethSelect = false, newOption, placingOption = false;;
raycaster = new THREE.Raycaster();

var there = false;


function onDocumentMouseDown(event){
	isMouseDown = true;
	clickCoords[0] = mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	clickCoords[1] = mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	intersect = raycaster.intersectObjects(scene.children);

	if (intersect.length > 0){
		if (intersect[0].object.name == 'teeth'){
			teethSelect = true;
			if (there == false){
				var spot = intersect[0].object.worldToLocal(intersect[0].point);
				console.log('Spot: ', spot);
				scene.add(originBall);
				teeth.add(originBall);
				originBall.position.set(
					spot.x,
					spot.y,
					spot.z);
				console.log('L --> W ', intersect[0].object.localToWorld(intersect[0].point));
				console.log('W --> L ', intersect[0].object.worldToLocal(intersect[0].point));
				there = true;
			}
		}
		if (intersect[0].object.name == 'option1'){
			var newMaterial = material1.clone();
			newMaterial.tranparent = true;
			newMaterial.opacity = 0.5;
			newOption = new THREE.Sprite(newMaterial);
			newOption.name = 'newOption';
			newOption.position.set(option1.position.x, option1.position.y, option1.position.z);
			newOption.scale.set(0.1, 0.1, 0.1);
			placingOption = true;
			scene.add(newOption);
		}
	}
}

document.addEventListener('keypress', function(event){
	if (event.charCode == 32 && there == true){
		scene.remove(originBall);
		teeth.remove(originBall);
		there = false;
		console.log('------------------------------')
	}
})

function onDocumentMouseMove(event){
	if (isMouseDown == true){
	var distanceMoved = [];
	distanceMoved[0] = clickCoords[0] - ((event.clientX / window.innerWidth) * 2 - 1);
	distanceMoved[1] = clickCoords[1] - (- (event.clientY / window.innerHeight) * 2 + 1);
	}
	if (isMouseDown == true && teethSelect == true){
		teeth.rotation.z -= 0.1 * distanceMoved[0];
		teeth.rotation.x += 0.1 * distanceMoved[1];
		if (0.1 * distanceMoved[1] > 0.02)
			teeth.rotation.y -= Math.sign(distanceMoved[1]) * 0.05 * distanceMoved[0];
	}
	if (isMouseDown == true && placingOption == true){
		var delX = getViewerFOV().width;
		var delY = getViewerFOV().height;

		newOption.position.x += delX * (event.movementX / window.innerWidth);
		newOption.position.y -= delY * (event.movementY / window.innerHeight);
		console.log(delX);
		console.log(event.movementX);
		console.log(window.innerWidth);
		console.log(event.movementX / window.innerWidth);
		console.log('--------------------')
		
	}
}
var newOption;
function onDocumentMouseUp(event){
	isMouseDown = false;
	teethSelect = false;
	placingOption = false;
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	intersect = raycaster.intersectObjects(scene.children);
	for (var i = 0; i < intersect.length; i++){
		console.log(intersect[i].object.name)
		if (intersect[i].object.name == 'teeth' && newOption != undefined){
			var spot = intersect[i].object.worldToLocal(intersect[0].point);
			newOption.position.set(originBall.position.x, originBall.position.y, originBall.position.z);
			console.log(spot);
			teeth.add(newOption);
		}
	}; console.log('-----------------')
}

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);

// Mouse Control / Zoom
function onDocumentMouseScroll(event){
	if (event.target.nodeName == 'CANVAS'){
		if (event.deltaY > 0){
			// zoom out
			if (camera.position.z < 20)
				camera.position.z += 0.05;
		}
		if (event.deltaY < 0){
			// zoom in
			if (camera.position.z > 1){
				camera.position.z -= 0.05;
			}
		}
	}
}

document.addEventListener('wheel', onDocumentMouseScroll, false);
// -----------------------------------------------------------
// Get the field of view
function getViewerFOV(){
		var vFOV = camera.fov * Math.PI / 180;
		var height = 2 * Math.tan(vFOV / 2) * camera.position.z;

		var aspect = window.innerWidth / window.innerHeight;
		var width = height * aspect;
		return {'width': width, 'height': height};
}

// -----------------------------------------------------------
var render = function () {
	requestAnimationFrame( render );

	renderer.render(scene, camera);
};
render();