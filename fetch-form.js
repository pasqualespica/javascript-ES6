function getJSON(response) {
    let data = response.json()
    return data
}

function getCuurentyRate(currency) {

    let url = "https://api.exchangeratesapi.io/latest?base=" + currency;

    // Chaining promises
    fetch(url)
        .then(getJSON)
        .then(data => {
            console.log("Data : ", data)
            let rate = Object.values(data.rates)[0]

            // valorizziamo il nostro H2 del form

            // `` backtick - template strings !!!
            // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/template_strings

            document.querySelector("#exchange-results").innerHTML = `1.00 Euro corrisponde a ${rate} ${currency}`;
        })
        .catch( err => {
            // console.log("Errore : ", err)
            document.querySelector("#exchange-results").innerHTML = `Errore ${err}`;

        })
}

// mettiamo in ascolto degli eventi dal FORM

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#myform").onsubmit = event => {

        event.preventDefault();
        
        const currency = document.querySelector("#mycurrency").value;

        getCuurentyRate(currency);

        document.querySelector("#mycurrency").value = "";
    }

})