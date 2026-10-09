

class Hero{


constructor(name, level ){
 this.name = name
 this.level = level
 this.greet = function (){
  return ` just for Study purpose ${this.name} and ${this.level} `
 }
}

}


class Mega extends Hero{
   constructor(name, level, spell){
       super(name,level);
       this.spell
       this.greet = function (){
  return ` just for Study purpose ${this.name} and ${this.level} and ${spell} `
 }
   }
  
}

const Hero1 = new Hero("Muhammed", 10);
console.log(Hero1.greet());

const Mega22 = new Mega("shuiiiiiiiiiiiii", 100,"magic spe;lll");
console.log(Mega22.greet());