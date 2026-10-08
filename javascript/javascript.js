

function createObject(firstName, age, place){

  return {
    firstName : firstName,
    age:age,
    place:place,
    intro: function(){
      console.log(`hi my name is ${firstName} and my age is ${age}my place is : ${place}`);
    }
  }
}

let muhammed  = createObject("muhammedkans" , 23, "punnala");
muhammed.intro()

