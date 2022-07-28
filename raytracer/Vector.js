class Vector3 {
    static UP = new Vector3(0, 1, 0)

    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    negative() { return new Vector3(-this.x, -this.y, -this.z) }
    add(v) {
        return v instanceof Vector3 ?
            new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
            : new Vector3(this.x + v, this.y + v, this.z + v)
    }
    subtract(v) {
        return v instanceof Vector3 ?
            new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
            : new Vector3(this.x - v, this.y - v, this.z - v)
    }
    multiply(v) {
        return v instanceof Vector3 ?
            new Vector3(this.x * v.x, this.y * v.y, this.z * v.z)
            : new Vector3(this.x * v, this.y * v, this.z * v)
    }
    divide(v) {
        return v instanceof Vector3 ?
            new Vector3(this.x / v.x, this.y / v.y, this.z / v.z)
            : new Vector3(this.x / v, this.y / v, this.z / v)
    }
    equals(v) {
        return this.x == v.x && this.y == v.y && this.z == v.z
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }
    cross(v) {
        return new Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        )
    }
    length() {
        return Math.sqrt(this.dot(this))
    }
    unit() {
        return this.divide(this.length())
    }
    min() {
        return Math.min(Math.min(this.x, this.y), this.z)
    }
    max() {
        return Math.max(Math.max(this.x, this.y), this.z)
    }
    toAngles() {
        return {
            theta: Math.atan2(this.z, this.x),
            phi: Math.asin(this.y / this.length())
        }
    }
    angleTo(a) {
        return Math.acos(this.dot(a) / (this.length() * a.length()))
    }
    reflect(normal) {
        normal = normal.unit()
        return this.subtract(normal.multiply(2 * this.dot(normal)))
    }
    static negative(a, b) {
        b.x = -a.x; b.y = -a.y; b.z = -a.z;
        return b;
    }
    static add(a, b) {
        return b instanceof Vector3 ?
            new Vector3(a.x + b.x, a.y + b.y, a.z + b.z)
            : new Vector3(a.x + b, a.y + b, a.z + b)
    }
    static subtract(a, b) {
        return b instanceof Vector3 ?
            new Vector3(a.x - b.x, a.y - b.y, a.z - b.z)
            : new Vector3(a.x - b, a.y - b, a.z - b)
    }
    static multiply(a, b) {
        return b instanceof Vector3 ?
            new Vector3(a.x * b.x, a.y * b.y, a.z * b.z)
            : new Vector3(a.x * b, a.y * b, a.z * b)
    }
    static divide(a, b) {
        return b instanceof Vector3 ?
            new Vector3(a.x / b.x, a.y / b.y, a.z / b.z)
            : new Vector3(a.x / b, a.y / b, a.z / b)
    }
    static equals(a, b) {
        return a.x == b.x && a.y == b.y && a.z == b.z
    }
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z
    }
    static cross(a, b) {
        return new Vector3(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        )
    }
    static reflect(v, normal) {
        normal = normal.unit()
        return v.subtract(normal.multiply(2 * v.dot(normal)))
    }
}

export default Vector3