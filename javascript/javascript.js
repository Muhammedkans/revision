function Person(name,age, place){
  this.name = name;
  this.age = age;
  this.place = place;

  this.infoo = function(){
    console.log(` my name is ${this.name}`)
  }

}

let Person1 = new Person("Muhammedkans", 34,'punnala');
Person1.infoo()


let Person3 = new Person("Mhaaaaaaaaaaaa",12,"PAPAPAPPA")

Person3.infoo()