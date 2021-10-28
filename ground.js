class Ground{
    constructor(x,y,w,h){
      this.w = w;
      this.h = h;
      var options = {
        isStatic:true
      }
      this.body = Bodies.rectangle(x,y,this.w,this.h,options)
      World.add(world,this.body);
    }
    show(){
      //console.log(this.body);
      var pos = this.body.position;
      push();
      rectMode(CENTER)
      rect(pos.x,pos.y,this.w,this.h);
      pop();
    }
}