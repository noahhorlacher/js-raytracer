import Vector3 from "./Vector.js"

class Geometry {
    constructor(position, material) {
        this.position = position
        this.material = material
    }
}

class Sphere extends Geometry {
    constructor(radius, position, material) {
        super(position, material)
        this.radius = radius
    }

    // check if ray intersects with sphere
    intersection(ray) {
        let eyeToCenter = Vector3.subtract(this.position, ray.position)
        let v = Vector3.dot(eyeToCenter, ray.direction)
        let eoDot = Vector3.dot(eyeToCenter, eyeToCenter)
        let discriminant = this.radius ** 2 - eoDot + v ** 2

        return discriminant < 0 ? null : v - Math.sqrt(discriminant)
    }

    // get normal from point on sphere
    normal(intersectionPoint) {
        return Vector3.subtract(intersectionPoint, this.position).unit()
    }
}

export {
    Sphere
}