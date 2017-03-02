//COLORS
var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0,
};

// THREEJS RELATED VARIABLES

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH,
    mousePos = { x: 0, y: 0 };

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 100000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
  scene.fog = new THREE.Fog(0xf7d9aa, 100,950);
  camera.position.x = 0;
  camera.position.z = 300;
  camera.position.y = 60;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
}

// HANDLE SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}


// LIGHTS

var ambientLight, hemisphereLight, shadowLight;

function createLights() {

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
}


var Rabbit = function(){
  this.mesh = new THREE.Object3D();
  this.mesh.name = "Rabbit";

  // rabbit

  var geomEngine = new THREE.SphereGeometry(80,100,20,20,20);
  var matEngine = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
  var engine = new THREE.Mesh(geomEngine, matEngine);
  engine.castShadow = true;
  engine.receiveShadow = true;
  this.mesh.add(engine);

  var tailShape = new THREE.SphereGeometry(20,20,20,20);
  var tailMaterial= new THREE.MeshPhongMaterial({color:Colors.pink, shading:THREE.FlatShading});
  var tail = new THREE.Mesh(tailShape, tailMaterial);
  tail.position.z = 120;
  tail.position.y = -20;
  tail.castShadow = true;
  tail.receiveShadow = true;
  this.mesh.add(tail);

//ear
  var earShape1 = new THREE.BoxGeometry(40,150,20,1,1,1);
  var earMaterial1= new THREE.MeshPhongMaterial({color:Colors.pink, shading:THREE.FlatShading});
  var ear1 = new THREE.Mesh(earShape1, earMaterial1);
  ear1.position.x = 40;
  ear1.position.y = 120;
  ear1.rotation.z += -0.3;
  ear1.castShadow = true;
  ear1.receiveShadow = true;
  this.mesh.add(ear1);

  // we can access a specific vertex of a shape through 
  // the vertices array, and then move its x, y and z property:
  earShape1.vertices[6].y-=5;
  earShape1.vertices[6].z+=10;
  earShape1.vertices[7].y-=5;
  earShape1.vertices[7].z-=10;
  earShape1.vertices[3].y+=15;
  earShape1.vertices[3].z+=10;
  earShape1.vertices[2].y+=15;
  earShape1.vertices[2].z-=10;

//ear
  var earShape2 = new THREE.BoxGeometry(40,150,20,1,1,1);
  var earMaterial2= new THREE.MeshPhongMaterial({color:Colors.pink, shading:THREE.FlatShading});
  var ear2 = new THREE.Mesh(earShape2, earMaterial2);
  ear2.position.x = -40;
  ear2.position.y = 120;
  ear2.rotation.z += 0.3;
  ear2.castShadow = true;
  ear2.receiveShadow = true;
  this.mesh.add(ear2);

  // we can access a specific vertex of a shape through 
  // the vertices array, and then move its x, y and z property:
  earShape2.vertices[6].y-=5;
  earShape2.vertices[6].z+=10;
  earShape2.vertices[7].y-=5;
  earShape2.vertices[7].z-=10;
  earShape2.vertices[3].y+=15;
  earShape2.vertices[3].z+=10;
  earShape2.vertices[2].y+=15;
  earShape2.vertices[2].z-=10;

};

Sky = function(){
  this.mesh = new THREE.Object3D();
  this.nClouds = 20;
  this.clouds = [];
  var stepAngle = Math.PI*2 / this.nClouds;
  for(var i=0; i<this.nClouds; i++){
    var c = new Cloud();
    this.clouds.push(c);
    var a = stepAngle*i;
    var h = 800 + Math.random()*200;
    c.mesh.position.y = Math.sin(a)*h;
    c.mesh.position.z = Math.cos(a)*h;
    c.mesh.position.x = Math.random()*550;
    c.mesh.rotation.z = a + Math.PI/2;
    var s = 1+Math.random()*2;
    c.mesh.scale.set(s,s,s);
    this.mesh.add(c.mesh);
  }

    for(var i=0; i<this.nClouds; i++){
    var c = new Cloud();
    this.clouds.push(c);
    var a = stepAngle*i;
    var h = 800 + Math.random()*200;
    c.mesh.position.y = Math.sin(a)*h;
    c.mesh.position.z = Math.cos(a)*h;
    c.mesh.position.x = Math.random()*-500;
    c.mesh.rotation.z = a + Math.PI/2;
    var s = 1+Math.random()*2;
    c.mesh.scale.set(s,s,s);
    this.mesh.add(c.mesh);
  }
}

Earth = function(){
  var geom = new THREE.SphereGeometry(740,100,50);
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
  var mat = new THREE.MeshPhongMaterial({
    color:Colors.blue,
    transparent:true,
    opacity:.6,
    shading:THREE.FlatShading,
  });
  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
}

