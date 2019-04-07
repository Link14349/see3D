let game = new See3D(document.getElementById("canvas"));
let scene = new See3D.Scene("scene", game);
let camera = new See3D.Camera(new See3D.Vector3(0, 0, 0), "camera", scene);
let button = new Cube(new Vector3(0, 0, 10), new Vector3(3, 1, 1, "#fff", "button"));
scene
    .push(camera)
    .camera("camera")
    .push(button)
;
game
    .push(scene)
    .scene("scene")
;
game.full();
camera.projType = See3D.Camera.ORTHOGONAL_PROJECTION;
game.renderLoop(function PhyUpdate() {
        button.rotate(new Vector3(Math.PI / 180, Math.PI / 180, Math.PI / 180));
    },
    function ViewUpdate(self) {
        let ctx = self.ctx;
        ctx.beginPath();
        ctx.font = "50px Verdana";
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#fff";
        ctx.fillText("Space Pass", self.width() / 2, 0);
        ctx.font = "20px Verdana";
        ctx.fillText("The Game", self.width() / 2, 50);
        ctx.font = "10px Verdana";
        ctx.fillText("Click screen to continue", self.width() / 2, 70);
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.strokeText("The Demo", self.width(), self.height() - 20);
        ctx.strokeText("Powered by See3D-v0.0.1", self.width(), self.height());
        ctx.closePath();
    }
);
document.onclick = function (e) {
    start();
};

