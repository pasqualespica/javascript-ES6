
// VIDEO on prototype ...

// https://www.youtube.com/watch?v=VHlBwk_ZQRs&feature=youtu.be

function talk(sound) {
    // console.log(`Stampp this \n${this}`)
    // console.log(typeof(this))
    console.log(this.sound)
}

let animal = {
    // talk : talk
    talk
}

let cat = {
    sound: "miaooooo"
}

let dog = {
    sound : "baubau"
}

let prarieDog = {
    howl: function () {
        console.log(this.sound.toUpperCase())
    }
}
// If you remove this setPrototypeOf doesn't work !!!
// Remember JS dont use CLASS but PROTOTYPE that it's like DELEGATE
Object.setPrototypeOf(cat, animal)
Object.setPrototypeOf(dog, animal)
console.log('The cat say :')
cat.talk()

// Before call `talk` on `dog` object we change the behavior
animal.talk = () => {
    console.log('i am a littler teapot ')
}
console.log('The dog say :')
dog.talk()

Object.setPrototypeOf(prarieDog, dog)
prarieDog.howl()

