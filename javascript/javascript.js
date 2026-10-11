


function numberReverse(num){
   const num1 =  num.toString().split("").reverse().join("");
   return parseInt(num1) * Math.sign(num);
    
}

console.log(numberReverse(-4567))