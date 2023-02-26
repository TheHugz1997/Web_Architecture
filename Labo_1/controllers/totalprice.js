const priceBySeat = 45;
const priceForAssurance = 20;

function calculPrice() {
    var seatsNumber = document.getElementById("seats").value;          
    const assuranceCheckbox = document.getElementById("assurance");
    if (assuranceCheckbox.checked) {
        console.log("Assurance checkbox is selected");
        var result = (seatsNumber*priceBySeat) + priceForAssurance;
        var text = "Total de la réservation :" + " " + result;
    } else {
        console.log("Assurance checkbox is not selected");
        var result = (seatsNumber*priceBySeat);
        var text = "Total de la réservation :" + " " + result;
    }
    document.getElementById('spanResult').textContent = text;
}

const calculateTotalBtn = document.getElementById('calculateTotal');
calculateTotalBtn.addEventListener('click', calculPrice);