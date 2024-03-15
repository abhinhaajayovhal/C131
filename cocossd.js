status = "";
name1 = "";
objects = [];

function preload(){
    image1 = loadImage("1.jpg");
    image2 = loadImage("2.jpg");
    image3 = loadImage("3.jpg");
    image4 = loadImage("4.jpg");
    image5 = loadImage("5.jpg");
}

function setup(){
    canvas = createCanvas(480, 650);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function draw(){
    name1 = localStorage.getItem("name");
    if(name1 == "bedroom"){
        image(image1, 0, 0, 480, 650);
        document.getElementById("names").innerHTML = "Bedroom";
    }else if(name1 == "study"){
        image(image2, 0, 0, 480, 650);
        document.getElementById("names").innerHTML = "Study Table";
    }else if(name1 == "PC"){
        image(image3, 0, 0, 480, 650);
        document.getElementById("names").innerHTML = "Computer";
    }else if(name1 == "shelf"){
        image(image4, 0, 0, 480, 650);
        document.getElementById("names").innerHTML = "Book Shelf";
    }else if(name1 == "balcony"){
        image(image5, 0, 0, 480, 650);
        document.getElementById("names").innerHTML = "Indoor Balcony";
    }

    if(status != ""){
        for(i=0;i<objects.length;i++){
            percentage = floor(objects[i].confidence*100);
            label = objects[i].label + " " + percentage + "%";
            x = objects[i].x;
            y = objects[i].y;
            height = objects[i].height;
            width = objects[i].width;
            fill("red");
            text(label, x, y);
            noFill();
            stroke("red");
            rect(x-20, y-20, width, height);
        }
    }

}

function modelLoaded(){
    console.log("Model Loaded");
    status = true; 
    name1 = localStorage.getItem("name");
    console.log(name1);

    if(name1 == "bedroom"){
        objectDetector.detect(image1, got_results);
    }else if(name1 == "study"){
        objectDetector.detect(image2, got_results);
    }else if(name1 == "PC"){
        objectDetector.detect(image3, got_results);
    }else if(name1 == "shelf"){
        objectDetector.detect(image4, got_results);
    }else if(name1 == "balcony"){
        objectDetector.detect(image5, got_results);
    }
    document.getElementById("status").innerHTML = "Detecting Objects";
}


function got_results(error, result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        objects = result;
    }
}