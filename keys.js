class Key {
  constructor( index, originX, originY , size, isPlayed, isScale, label){
    this.index = index
    this.x = originX
    this.y = originY
    this.size = size
    this.w = this.size
    this.h = this.size*6
    this.isPlayed = isPlayed
    this.isScale = isScale  
    this.label = label
    this.thickness = 0.5
    
    this.frameColor = 'green'
    this.scaleColor = 'white'
    this.scaleColorWhite = 'rgb(255,255,255)(255,255,255)'
    this.scaleColorBlack = '#000000(0,0,0)'
    this.playedColor = '#00B0FF'
    
  }

  state(){
   let middle = this.x+this.w/2 +this.delta
   let x = this.x+this.delta
   
    if ((Math.abs(mouseX-middle)<10)&&(mouseY>this.y)&&(mouseY<this.y+this.h)) {
      
      this.isPlayed = true
    }
      
    else 
      this.isPlayed = false
  }
  
  display(){    
    // par defaut 
    noFill()
    colorMode(HSL)
    stroke(30*(this.index%12),50,50)
    //stroke(this.frameColor)  
    strokeWeight(1)
    color('#03A9F4')
    
    // touches noires
    if ([1,3,6,8,10].includes(this.index%12)){
       this.scaleColor = 'rgb(22,21,21)' //this.scaleColorBlack 
    } else { 
        this.scaleColor = 'rgb(249,249,238)' 
    }
    
    if (this.isScale) {
      fill(this.scaleColor)
      noStroke()       
    }
    if (this.isPlayed){
      fill(this.playedColor)
      noStroke()
    } 


    // permet de se caler a l endroit on on dessine la touche
    this.delta = this.getDelta(this.index)   
    
    if ([0,5].includes(this.index%12)) { 
      this.CShape(this.x+this.delta ,this.y, this.w, this.h)
    } 
    if ([1,3,6,8,10].includes(this.index%12)) {  
      this.blackKeyShape(this.x+this.delta,this.y, this.w, this.h)
    } 
    if ([2,7,9].includes(this.index%12)) { 
      this.DShape(this.x+this.delta,this.y, this.w, this.h)
    } 
    if ([4,11].includes(this.index%12)) { 
      this.EShape(this.x+this.delta,this.y, this.w, this.h)
    }
    
    this.state()
  } 
  
  
    
  CShape(x,y,w,h){
    beginShape();  
    vertex(x, y);
    vertex(x, y+h)
    vertex(x+w-this.thickness, y+h )
    vertex(x+w-this.thickness, y+h*0.6) 
    vertex(x+w/1.5, y+h*0.6)
    vertex(x+w/1.5, y );
    endShape(CLOSE)
    //text(this.label,x,y)
  }
  
  blackKeyShape(x,y,w,h){
    rect(x+this.thickness, y, w/1.5-this.thickness*2 , h*0.6 -this.thickness);
    //text(this.label,x-w/6,y)
  }
  
  DShape(x,y,w,h){
    beginShape();  
    vertex(x+(w/3), y);
    vertex(x+w/1.5, y);
    vertex(x+w/1.5, y+h*0.6);
    vertex(x+w-this.thickness, y+h*0.6 );
    vertex(x+w-this.thickness, y+h);
    vertex(x, y+h );
    vertex(x, y+h*0.6 )
    vertex(x+(w/3), y+h*0.6)
    endShape(CLOSE)
    //text(this.label,x,y)
  }
 
  EShape(x,y,w,h){
    beginShape();
    vertex(x+w/3, y);
    vertex(x+w-this.thickness, y);
    vertex(x+w-this.thickness, y+h );
    vertex(x, y+h );
    vertex(x, y+h*0.6 );
    vertex(x+w/3, y+h*0.6 );
    endShape(CLOSE)
    //text(this.label,x,y)
  }

  getDelta(index){
    let delta 
    let octave = Math.floor(index/12)
    
    //decalage par defaut = 1/2 touche
    delta = index*this.w/2
    
    // pour les touches noire on reajuste a 2/3
    if ([1,3,6,8,10].includes(index%12)) {
      delta = delta +this.w/6
      
    } 
    if ( (index%12) > 4) delta = delta +this.w/2 //+octave*this.w/2
    //
    
    if ( octave>0 ) delta = delta +(octave)*this.w
    
    return delta
  }
}