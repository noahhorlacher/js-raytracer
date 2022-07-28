import Vector3 from "./Vector.js"

class Light {
    // min distance to make sure isVisible ignores self-intersection for reflections 
    static CLIP_THRESHOLD = -.005

    constructor(position) {
        this.position = position
    }

    isVisible(sourcePosition, scene) {
        let distObject = scene.intersect({
            position: sourcePosition,
            direction: Vector3.subtract(sourcePosition, this.position).unit()
        })
        return distObject[0] > Light.CLIP_THRESHOLD
    }
}

export default Light