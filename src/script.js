import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as lil from 'lil-gui'
import gsap from 'gsap'
const gui = new lil.GUI();

//cursos
const cursor = {
    x:0,
    y:0
}
window.addEventListener('mousemove',(event)=>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene()

//object group
const group = new THREE.Group();
scene.add(group)

//object
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1,2,2,2),
    new THREE.MeshBasicMaterial({color:'red', wireframe: false})
)

//debug
const parameters = {
    spin : () => {
        gsap.to(cube1.rotation, {
            duration: 1,
            z: cube1.rotation.z + 10,
        })
    }
}

gui.add(cube1.position, 'y')
.min(-3)
.max(3)
.step(0.01)
.name('Elevation (Red Cube)')

gui.add(cube1, 'visible')
.name('Visible (Red Cube)')

gui.add(cube1.material, 'wireframe')
.name('Wireframe View (Red Cube)')

gui.addColor(cube1.material, 'color')
.name('Color (Red Cube)')

gui.add(parameters,'spin');
//end debug


//add the cube so the group
group.add(cube1)


//creating buffer object
// const geometry = new THREE.BufferGeometry();
// const count = 50;
// const positionArray = new Float32Array(count * 3 * 3);
// for (let index = 0; index < count * 3 * 3; index++) {
//     positionArray[index] = (Math.random() - 0.5) * 4
// }
// const positionsAttribute = new THREE.BufferAttribute(positionArray, 3)
// geometry.setAttribute('position', positionsAttribute);
// const geomaterial = new THREE.MeshBasicMaterial({color:'darkgreen', wireframe: true})
// const bufferMesh = new THREE.Mesh(geometry, geomaterial);
// group.add(bufferMesh)

//axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
//resize
window.addEventListener('resize', ()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//fullscreen
window.addEventListener('dblclick', ()=> {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }else if(canvas.webkitrequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    }else {
        if(document.exitFullscreen){
            document.exitFullscreen()
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(cube1.position)
scene.add(camera)

//controls
const canvas = document.querySelector('canvas.webgl');
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//clock 
const clock = new THREE.Clock()

//animations
const tick = () =>
{
    const time = clock.getElapsedTime()
    //update object
    // cube1.rotation.y = time

    // //update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(cube1.position)

    controls.update()
    
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()