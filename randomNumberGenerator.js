let shouldStopImmediately = false;

function* randomNumberGenerator(maxTries = 3) {
    let tries = 0;
    while (tries++ < maxTries) {
        if (shouldStopImmediately) {
            return ; // The value is optional
            console.log('daje1')
        }
        console.log('daje2')
        yield Math.random();
    }
}


const gen = randomNumberGenerator(3)

while (a=gen.next()) {
    console.log(a)
}