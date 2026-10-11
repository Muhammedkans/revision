
const students =  ["Arun", "subair", "sukoor", "maissoor"];


function studentFind(students, findstudent){
    for(let i = 0 ; i < students.length; i++){
      if(students[i] === findstudent){
         console.log(`find student ${findstudent}`);
      }
    }
}

studentFind(students,"Arun");