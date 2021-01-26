const rectangle = require('./rectangle');
var rect = require('./rectangle');  //import 개념과 비슷함

function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);
    rect(l,b,(err,rectangle)=>{
        if(err){
            console.log("ERROR: ", err.message);
        }
        else{
            console.log("The area of the rectangle of dimensions l = "
            + l + " and b = "+ b +" is " + rectangle.area());
            console.log("The perimeter of the rectangle of dimensions l = "
            + l + " and b = "+ b +" is " + rectangle.perimeter());
        }
    });
    console.log("This statement is after the call to rect()");
}

solveRect(2,4);
console.log("*****");
solveRect(3,5);
console.log("*****");
solveRect(0,5);
console.log("*****");
solveRect(-3,5);
console.log("*****");