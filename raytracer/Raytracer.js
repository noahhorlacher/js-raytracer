import Vector3 from "./Vector.js"
import Color from "./Color.js"

class Raytracer {
    #scene

    constructor(canvas, width = 600, height = 480, maxRayDepth = 3) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        canvas.width = this.width = width
        canvas.height = this.height = height
        this.maxRayDepth = maxRayDepth
    }

    setScene(scene) {
        this.#scene = scene
    }

    render() {
        // get imagedata
        let data = new ImageData(this.width, this.height)

        // cast rays
        let eyeVector = Vector3.subtract(this.#scene.camera.target, this.#scene.camera.position).unit()
        let vpRight = Vector3.cross(eyeVector, Vector3.UP).unit()
        let vpUp = Vector3.cross(vpRight, eyeVector).unit()

        let fovRadians = (Math.PI * (this.#scene.camera.fov / 2)) / 180
        let heightWidthRatio = this.height / this.width
        let halfWidth = Math.tan(fovRadians), halfHeight = heightWidthRatio * halfWidth
        let cameraWidth = halfWidth * 2, cameraHeight = halfHeight * 2
        let pixelWidth = cameraWidth / (this.width - 1), pixelHeight = cameraHeight / (this.height - 1)
        // create a ray
        let ray = {
            position: this.#scene.camera.position
        }

        // go through pixels
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let xComp = vpRight.multiply(x * pixelWidth - halfWidth),
                    yComp = vpUp.multiply(y * pixelHeight - halfHeight)

                ray.direction = Vector3.add(Vector3.add(eyeVector, xComp), yComp).unit()

                let color = this.#trace(ray, 0)
                let index = x * 4 + y * this.width * 4

                data.data[index + 0] = color.r
                data.data[index + 1] = color.g
                data.data[index + 2] = color.b
                data.data[index + 3] = 255
            }
        }

        this.context.putImageData(data, 0, 0)
    }

    // get object intersection
    #trace(ray, depth) {
        if (depth > this.maxRayDepth) return

        let distObject = this.#scene.intersect(ray)

        if (distObject[0] === Infinity) {
            return this.#scene.camera.backgroundColor
        }

        let dist = distObject[0]
        let object = distObject[1]

        let intersectionPoint = Vector3.add(ray.position, Vector3.multiply(ray.direction, dist))

        // only spherical geometry for now
        return this.#surface(
            ray,
            object,
            intersectionPoint,
            object.normal(intersectionPoint),
            depth
        )
    }

    // get color from object intersection
    #surface(ray, object, intersectionPoint, normal, depth) {
        let baseColor = object.material.color, specularColor = new Color(0, 0, 0)
        let lambertAmount = 0

        if (object.material.lambert) {
            for (let light of this.#scene.lights) {
                if (!light.isVisible(intersectionPoint, this.#scene)) continue

                let contribution = Vector3.dot(Vector3.subtract(light.position, intersectionPoint).unit(), normal)
                lambertAmount += Math.max(contribution, 0)
            }

            lambertAmount = Math.min(1, lambertAmount)
        }

        if (object.material.specular) {
            let reflectedRay = {
                position: intersectionPoint,
                direction: Vector3.reflect(ray.direction, normal)
            }
            let reflectedColor = this.#trace(reflectedRay, ++depth)
            if (reflectedColor) specularColor = specularColor.add(reflectedColor.multiply(object.material.specular))
        }

        return specularColor.add(
            Color.add(
                baseColor.multiply(lambertAmount * object.material.lambert),
                baseColor.multiply(object.material.ambient)
            )
        )
    }
}

export default Raytracer