import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui';

const gui = new dat.GUI;
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const CubetextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')




const environmentMapTexture = CubetextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
])
// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
// material.envMap = environmentMapTexture
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.05
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.transparent = true
material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(1).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)




const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = - 1.5
sphere.geometry.setAttribute(
    'uv2',
 new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

plane.geometry.setAttribute(
    'uv2',
 new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5
torus.geometry.setAttribute(
    'uv2',
 new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)


scene.add(sphere, plane, torus)

//new obj test 2
const material2 = new THREE.MeshStandardMaterial()
material2.metalness = 0.7
material2.roughness = 0.01
material2.envMap = environmentMapTexture

const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material2
)
sphere2.position.x = - 1.5
sphere2.position.y = 1.2
sphere2.geometry.setAttribute(
    'uv2',
 new THREE.BufferAttribute(sphere2.geometry.attributes.uv.array, 2)
)

const plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material2
)

plane2.geometry.setAttribute(
    'uv2',
 new THREE.BufferAttribute(plane2.geometry.attributes.uv.array, 2)
)
plane2.position.y = 1.2

const torus2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material2
)
torus2.position.x = 1.5
torus2.position.y = 1.2
torus2.geometry.setAttribute(
    'uv2',
 new THREE.BufferAttribute(torus2.geometry.attributes.uv.array, 2)
)

scene.add(sphere2, plane2, torus2)
//objects 3
const albedoTx = textureLoader.load('/textures/ship-corridor-bl/ship-corridor_albedo.png');
const aoTx = textureLoader.load('/textures/ship-corridor-bl/ship-corridor_ao.png');
const heightTx = textureLoader.load('/textures/ship-corridor-bl/ship-corridor_height.png');
const metallicTx = textureLoader.load('/textures/ship-corridor-bl/ship-corridor_metallic.png');
const normalTx = textureLoader.load('/textures/ship-corridor-bl/ship-corridor_normal-ogl.png');
const roughnessTx = textureLoader.load('/textures/ship-corridor-bl/ship-corridor_roughness.png');


const material3 = new THREE.MeshStandardMaterial()
material3.metalness = 0.7
material3.roughness = 0.1
material3.map = albedoTx
material3.aoMap = aoTx
material3.aoMapIntensity = 2
material3.height = heightTx
material3.displacementScale = 0.05
material3.metalnessMap = metallicTx
material3.normalMap = normalTx
material3.roughnessMap = roughnessTx

gui.add(material3, 'aoMapIntensity').min(0).max(1).step(0.0001).name('syfy_Corridor_aoIntensity')
gui.add(material3, 'displacementScale').min(0).max(1).step(0.0001).name('syfy_Corridor_disp_scale')

const sphere3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material3
)
sphere3.position.x = - 1.5
sphere3.position.y = -1.2
sphere3.geometry.setAttribute(
    'uv2',
 new THREE.BufferAttribute(sphere3.geometry.attributes.uv.array, 2)
)
scene.add(sphere3)

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
gui.add(ambientLight, 'visible').name('Lights Visible')
gui.addColor(ambientLight, 'color').name('Light Color')
gui.add(ambientLight,'intensity').min(0).max(1).step(0.0001)

const spotLight = new THREE.SpotLight(0xffffff, 0.2723)
gui.add(spotLight, 'visible').name('Spot Lights Visible')
gui.addColor(spotLight, 'color').name('Spot Light Color')
gui.add(spotLight,'intensity').min(0).max(1).step(0.0001).name('Spot Light Intensity')

scene.add(ambientLight, spotLight)

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
    // Update objects
    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = 0.15 * elapsedTime
    // plane.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()