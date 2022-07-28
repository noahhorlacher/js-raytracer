import Color from "./Color.js"

class Camera {
    constructor(position, fov, target, backgroundColor = new Color(155, 155, 255)) {
        this.position = position
        this.fov = fov
        this.target = target
        this.backgroundColor = backgroundColor
    }
}

export default Camera