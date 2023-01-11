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
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/6.png') 
const matcapTextureTorus = textureLoader.load('/textures/matcaps/7.png')

/**
 * font loader
 */

const fontLoader = new FontLoader();

fontLoader.load('/fonts/SunnySpells_Regular.json',
(font)=>{
    
    const textGeometry = new TextGeometry(
        'Hello Linkedin!',
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

fontLoader.load('/fonts/Blue.json', 
(font)=>{ 
    console.log(font)
    const textGeometry = new TextGeometry(
        'Hello World!',
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

    const matcapMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture2})
    textGeometry.center()
    const textMaterial2 = new THREE.MeshBasicMaterial({wireframe: false})
    const text2 = new THREE.Mesh(textGeometry, matcapMaterial)
    text2.position.y = 0.5
    scene.add(text2)

})

fontLoader.load('/fonts/Drive.json', 
(font)=>{
    const textGeometry = new TextGeometry(
        'Happy 2023!',
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

    const matcapMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture3})
    textGeometry.center()
    const textMaterial2 = new THREE.MeshBasicMaterial({wireframe: false})
    const text = new THREE.Mesh(textGeometry, matcapMaterial)
    text.position.y = - 0.5
    scene.add(text)

})

fontLoader.load('/fonts/Bilanta.json', 
(font)=>{
    const textGeometry = new TextGeometry(
        'Have a nice week!',
        {
            font:font,
            size: 0.5,
            height: 0.2,
            curveSegments: 10,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 10
        }
    )

    const matcapMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture4})
    textGeometry.center()
    const textMaterial2 = new THREE.MeshBasicMaterial({wireframe: false})
    const text = new THREE.Mesh(textGeometry, matcapMaterial)
    text.position.y = - 1
    scene.add(text)

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