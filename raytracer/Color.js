class Color {
    constructor(r, g, b) {
        this.r = r
        this.g = g
        this.b = b
    }

    add(c) {
        return c instanceof Color ?
            new Color(this.r + c.r, this.g + c.g, this.b + c.b)
            : new Color(this.r + c, this.g + c, this.b + c)
    }
    multiply(c) {
        return c instanceof Color ?
            new Color(this.r * c.r, this.g * c.g, this.b * c.b)
            : new Color(this.r * c, this.g * c, this.b * c)
    }
    static add(c1, c2) {
        return new Color(c1.r + c2.r, c1.g + c2.g, c1.b + c2.b)
    }
    static multiply(c, v) {
        return v instanceof Color ?
            new Color(c.r * v.r, c.g * v.g, c.b * v.b)
            : new Color(c.r * v, c.g * v, c.b * v)
    }
}

export default Color