function average(...numbers) {
    if (numbers.length > 0) {
        const sum = numbers.reduce((a, x) => a + x);
        return sum / numbers.length;

    }
    return 0;
} 

console.log(average())
console.log(average(1,2,3))
console.log(average(4,5,6,7,7,7))



function printamelo(...numbers) {
    let a = 0;
    numbers.forEach(e => {
        a = e + 10;
        console.log("daje:", a);
    })

} 



elementi = [1,2,3,4,5,6,7,8,9]

printamelo(...elementi)
