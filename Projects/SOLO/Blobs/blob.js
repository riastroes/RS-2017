function Blob(pos, size, dim, force) {
    this.path = [];
    this.next = 0;
    this.b = [];
    this.pos = pos;
    this.size = size;
    this.dimention = dim;
    this.force = force;
    this.angle = TWO_PI / this.dimention;


    for (var i = 0; i < this.dimention; i++) {
        this.b[i] = this.pos.copy();
        var radius = random(this.size, this.size * this.force);
        this.b[i].x += radius * cos((i * this.angle) - PI);
        this.b[i].y += radius * sin((i * this.angle) - PI);
    }
}
Blob.prototype.create = function(max) {

    for (var t = 0; t < max; t++) {

        var center = this.pos.copy();
        ellipse(center.x, center.y, 10, 10);
        for (var i = 0; i < this.dimention; i++) {
            var from = this.b[i % this.dimention].copy();
            var to = this.b[(i + 1) % this.dimention].copy();

            var toinner = createVector(center.x - to.x, center.y - to.y);
            toinner.normalize();
            console.log(toinner.x + "," + toinner.y);
            toinner.mult(t * t);
            to.add(toinner);
            ellipse(to.x, to.y, 5, 5);

            this.path[this.next] = to.copy();
            this.next++;
        }
    }

}

Blob.prototype.create2 = function(max) {

    for (var t = 0; t < max; t++) {

        var center = this.pos.copy();
        ellipse(center.x, center.y, 10, 10);
        for (var i = 1; i <= this.dimention; i++) {
            var from = this.b[i % this.dimention].copy();
            var to = this.b[(i + 1) % this.dimention].copy();

            var toinner = createVector(center.x - to.x, center.y - to.y);
            toinner.normalize();
            console.log(toinner.x + "," + toinner.y);
            toinner.mult(t * t);
            to.add(toinner);
            ellipse(to.x, to.y, 5, 5);
            for (var c = 1; c < 4; c++) {
                var a = this.b[(i - 1) % this.dimention].copy();
                var d = this.b[(i + 2) % this.dimention].copy();
                var x = curvePoint(a.x, from.x, to.x, d.x, c / 6);
                var y = curvePoint(a.y, from.y, to.y, d.y, c / 6);
                this.path[this.next] = createVector(x, y);
                this.next++;
            }


        }
    }


}
Blob.prototype.create3 = function(max) {

    for (var t = 0; t < max; t++) {

        var center = this.pos.copy();
        ellipse(center.x, center.y, 10, 10);
        for (var i = 1; i <= this.dimention; i++) {
            var from = this.b[i % this.dimention].copy();
            var to = this.b[(i + 1) % this.dimention].copy();

            var toouter = createVector(to.x - center.x, to.y - center.y);
            toouter.normalize();

            toouter.mult(10 + (t * t));
            to.add(toouter);
            ellipse(to.x, to.y, 5, 5);
            for (var c = 1; c < 4; c++) {
                var a = this.b[(i - 1) % this.dimention].copy();
                var d = this.b[(i + 2) % this.dimention].copy();
                var x = curvePoint(a.x, from.x, to.x, d.x, c / 6);
                var y = curvePoint(a.y, from.y, to.y, d.y, c / 6);
                this.path[this.next] = createVector(x, y);
                this.next++;
            }


        }
    }


}
Blob.prototype.create4 = function(max) {

    for (var t = 0; t < max; t++) {

        var center = this.pos.copy();
        ellipse(center.x, center.y, 10, 10);
        for (var i = 1; i <= this.dimention; i++) {
            var from = this.b[i % this.dimention].copy();
            var to = this.b[(i + 1) % this.dimention].copy();

            var toinner = createVector(center.x - to.x, center.y - to.y);
            toinner.normalize();

            toinner.mult(20 + (t * t));
            from.add(toinner);
            ellipse(to.x, to.y, 5, 5);
            for (var c = 1; c < 4; c++) {
                var a = this.b[(i - 1) % this.dimention].copy();
                var d = this.b[(i + 2) % this.dimention].copy();
                var x = curvePoint(a.x, from.x, to.x, d.x, c / 6);
                var y = curvePoint(a.y, from.y, to.y, d.y, c / 6);
                this.path[this.next] = createVector(x, y);
                this.next++;
            }


        }
    }
}

Blob.prototype.create5 = function(max) {

    for (var t = 0; t < max; t++) {

        var center = this.pos.copy();
        //ellipse(center.x, center.y, 10, 10);
        for (var i = 1; i <= this.dimention; i++) {
            var from = this.b[i % this.dimention].copy();
            var to = this.b[(i + 1) % this.dimention].copy();

            var toinner = createVector(center.x - to.x, center.y - to.y);
            toinner.normalize();

            toinner.mult(20 + (t * t));
            if (i % 2 == 0) {
                from.add(toinner);
            } else {
                to.sub(toinner);
            }

            //ellipse(to.x, to.y, 5, 5);
            for (var c = 1; c < 4; c++) {
                var a = this.b[(i - 1) % this.dimention].copy();
                var d = this.b[(i + 2) % this.dimention].copy();
                var x = curvePoint(a.x, from.x, to.x, d.x, c / 6);
                var y = curvePoint(a.y, from.y, to.y, d.y, c / 6);
                this.path[this.next] = createVector(x, y);
                this.next++;
            }


        }
    }
}