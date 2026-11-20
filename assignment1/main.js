/*
//Q1

let n = "123";
console.log(parseInt(n)+7);
*/

/* 
//Q2

let n = 0;
console.log(n ? "valid" : "Invalid");
 */

/*
//Q3
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) 
{        continue;
}        console.log(i);

}
 */

/* 
//Q4
let arr=[1, 2, 3,4,5];
console.log( arr.filter((n)=>n%2===0))
 */

/* 
//Q5
let arr1=[1, 2, 3];
let arr2= [4, 5, 6];
console.log([...arr1,...arr2])
 */

/* 
//Q6
let n=1;
switch(n)
{
    case 1:
        console.log("sunday")
        break;
    case 2:
        console.log("monday")
        break;
    case 3:
        console.log("tuesday")
        break;
    case 4:
        console.log("wednesday")
        break;
    case 5:
        console.log("thursday")
        break;
    case 6:
        console.log("friday")
        break;
    case 7:
        console.log("saturday")
        break;
    default:
        console.log("Invalid day")
}
 */
/* 
//Q7
let arr= ["a", "ab", "abc"];
arr.map((n)=>console.log(n.length))

 */

//Q8
/* 
let n=3;
function isDivisible(n)
{
     if(n%5===0&&n%3===0)
    {
        console.log("Divisible by both")
    }
    else
    {
        console.log("Not Divisible by both")
    }
}
isDivisible(n)
 */

/* //Q9
const squareFun= (n)=>n*n;
console.log( squareFun(5)); */

/* 
//Q10
function formattedPersonData({name,age})
{
    return `${name} is ${age} years old`;
}
console.log( formattedPersonData( {name: 'John', age: 25})) */

/* //Q11
function sumOfNumbers(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sumOfNumbers(1, 2, 3, 4, 5));
 */

/* 
//Q12
function promFunction()
{
    return   new Promise((resolve) => {
      setTimeout(()=>{
        resolve("success")

      },3000)});
    
}

promFunction().then((res)=>{console.log(res)})
 */

/* 
//Q13
let arr= [1, 3, 7, 2, 4];

function maxNumber(arr)
{
    return arr.sort((a,b)=>b-a)[0]
}
console.log( maxNumber(arr)) */

/* //Q14
let o={name: "John", age: 30}

function objKeys(obj)
{
    return Object.keys(obj)
}
console.log(objKeys(o)) */

//Q15
let s= "The quick brown fox";
function splitString(s)
{
    return s.split(" ")
}

console.log(splitString(s))

//Part 2: Essay Questions:
/*
Q1: 
    forEach is an array method takes a callback function and perform any opertaion on each elemnt . you can't break in it or use continue statement.
    for of is a language looping statemant that works with any iterable like arrays , maps , strings and sets
Q2:
    Hoisting means that you could move the declaration of a function or variable to the top of its scope before code execution.
    Temporal Dead Zone (TDZ) is the peroid of time during which the let and const variables are hoisted but not yet initialized. If you try to access them before initialization, it will throw a ReferenceError.
Q3:
    === compares value and type 
    == perform a type coercion then compares values 
Q4
    try runs the code and catch handles any error caused by this block of code .in async operations the try catch handels the error.
Q5
    type Conversion: explicit done by developer 
    type coercion: implicit done by js 
 */

