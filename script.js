/*
let person = {
  name: 'david',
  age: 12,
};
person.name = 'john'
console.log(person.name);

let selectedColors = ['red', 'blue'];
selectedColors[2] = 'green';
console.log(selectedColors[2]);


function multiply (a, b){
  return a * b;
};

let a = 5;
let b = 6;

let result = multiply(a,b);

console.log(result);



function calculate(num1, num2, operation){
  if (operation === "add"){
    return num1 + num2;
  }
  else if (operation === "subtract"){
     return num1 - num2;
  }
  else if(operation === "multiply"){
     return num1 * num2;
  }
   else if(operation === "divide"){
    return num1 / num2;
  }
   else if(operation === "modulo"){
    return num1 % num2;
  }
  else{
    return "invalid operation";
  }
  
}

let num1 = 10;
let num2 = 5;

let space = calculate(num1,num2,"modulo");

console.log(space);
*/






  const products = [
  {id: 1, name: "Laptop", price: 999 },
  {id: 2, name: "Mouse", price: 25 },
  {id: 3, name: "Keyboard", price: 79 },
  {id: 4, name: "Webcam", price: 149 },
];
let cart = [];

function addToCart(productId, quantity){
  const product = products.find(product => product.id === productId)//for every products in the list check if it's productid is equal to the id i'm looking for
}





#python quiz game

questions = ("How many elements are in the periodic table?: ",
             "Which animal lays the largest egg?: ",
             "What is the most abundant gas in Earth's atmosphere?: ",
             "How many bones are in the human body?;" ,
             "Which planet in the solar system is the hottest?: ")

options = (("A. 116","B. 117","C. 118","D. 119"),
           ("A. Whale","B. Crocodile","C. Elephant","D. Ostrich"),
           ("A. Nitrogen","B. Oxygen","C. Carbon-dioxide","D.  Hydrogen"),
           ("A. 206","B. 207","C. 208","D. 209"),
           ("A. Mercury","B. Venus","C. Earth","D. Mars"))

answers = ("C","D","A","A","B")
guesses = []
score = 0
question_num = 0

for question in questions:
  print("-------------------")
  print(question)
  for option in options[question_num]:
    print(option)



  guess = input("Enter (A, B, C, D): ").upper()
  guesses.append(guess)
  if guess == answers[question_num]:
    score +=1
  question_num += 1