function start() {
    game.endLoop();
    let ctx = game.ctx;
    ctx.beginPath();
    ctx.font = "50px Verdana";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText("Loading...", game.width() / 2, game.height() / 2);
    ctx.closePath();
    button.del();
    camera.projType = See3D.Camera.PRESPECTIVE_PROJECTION;
    camera.position = new See3D.Vector3(0, 0, -300);
    // let me = new See3D.Cube(new See3D.Vector3(0, 10, -100), new See3D.Vector3(5, 5, 5), "#0ff", "me");
    let cube = new See3D.Cube(new See3D.Vector3(See3D.randint(-300, 300), See3D.randint(-300, 300), See3D.randint(-300, 300)), new See3D.Vector3(30, 30, 30), "#f00", "cube");
    // let tower = new See3D.Cube(new See3D.Vector3(0, 0, 0), new See3D.Vector3(100, 100, 100), "#f0f");
    let stars = [];
    let pursuers = [];// #ff0
    scene
        .push(cube)
    ;
    let colors = ["#af0", "#00FF00", "#FFD700", "#FFA500", "#FF4500", "#32CD32"];
    for (let i = 0; i < 200; i++) {
        let w = See3D.randint(10, 30);
        let c = new See3D.Cube(new See3D.Vector3(See3D.randint(-300, 300), See3D.randint(-300, 300), See3D.randint(-300, 300)), new See3D.Vector3(w, w, w), colors[See3D.randint(0, colors.length)], "star");
        c.rotate(new Vector3(Math.PI / 180 * See3D.randint(1, 360), Math.PI / 180 * See3D.randint(1, 360), Math.PI / 180 * See3D.randint(1, 360)));
        scene.push(c);
        stars.push(c);
    }
    for (let i = 0; i < 50; i++) {
        let p = new See3D.Cube(new See3D.Vector3(See3D.randint(-300, 300), See3D.randint(-300, 300), See3D.randint(-300, 300)), new See3D.Vector3(20, 20, 20), "#f0f", "pursuer");
        scene.push(p);
        pursuers.push(p);
    }
    let keyCode = 0;
    document.onkeydown = function (e) {
        // console.log(e.keyCode);
        keyCode = e.keyCode;
        // console.log(keyCode);
    };
    document.onkeyup = function (e) {
        keyCode = -1;
    };
    camera.RigidBody();
    camera.noRigidBody("cube");
    // game.render();
    let blood = 100;
    let win = false;
    let lost = false;
    let speed = 5;
    let crash = false;
    let count = 0;
    let wait = false;
    // console.log(camera.crashAny());
    game.renderLoop(
        function PhyUpdate(self) {
            crash = false;
            if (wait) {
                count++;
                if (count >= 10) {
                    wait = false;
                    count = 0;
                }
            }
            // speed = 10 / game.fps;
            if (keyCode == 38) {// up
                camera.forward(speed);
            }
            if (keyCode == 40) {// down
                camera.back(speed);
            }
            if (keyCode == 37) {// left
                camera.left(speed);
            }
            if (keyCode == 39) {// right
                camera.right(speed);
            }
            if (keyCode == 65) {// a
                camera.rotate(new Vector3(0, Math.PI / 180, 0));
                // camera.rotate(new Vector3(0, Math.PI / 180, 0));
                // camera.revolution(new Vector3(0, -Math.PI / 180, 0));
            }
            if (keyCode == 68) {// d
                camera.rotate(new Vector3(0, -Math.PI / 180, 0));
                // camera.rotate(new Vector3(0, -Math.PI / 180, 0));
                // camera.revolution(new Vector3(0, Math.PI / 180, 0));
            }
            if (keyCode == 87) {// w
                camera.rotate(new Vector3(Math.PI / 180, 0, 0));
                // camera.rotate(new Vector3(-Math.PI / 180, 0, 0));
                // camera.revolution(new Vector3(-Math.PI / 180, 0, 0));
            }
            if (keyCode == 83) {// s
                camera.rotate(new Vector3(-Math.PI / 180, 0, 0));
                // camera.rotate(new Vector3(Math.PI / 180, 0, 0));
                // camera.revolution(new Vector3(Math.PI / 180, 0, 0));
            }
            if (keyCode == 73) {// i
                speed++;
                if (speed > 5) speed = 5;
            }
            if (keyCode == 75) {// k
                speed--;
                if (speed < 1) speed = 1;
            }
            if (!wait) {
                for (let i = 0; i < stars.length; i++) {
                    if (camera.crash(stars[i])) {
                        crash = true;
                        wait = true;
                        blood--;
                        if (blood <= 0) {
                            lost = true;
                            game.endLoop();
                        }
                    }
                    stars[i].forward(See3D.randint(5, 10));
                    if (
                        stars[i].position.x > 300 || stars[i].position.y > 300 || stars[i].position.z > 300 ||
                        stars[i].position.x < -300 || stars[i].position.y < -300 || stars[i].position.z < -300
                    ) {
                        stars[i].position = new See3D.Vector3(See3D.randint(-300, 300), See3D.randint(-300, 300), See3D.randint(-300, 300));
                        stars[i].rotation = new See3D.Vector3(Math.PI / 2 * See3D.randint(0, 360), Math.PI / 2 * See3D.randint(0, 360), Math.PI / 2 * See3D.randint(0, 360));
                    }
                }
                for (let i = 0; i < pursuers.length; i++) {
                    if (camera.crash(pursuers[i])) {
                        crash = true;
                        wait = true;
                        blood--;
                        if (blood <= 0) {
                            lost = true;
                            game.endLoop();
                        }
                    }
                    let diff = (pursuers[i].position.operatorSub(camera.position)).norm();
                    // diff = diff * See3D.randint(-5, 5);
                    pursuers[i].position = pursuers[i].position.operatorSub(diff);
                }
            }
            if (camera.crash(cube)) {
                win = true;
                game.endLoop();
            }
            // camera.position = new Vector3(me.position);
            // camera.rotation = new Vector3(me.rotation);
            // me.rotation = new Vector3(camera.rotation);
            // me.forward(10);
            // cube.rotate(new Vector3(Math.PI / 60, Math.PI / 60, Math.PI / 60));
            // camera.rotate(new Vector3(Math.PI / 180, Math.PI / 180, Math.PI / 180));
            // let tmp = tower.position.operatorSub(camera.position);
            // tower.rotate(new Vector3(0, Math.PI / 180 * tmp.mod() / 180, 0));
            // for (let i = 0; i < stars.length; i++) {
            //     stars[i].rotate(new Vector3(Math.PI / 180 * See3D.rand(-1, 1), Math.PI / 180 * See3D.rand(-1, 1), Math.PI / 180 * See3D.rand(-1, 1)));
            // }
        },
        function ViewUpdate(self) {
            let ctx = self.ctx;
            ctx.beginPath();
            ctx.font = "20px Verdana";
            ctx.textBaseline = "top";
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.fillText("FPS: " + self.fps, self.width(), 0);
            ctx.fillText("Camera Status", self.width(), 20);
            ctx.fillText("Position (" + camera.position.x.toFixed(2) + ", " + camera.position.y.toFixed(2) + ", " + camera.position.z.toFixed(2) + ")", self.width(), 40);
            ctx.fillText("Rotation (" + (camera.rotation.x / Math.PI * 180).toFixed(2) + ", " + (camera.rotation.y / Math.PI * 180).toFixed(2) + ", " + (camera.rotation.z / Math.PI * 180).toFixed(2) + ")", self.width(), 60);

            ctx.textAlign = "left";
            ctx.fillText("Blood: " + blood, 0, 0);
            ctx.fillText("Speed: " + speed, 0, 20);

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "50px Verdana";
            if (win) {
                ctx.fillText("You win!", self.width() / 2, self.height() / 2);
            }
            if (lost) {
                ctx.fillText("You lost!", self.width() / 2, self.height() / 2);
            }
            if (crash || wait) {
                ctx.textBaseline = "top";
                ctx.fillStyle = "#f00";
                ctx.fillText("You crashed the star", self.width() / 2, 0);
            }
            ctx.closePath();
        }
    );
}