 
 objects=[];
 status="";

function preload(){
    video = createCapture(VIDEO);
    video.hide();
}

function setup(){
    canvas = createCanvas(400, 300);
    canvas.center();

}
function draw(){
    image(video,0,0,400,300);
    
    if(status !=""){
        objectDetector.detect(video,gotResult);
        for (i=0;i< objects.length; i++) {
          
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are : "+ objects.length;
             
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " +percent+ "%" , objects[i].x+ 15,objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


        }
    }
}


function start(){
   objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}