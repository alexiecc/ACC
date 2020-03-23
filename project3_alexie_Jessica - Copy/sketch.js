let video;
let poseNet;
let noseX = 0;
let noseY = 0;

let stepSize = 8;
let vwidth = 640,
    vheight = 480;
let pxl, rslt;

function preload() {
    superman = loadImage('img/Blossomhead.png');
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight)
    video.hide();
    console.log(ml5);
    poseNet = ml5.poseNet(video, modelReady)
    poseNet.on('pose', gotPoses);

    noStroke();
    fill(0);
}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        let newX = poses[0].pose.keypoints[0].position.x;
        let newY = poses[0].pose.keypoints[0].position.y;
        noseX = lerp(noseX, newX, 1.5);
        noseY = lerp(noseY, newY, 1.5);
    }


}

function modelReady() {
    console.log('model ready');
}

function draw() {
    image(video, 0, 0, windowWidth, windowHeight);
    image(superman, noseX - 350, noseY - 420, 900, 900);

  /*  cam.loadPixels();
    for (let y = 0; y < vheight; y += stepSize) {
        for (let x = 0; x < vwidth; x += stepSize) {
            const i = y * vwidth + x;
            const darkness = (255 - cam.pixels[i * 4]) / 255;

            var pix = cam.get(x, y);
            //            pix[3] = 100; //opacity
            fill(pix, 0);

            let radius = (stepSize * darkness) * 4;
            ellipse(map(x, 0, vwidth, 0, width), map(y, 0, vheight, 0, height), radius, radius); */

            filter(GRAY);

        }