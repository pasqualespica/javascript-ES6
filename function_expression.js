
let countdown = 5;

const id = setInterval(function () {
    if (countdown > 0) {
        console.log(`${countdown--}...`);
    } else if (countdown === 0) {
        console.log('Go!');
        clearInterval(id);
    }
}, 1000);


