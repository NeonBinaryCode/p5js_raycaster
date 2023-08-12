class Player {

    constructor() {
        this.fov = 90;
        this.pos = createVector(width / 4, height / 2);
        this.ang = 0;
        this.precision = 3;
        this.rays = [];
        for (let i = -this.fov / 2 * this.precision; i < this.fov / 2 * this.precision; i++) {
            this.rays.push(new Ray(this.pos, radians(i / this.precision)));
        }
    }

    show() {
        stroke(100);
        strokeWeight(2);
        fill(250, 250, 250);
        ellipse(this.pos.x, this.pos.y, 10, 10);
        for (let ray of this.rays) {
            ray.show();
        }
    }

    rotate(ang) {
        this.ang += ang;
        let index = 0;
        for (let a = -this.fov / 2 * this.precision; a < this.fov / 2 * this.precision; a += 1) {
            this.rays[index].setAngle(radians(a / this.precision) + this.ang);
            index++;
        }
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    move(x) {
        let toAdd = p5.Vector.fromAngle(this.ang);
        toAdd.setMag(x);
        this.pos.add(toAdd);
        if (this.pos.x < 0) {
            this.pos.x = 0;
        } else if (this.pos.x > 400) {
            this.pos.x = 400;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        } else if (this.pos.y > 400) {
            this.pos.y = 400;
        }
    }


    scanWalls() {
        scene = [];
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.collides(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt) * cos(p5.Vector.fromAngle(this.ang).angleBetween(ray.dir));
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                stroke(50, 50, 240, 40);
                strokeWeight(3)
                line(this.pos.x, this.pos.y, closest.x, closest.y);
                scene.push(record);
            }
        }
    }

    //xoff += 0.01;
    //yoff += 0.01;2
    draw3D() {
        rectMode(CENTER);
        strokeWeight(0);
        const stripW = sceneW / scene.length;
        for (let i = 0; i < scene.length; i++) {
            let covered = scene[i];
            let stripH = map((sceneH / covered), sceneH / 20, 0, sceneH, sceneH / 4);
            let color = map(covered, 0, sceneH, 255, 0);
            fill(color);
            rect(sceneW + stripW / 2 + stripW * i, sceneH / 2, stripW + 1, stripH);
        }
    }
}