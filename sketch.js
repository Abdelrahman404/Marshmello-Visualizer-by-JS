let song;
let songBtn;
let amp;
let nums = [100 , 25 , 45 , 72];
let bubble = [];
let bubbleFloat = [];
let logo;
let paintBlue;
let paintPink;
var volHistory = [];

function windowResized(){
  resizeCanvas( windowWidth , windowHeight );
}
function preload(){

  logo = loadImage('marshmello-logo.png');
  paintBlue = loadImage('marshmello-paint-blue.png');
  paintPink = loadImage('marshmello-paint-pink.png');

}
function setup(){
  createCanvas( windowWidth , windowHeight);
  song = loadSound("Marshmello - Alone (Official Music Video).mp3", loaded);

  amp = new p5.Amplitude();

  for (let i = 0 ; i < 250 ; i++){
    let x = random(windowWidth);
    let y = random(windowHeight);
    let r = random(10 , 50)
    bubble[i] = new Bubble( x , y , r)
    
  }
    for (let i = 0; i < 50 ; i++) {
      let x = random(windowWidth);
      let y = random(windowHeight);
      let r = random(10, 50)
      bubbleFloat[i] = new BubbleFloat(x, y, r)

    }

}
function loaded(){
  console.log('Loaded Successfully');
  songBtn = createButton("Play");
  songBtn.mousePressed(togglerPlaying);
}

 function mousePressed(){
    let r = random(20 , 100);
    let b = new BubbleFloat(mouseX , mouseY , r);
   bubbleFloat.push(b);

 }
function togglerPlaying(){
  if (!song.isPlaying()){
    song.play();
    songBtn.html("Pause");
  }else {
    song.pause();
    songBtn.html("Play");
  }
  console.log(amp.getLevel());
}


function draw(){
   background(255);
   let vol = amp.getLevel();
   volHistory.push(vol);
    stroke(0);
    strokeWeight(2);
    beginShape();

   for ( let i = 0 ; i < volHistory.length ; i++ ){
    let y = map(volHistory[i] , 0 , 1 , windowHeight/2 , 0);
    vertex(i , y );
   }
   endShape();

   if (volHistory.length > windowWidth){
     volHistory.splice(0 , 1);
   } 
  //  fill(255 , 255 , 0);
  for (let i = 0 ; i < bubble.length ; i++){
    bubble[i].show();
    bubble[i].move();
  }
   for (let i = 0; i < bubbleFloat.length; i++) {
     bubbleFloat[i].showBubble();
     bubbleFloat[i].moveBubble();
   }
  fill(255)
  //  ellipse(50, 100, vol * 200, vol * 200);
  //  ellipse(150, 200, vol * 100, vol * 100);
  //  ellipse(250, 300, vol * 250, vol * 250);
  //  ellipse(350, 400, vol * 175, vol * 175);
  image(logo , windowWidth/2 , windowHeight/2 ,  vol * 550 , vol * 550 );
 
 
   
}

class Bubble {
  constructor(x  , y , r ){
    this.x = x;
    this.y = y;
    this.r = r;
  }
    move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
      stroke(1);
     //noStroke();
     strokeWeight(1);
      //fill(255 , 10);
    //ellipse(this.x , this.y , this.r * 2);
    image(paintBlue , this.x , this.y , this.r , this.r);
  }

}

class BubbleFloat {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  moveBubble() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  showBubble() {
    stroke(0);
    //noStroke();
    strokeWeight(1);
    //fill(255 , 10);
    //ellipse(this.x , this.y , this.r * 2);
    image(paintPink, this.x, this.y, this.r, this.r);
  }

}



