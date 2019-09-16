export class Rect {
    x: number;
    y: number;
    width: number;
    height: number;
  
    constructor(rect: DOMRect) {
      this.x = rect.x;
      this.y = rect.y;
      this.width = rect.width;
      this.height = rect.height;
    }

    public areCoordinatesAfter(x:number, y:number) {
      if(x > (this.x + this.width) && y > this.y) {
        return true;
      }

      if(y > (this.y + this.height)) {
        return true;
      }

      return false;
    }

    public areCoordinatesBefore(x:number, y:number) {
      if(x < this.x && y <= (this.y + this.height)) {
        return true;
      }

      if(y < this.y) {
        return true;
      }

      return false;
    }
  
    public containsCoordinates(x:number, y:number) {
      if(x < this.x)
          return false;
    
        if(x > this.x + this.width)
          return false;
        
        if(y < this.y)
          return false;
    
        if(y > this.y + this.height)
          return false;
    
        return true;
    }


  }