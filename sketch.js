let wH 
let wW 
let piano 
let scales = []
let scaleNum =0
let SCALES = ["major", "minor", "harmonic minor","melodic minor","dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"] 

function setup() {
  wH = windowHeight
  wW = windowWidth
  createCanvas(wW, wH);  
  
  scales.push(new Scale( 50, 50, 23, SCALES[scaleNum]))
  scales.push(new Scale( 250, 50, 23, SCALES[scaleNum]))
    
  // clavier
  piano = new Piano(10, 100, 40, 49 )
}

function draw() {
  background('#2797CA');
 
  // clavier
  push()
  piano.display()
  pop()
  
  
  for (const s of scales){
    push()
    s.display()
    pop()  
  }  

}



function mousePressed(){
 for (const s of scales)
   s.mousePressed()

}

function mouseReleased(){
   for (const s of scales)
     s.mouseReleased()
  
}

function mouseDragged(){
 for (const s of scales)
     s.mouseDragged()  
}

function mouseWheel(event) {  

         
  let direction
  if (event.delta > 0) {
    direction = +1;
  } else {
    direction = -1;
  }

  scaleNum = scaleNum +direction 

  if (scaleNum >= SCALES.length) {
    scaleNum = 0
  }
  if (scaleNum < 0) {
    scaleNum = SCALES.length-1
  }
  
  for (const s of scales){
     if (s.isSelected) 
      s.updateScale(SCALES[scaleNum]);
  }

}
  