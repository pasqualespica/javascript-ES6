class Square {
    constructor(size) {
        this.size = size; // Triggers the setter

    }
    set size(value) {
        this._size = value; // Sets the private field

    }
    get area() {
        return this._size ** 2;

    }

}

const box = new Square(3);
console.log("Area quadrato: ", box.area);

box.size = 5;
console.log("Nuova area quadrato: ", box.area);


// A common pattern to encapsulate internal implementation in JavaScript
//  is an Immediately Invoked Function Expression(IIFE), 
// which can look like this:
const odometer = (function (initial) {
    let mileage = initial;
    return {
        get: function () { return mileage; },
        put: function (miles) { mileage += miles; }

    };
})(33000);

console.log('--------------------------0')
console.log(odometer.put(65));
console.log('--------------------------1')
console.log(odometer.put(12));
console.log('--------------------------2')
console.log(odometer.get());
console.log('--------------------------3')

// In other words, it’s an anonymous function that calls itself.
// You can use the newer arrow function to create an IIFE too:
const odometer = ((initial) => {
    let mileage = initial;
    return {
        get: _ => mileage,
        put: (miles) => mileage += miles
    };
})(33000);