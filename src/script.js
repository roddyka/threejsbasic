import './style.css'
import * as THREE from 'three'
import { OrbitControls } from './OrbitControls.js'
import { FontLoader } from './FontLoader'
import { TextGeometry } from './TextGeometry'
import * as dat from 'lil-gui'

/**
 * Debug
 */
const gui = new dat.GUI();

//material texture
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
const matcapTextureTorus = textureLoader.load('/textures/matcaps/7.png')

/**
 * font loader
 */

const fontLoader = new FontLoader();

fontLoader.load('/fonts/SunnySpells_Regular.json',
(font)=>{
    
    const textGeometry = new TextGeometry(
        'Hello Benzinho!',
        {
            font:font,
            size: 0.5,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 3
        }
    )
    gui.add(textGeometry.parameters.options, 'size').min(0).max(1) 
    gui.add(textGeometry.parameters.options, 'curveSegments').min(0).max(100)
    gui.add(textGeometry.parameters.options, 'bevelEnabled')
    gui.add(textGeometry.parameters.options, 'bevelThickness').min(0).max(100)
    gui.add(textGeometry.parameters.options, 'bevelSize').min(0).max(100)
    gui.add(textGeometry.parameters.options, 'bevelOffset').min(0).max(100)
    gui.add(textGeometry.parameters.options, 'bevelSegments').min(0).max(100)

    const matcapMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture})
    textGeometry.center()
    const textMaterial = new THREE.MeshBasicMaterial({wireframe: false})
    const text = new THREE.Mesh(textGeometry, matcapMaterial)
    scene.add(text)

    const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.3,20,45)
    const donutMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTextureTorus})
        

    for (let index = 0; index < 100; index++) {

        const meshDonut = new THREE.Mesh(donutGeometry,donutMaterial)
        meshDonut.position.x = (Math.random() - 0.5)* 10;
        meshDonut.position.y = (Math.random() - 0.5)* 10;
        meshDonut.position.z = (Math.random() - 0.5)* 10;

        meshDonut.rotation.x = Math.random()* Math.PI
        meshDonut.rotation.y = Math.random()* Math.PI

        const scale = Math.random()
        meshDonut.scale.set(scale,scale,scale) 

        scene.add(meshDonut)
    }
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//axis helper
const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)


/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()