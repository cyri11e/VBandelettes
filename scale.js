class Scale{
  
  constructor(x,y,size,scaleName,tonic){
    this.x = x
    this.y = y
    this.size = size
    this.scaleName = scaleName
    this.scale_ = Tonal.ScaleType.get(scaleName)
    this.scale_.intervals.push('8P')
    textSize(size*0.7)
    
  }

  setTonic(note){
    this.tonic = note
  }
  intervalToDegre(intervalName){
    let interval = Tonal.Interval.get(intervalName)
    let degreNum = interval.num
    if (degreNum == 8) degreNum = 1
    let alt = Tonal.Interval.get(intervalName).alt
    let dieseBemol = ((alt == 1)?('#'):('')) + ((alt == -1)?('b'):(''))
    
    return degreNum+dieseBemol
  }
  
  updateScale(scaleName) {
    this.scaleName = scaleName
    this.scale_ = Tonal.ScaleType.get(scaleName)
    this.scale_.intervals.push('8P')
  }
  
  update(x, y){
      this.x = x
      this.y = y       
  }
  
  detect() {
    let index,note
  
    if (this.y+this.size >= piano.y) 
        index = Math.floor((this.x-piano.s/2)/20)  
  
    if (index ==5)
       index = undefined
    else
    if ((index > 5) && (index < 13))
       index--

    if (index>=0) 
      note = Tonal.Note.get(Tonal.Note.fromMidi(60+index)).pc
    
  return note
} 
  
  
  
  mousePressed(){
    let d 
    d= dist(mouseX,mouseY,this.x,this.y)
    if (d<this.size)  
      this.move = true 
    else
      this.move = false
 }

  mouseReleased(){
    this.move = false
  }
  
  mouseDragged(){
    if (this.move) this.update(mouseX, mouseY)
    let note = this.detect()
    this.tonic = note    
  }


  getState(){
    if (dist(mouseX,mouseY,this.x,this.y) < 10) {
      this.isSelected = true  
    } else
    this.isSelected = false   
  }
  
  display(){
    let interval,label,x,y,s,offsetX,bColor,intervals=this.scale_.intervals
    x =this.x
    y= this.y
    s =this.size 

    
    strokeWeight(1.5)
    textAlign(CENTER,CENTER)

    rect(x-s,y-s-5,s*12+2*s ,2*s)
    
    
    for ( let i=0 ; i < intervals.length  ; i++) {
      interval = Tonal.Interval.get(intervals[i])
      offsetX = (interval.chroma+interval.oct*12)*s
      label = this.intervalToDegre(intervals[i])
      //recuperation de la couleur
      bColor = get(x+offsetX, y+s+1)
      fill(bColor)
      stroke(0)
      circle(x+offsetX, y, s)
      line(x+offsetX, y+s/2, x+offsetX, y+s) 
      
      stroke(0)

      fill('white')
      text(label, x+offsetX,y)
          
    } 
    
    
    textAlign(LEFT,TOP)
    // noir
    noStroke()
    fill(0)
    text(this.tonic+' '+this.scaleName, x-s+5,y-s-5)   
    
    this.getState()
  }
  
} // Class