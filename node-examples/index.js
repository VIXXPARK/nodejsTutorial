var rect = require('./rectangle');  //import 개념과 비슷함

function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);
    
    if ( l <=0 || b <= 0 ){
        console.log("Rectangle dimensions should be greater than zero: l = " + l + ", and b = "+ b );
    }
    else {
        console.log("The area of the rectangle is " + rect.area(l,b));
        console.log("The perimeter of the rectangle is " + rect.perimeter(l,b));
    }
}

solveRect(2,4);
console.log("*****");
solveRect(3,5);
console.log("*****");
solveRect(0,5);
console.log("*****");
solveRect(-3,5);
console.log("*****");