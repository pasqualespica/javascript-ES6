
let add1 = (a, b) => {
    const result = a + b;
    return result;
}



// return an object literal
let add2 = (a, b) => ({
    result: a + b,
    // type : "intero",
    // fff : "efef"
});


console.log(typeof(add1))
a = add1(4, 4)
console.log(a, `the function return a ${typeof(a)}`)

console.log(typeof(add2))
b = add2(3,3)
console.log(b, `the function return a ${typeof (b)}`)