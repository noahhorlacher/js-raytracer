import { Sphere } from "./Geometry.js"

class Scene {
    constructor(camera, lights, objects) {
        this.camera = camera
        this.lights = lights
        this.objects = objects
    }

    intersect(ray) {
        let closest = [Infinity, null]

        /* for each object, check for intersection and compare:
        is it closer than Infinity, then is it closer than other hit objects ? */
        for (let object of this.objects) {
            // only spherical geometry for now
            if (!(object instanceof Sphere)) continue

            // get distance
            let dist = object.intersection(ray)

            // compare distance
            if (dist !== null && dist < closest[0]) closest = [dist, object]
        }

        return closest
    }
}

export default Scene