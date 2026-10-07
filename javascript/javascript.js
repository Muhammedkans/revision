



function caclculateProduct(numbers) {
  return numbers.reduce((previous, current) => {
    return previous + current
  }, 0)
}



const number = [1, 2, 3, 4, 50];

const product = caclculateProduct(number)

console.log(product);