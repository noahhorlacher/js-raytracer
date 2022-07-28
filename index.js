import Raytracer from './raytracer/Raytracer.js'
import Scene from './raytracer/Scene.js'
import Camera from './raytracer/Camera.js'
import Vector3 from './raytracer/Vector.js'
import { Sphere } from './raytracer/Geometry.js'
import Light from './raytracer/Light.js'
import Material from './raytracer/Material.js'
import Color from './raytracer/Color.js'

const CANVAS = document.createElement('canvas')
const WIDTH = 256, HEIGHT = 256

document.body.append(CANVAS)

const RENDERER = new Raytracer(CANVAS, WIDTH, HEIGHT)
const SCENE = new Scene(
    new Camera(new Vector3(0, 1.8, 15), 45, new Vector3(0, 0, 0), new Color(210, 210, 255)),
    [
        new Light(new Vector3(-30, -10, 20))
    ],
    [
        new Sphere(3, new Vector3(0, 0, -3), new Material(new Color(255, 255, 255), .8, 1, 0)),
        new Sphere(.2, new Vector3(-5, 0, -1), new Material(new Color(255, 255, 255), .8, 1, 0)),
        new Sphere(.3, new Vector3(5, 0, -1), new Material(new Color(255, 255, 255), .8, 1, 0))
    ]
)

RENDERER.setScene(SCENE)
RENDERER.render()

let t = 0
function render() {
    SCENE.objects[0].position.y = Math.sin(t * .01 * Math.PI * 2) * 3 - .5
    SCENE.objects[0].position.z = Math.cos(t * .01 * Math.PI * 2) * 3 - 3

    SCENE.objects[1].position.y = Math.sin(t * .02 * Math.PI * 2 - .5) * 3
    SCENE.objects[1].position.z = Math.cos(t * .02 * Math.PI * 2 - .5) * 3 - 3

    SCENE.objects[2].position.y = Math.sin(1 + t * .005 * Math.PI * 2) * 2
    SCENE.objects[2].position.z = Math.cos(1 + t * .005 * Math.PI * 2) * 2 - 3

    RENDERER.render()

    t++
    requestAnimationFrame(render)
}

requestAnimationFrame(render)