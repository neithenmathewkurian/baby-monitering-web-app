var objects = [];
// var img = "";
var status1 = "";
var song = "";
function preload() {
    song = loadSound("alarm.mp3")
}
function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    od = ml5.objectDetector('cocossd', modelready);

}
function draw() {
    image(video, 0, 0, 600, 400);
    // fill("red");
    // text("dog", 200, 100);
    // textSize(30);
    // noFill();
    // stroke("green");
    // rect(75, 75, 250, 400)

    // text("cat", 350, 100);
    // noFill();
    // stroke("blue");
    // rect(275, 75, 250, 400);
    if (status1 != "") {
        od.detect(video, gotresult);
        document.getElementById("status").innerHTML = "status-object detected";
        
        for (i = 0; i < objects.length; i++) {
            var confidence = objects[i].confidence;
            fill("red");
            text(objects[i].label,objects[i].x + 15, objects[i].y + 15);
            textSize(30);
            noFill();
            stroke("green");
            rect(objects[i].x, objects[i].y, objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("number_of_object").innerHTML = "baby detected";
                song.stop();
            }
            else{
                document.getElementById("number_of_object").innerHTML = "baby not detected";
                song.play();
            
            }
        }
    }

}


function modelready() {
    console.log("modelready");
    status1 = "true";
    
}

function gotresult(error, result) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
        objects = result;
    }
}
