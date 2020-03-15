// Registrare evento
document.addEventListener("DOMContentLoaded",
    function () {
        document.querySelector("button").onclick = count
    }
)

let contatore = 0;
let array_numeri = [5, 7, 11, 13];

function count() {
    contatore++;
    document.querySelector("#contatore").innerHTML = contatore

    if (array_numeri.includes(contatore)) {
        alert(`Coantatore as ${contatore} preseinte in ${array_numeri}`)
    } else {
        console.log(contatore)
    }
}
function cambia_messaggio_singolo() {
    document.querySelector('h1').innerHTML = "Arrivderciiii !!!";
}

function cambia_messaggio_ALL() {
    let highlightedItems = document.querySelectorAll('h1').innerHTML = "Ciaoooooooo!!!!";
    for (x in highlightedItems) {
        x.innerHTML = "cccc"
    }
}

        // function cambia_messaggio() {
        //     let name = prompt("Come ti chiamo ?")
        //     // alert('Ciaoooo ' + name + ' !!!' )
        //     // oppure tramite i template literals - ( with backtick - accenti gravi)
        //     alert(`Ciao ${name}`)
        // }

        // hello_world()
/*
more lines....
*/
