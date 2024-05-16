class Piano {

     
  constructor( x, y, s, keyCount ){
     this.x = x
     this.y = y
     this.s = s
     this.k = keyCount // 49 C3, 61 C2, 76 E1, 88 A0 
     this.keys = []
     for ( let i =0; i<keyCount; i++){
        this.keys.push(new Key(i ,x, y, s, [].includes(i%12),true, 'X')) 
     }
  }

    display(){
      for (let key of this.keys){
        key.display()         
      }
    }
        

}