Cloud = function(){
  this.mesh = new THREE.Object3D();
  this.mesh.name = "cloud";
  var geom = new THREE.CubeGeometry(20,20,20);
  var mat = new THREE.MeshPhongMaterial({
    color:Colors.white,
  });

  var nBlocs = 3+Math.floor(Math.random()*3);
  for (var i=0; i<nBlocs; i++ ){
    var m = new THREE.Mesh(geom.clone(), mat);
    m.position.x = i*15;
    m.position.y = Math.random()*10;
    m.position.z = Math.random()*10;
    m.rotation.y = Math.random()*Math.PI*2;
    m.rotation.x = Math.random()*Math.PI*2;
    var s = .1 + Math.random()*.9;
    m.scale.set(s,s,s);
    m.castShadow = true;
    m.receiveShadow = true;
    this.mesh.add(m);
  }
}

Tree = function () {
  this.mesh = new THREE.Object3D();
  this.mesh.name = "tree";
  var geometry = new THREE.ConeGeometry( 20, 60, 32 );
  var material = new THREE.MeshPhongMaterial( {color: 0x0d7729} );
  var m = new THREE.Mesh(geometry.clone(), material);
  m.position.x = 0;
  m.position.y = Math.random()*10 + 100;
  m.position.z = Math.random()*10;
  var s = 2 + Math.random()*.9;
  m.scale.set(s,s,s);
  m.castShadow = true;
  m.receiveShadow = true;
  this.mesh.add(m);
}

// 3D Models
var Earth;
var Rabbit;
var Tree;

function createPlane(){
  Rabbit = new Rabbit();
  Rabbit.mesh.scale.set(.08,.08,.08);
  Rabbit.mesh.position.y = 130;
  scene.add(Rabbit.mesh);
}

function createEarth(){
  Earth = new Earth();
  Earth.mesh.position.y = -700;
  scene.add(Earth.mesh);
}

function createSky(){
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
}

function loop(){
  updatePlane();
  Earth.mesh.rotation.x += .0005;
  sky.mesh.rotation.x += .001;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function createTrees() {
  var nTrees = 1;
  var trees = [];
  // for(var i=0; i<this.nTrees; i++){
  //   var t = new Tree();
  //   this.trees.push(t);
  //   t.mesh.position.y = 200;
  //   t.mesh.position.z = 10;
  //   t.mesh.position.x = 0;
  //   var s = 10+Math.random()*2;
  //   t.mesh.scale.set(s,s,s);
  //   scene.add(t.mesh);
  // }
  Tree = new Tree();
  scene.add(Tree.mesh);
}

function updatePlane(){
  var targetX = normalize(mousePos.x,-.75,.75,-80, 80);
  var targetY = 20.5- (740*(Math.pow(740*740 + targetX *targetX , 0.5)-740)/(Math.pow(740*740 + targetX * targetX , 0.5)));
  Rabbit.mesh.position.y = targetY;
  Rabbit.mesh.position.x = targetX;
  Rabbit.mesh.position.z = 180;
}

function normalize(v,vmin,vmax,tmin, tmax){
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
}

function init(event){
  createScene();
  createLights();
  createPlane();
  createEarth();
  createSky();
  loop();
  createTrees();
  
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener("keydown", onDocumentKeyDown, false);
}

// HANDLE MOUSE EVENTS

var mousePos = { x: 0, y: 0 };
var mouseRaw = { x: 730, y: 440};

function handleMouseMove(event) {
  var tx = -1 + (event.clientX / WIDTH)*2;
  var ty = 1 - (event.clientY / HEIGHT)*2;
  mouseRaw = {x: event.clientX, y: event.clientY};
  mousePos = {x:tx, y:ty};
  console.log("The current mouse position is "+tx+", "+ty);
  console.log("At "+event.clientX+", "+event.clientY);
}

function onDocumentKeyDown(event) {
  console.log("on key down");
  var keyCode = event.which;
  if (keyCode == 37) {
    if (mouseRaw.x > 0) {
      mouseRaw.x = mouseRaw.x - 100;
    }
     mousePos.x = - 1 + ((mouseRaw.x - 100) / WIDTH)*2;
     console.log("The keyboard left is pressed with mousePos.x = "+mousePos.x);
     console.log("At "+mouseRaw.x+", "+mouseRaw.y);

  }
  else if (keyCode == 39) {
    if (mouseRaw.x <= WIDTH) {
      mouseRaw.x = mouseRaw.x + 100;
    }
    mousePos.x = -1 + ((mouseRaw.x - 100) / WIDTH)*2;
    console.log("The keyboard left is pressed with mousePos.x = "+mousePos.x);
    console.log("At "+mouseRaw.x+", "+mouseRaw.y);


  }
}

window.addEventListener('load', init, false);
