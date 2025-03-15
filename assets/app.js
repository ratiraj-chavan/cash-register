//get required data
const billAmountInput = document.getElementById("bill-amount");
const cashGivenInput = document.getElementById("cash-given");
const checkBtn = document.querySelector(".return-change");
const numOfNotes = document.querySelectorAll('.no-of-notes');
const availNotes = [2000, 500, 100, 20, 10, 5, 1];
const errorDiv = document.querySelector('.error-msg');
const nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener('click', handleNextBtn);
checkBtn.addEventListener('click', handleCheckBtn);

function handleNextBtn() {

    hideErorMsg();
    let billAmount = parseInt(billAmountInput.value);

    //check if bill amount is valid & if valid show cash inout field
    if(!Number.isInteger(billAmount)) {
        showErorMsg("Enter valid bill amount. 😠😠");
    } else if(billAmount > 0) {
        document.querySelector('.cash-given-div').style.display = "block";
        document.querySelector('.return-change').style.display = "inline-block";
        nextBtn.style.display = "none";
    } else if(billAmount <= 0) {
        showErorMsg("Bill amount should be greater than 0 😠😠");
    }
}

function handleCheckBtn() {

    hideErorMsg();
    document.querySelector('.cash-change').style.display = "none";

    let billAmount = parseInt(billAmountInput.value);
    let cashGiven = parseInt(cashGivenInput.value);

    //check if bill amount is non negatve or not empty
    if(!Number.isInteger(billAmount)){
        showErorMsg("Enter valid bill amount. 😠😠");
        return false;
    } else if(billAmount <= 0) {
        showErorMsg("Bill amount should be greater than 0 😠😠");
        return false;
    }

    //check if cash given amount is non negatve or not empty
    if(!Number.isInteger(cashGiven)){
        showErorMsg("Enter valid cash given amount. 😠😠");
        return false;
    } else if(cashGiven <= 0) {
        showErorMsg("Cash given amount should be greater than 0 😠😠");
        return false;
    }

    let cashToBeReturn = cashGiven - billAmount;
    //check if cash given amount is less than bill amount
    if(
        (cashGiven > 0) && 
        (billAmount > 0) && 
        (cashGiven < billAmount)
    ){
        showErorMsg("Cash is less than bill amount! wanna wash the plates? 😀😀");
    }

    //check if bill amount is equal to cash given
    if(cashGiven == billAmount) {
        showErorMsg("No amount to be returned.👍👍");
    }

    //calculate change if cash given is greater than bill amount
    if(
        (cashGiven > 0) && 
        (billAmount > 0) &&
        (cashToBeReturn > 0)
    ){
        document.querySelector('.anim').style.display = "block";
        setTimeout(() => {
            calculateCashToBeReturn(cashToBeReturn);
            document.querySelector('.anim').style.display = "none";
        }, 3000);
    }

}

function showErorMsg(msg) {
    errorDiv.innerText = msg;
    errorDiv.style.display = "block";
}

function hideErorMsg() {
    errorDiv.style.display = "none";
}

function calculateCashToBeReturn(amountToBeReturn) {
    document.querySelector('.cash-change').style.display = "inline-block";
    //[2000, 500, 100, 20, 10, 5, 1] => 89
    for(let i=0; i<availNotes.length; i++){
        let notesCount = Math.trunc(amountToBeReturn/availNotes[i]); // 89/2000 => 0
        numOfNotes[i].innerText = notesCount; // 2000[0]
        let remainingAmount = amountToBeReturn % availNotes[i]; // 89%2000 => 0
        amountToBeReturn = remainingAmount; //89
    }
}

//The Math.trunc() method returns the integer part of a number. ex: (0.3656 => 0)
//The Math.trunc() method removes the decimals (does NOT round the number).
//display = "inline-block" ==> Displays an element as an inline-level block container. itself is formatted as an inline element, but height and width values can be applied
//display = "block" ==> Displays an element as a block element (like <p>). It starts on a new line, and takes up the whole width