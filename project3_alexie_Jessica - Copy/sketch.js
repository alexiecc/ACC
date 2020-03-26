let video;
let poseNet;
let noseX = 0;
let noseY = 0;

let btn1, btn2, btn3;
let eyerX, eyerY, eyelX, eyelY, srX, srY, slX, slY;
let supermanH, supermanB, superman, frame;

let stepSize = 8;
let vwidth = 640,
    vheight = 480;
let pxl, rslt;
let controller = "Section 1";

function preload() {
    superman = loadImage('img/superman.png');
    supermanB = loadImage('img/SupermanBod.png');
    frame = loadImage('img/frame.png');
}


function setup() {

    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    //  video.size(windowWidth, windowHeight)
    video.hide();
    console.log(ml5);
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
/*
    btn1 = new HButton((width / 2) - 200, height - 200, "Section 1");
    btn2 = new HButton((width / 2), height - 200, "Section 2");
    btn3 = new HButton((width / 2) + 200, height - 200, "Section 3");*/
    noStroke();
    fill(0);
}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        let nX = poses[0].pose.keypoints[0].position.x;
        let nY = poses[0].pose.keypoints[0].position.y;
        let rX = poses[0].pose.keypoints[2].position.x;
        let rY = poses[0].pose.keypoints[2].position.y;
        let lX = poses[0].pose.keypoints[1].position.x;
        let lY = poses[0].pose.keypoints[1].position.y;
        
        let shrX = poses[0].pose.keypoints[6].position.x;
        let shrY = poses[0].pose.keypoints[6].position.y;
        let shlX = poses[0].pose.keypoints[5].position.x;
        let shlY = poses[0].pose.keypoints[5].position.y;
        
        
        
        noseX = lerp(noseX, nX, 1.5);
        noseY = lerp(noseY, nY, 1.5);
        eyerX = lerp(eyerX, rX, 1.5);
        eyerY = lerp(eyerY, rY, 1.5);
        eyelX = lerp(eyelX, lX, 1.5);
        eyelY = lerp(eyelY, lY, 1.5);
        slX = lerp(slX, shlX, 1.5);
        slY = lerp(slY, shlY, 1.5);
        srY = lerp(srY, shrY, 1.5);
        srX = lerp(srX, shrX, 1.5);
    }


}

function modelReady() {
    console.log('model ready');
}

function draw() {
    background(255);

    //bubbles
    video.loadPixels();
    for (let y = 0; y < vheight; y += stepSize) {
        for (let x = 0; x < vwidth; x += stepSize) {
            const i = y * vwidth + x;
            const darkness = (255 - video.pixels[i * 4]) / 255;
                //flip the video to match interaction

            var pix = video.get(x, y);
            //            pix[3] = 100; //opacity
            fill(pix, 0);

            let radius = (stepSize * darkness) * 4;
            ellipse(map(x, 0, vwidth, 0, width), map(y, 0, vheight, 0, height), radius, radius);
            
            

        }

    }
    
    
  //  image(frame, noseX - frame.width/2, noseY - 150, 1400, 1600);
    
    
    image(superman, noseX- 250, noseY - 150, 1100, 1300);
}
