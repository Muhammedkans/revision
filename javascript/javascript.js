


const array1  = [20,10,30,20, 9, 7];


const array2 =  array1.filter((item)=>{
 return item > 10 
})

console.log(array2)



const products = ["iPhone 15", "Samsung S23", "MacBook Air", "Google Pixel"];

const searchText = "Phone"; 

const searchResults =  products.filter((product)=>{
  return product.toLowerCase().includes(searchText.toLowerCase())
})


console.log(searchResults)




const array = ["pending" , "shipping", "delivering", "pending"];


        const  reduce =  array.reduce((acc,status)=>{
              acc[status] = (acc[status] || 0)+1
              return acc
        },{})

        console.log(reduce);





        const users = ["Azna", "Rahul", "Sneha"];
users.forEach((user) => {
    console.log(`Sending email to ${user}... ✅`);
    // Logic to send email would go here
});