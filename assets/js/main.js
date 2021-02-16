import {
    payCheck
} from './work.js';
import {
    bankBalance
} from './bank.js';

document.addEventListener('DOMContentLoaded', function () {


    const workBtn = document.querySelector('#workbtn');
    const bankBtn = document.querySelector('#bankbtn');

    workBtn.addEventListener("click", getPayedForWork);
    bankBtn.addEventListener("click", transferToBank);


    //bank
    const loanBtn = document.querySelector('#loanbtn');
    const rploanBtn = document.querySelector('#repayloanbtn');
    const bbalance = document.querySelector('#bankbalance');

    loanBtn.addEventListener("click", getLoan);


    //work
    const workPay = 100;

    function getPayedForWork() {
        payCheck.setPay = (payCheck.getPay + workPay)

    }

    function transferToBank() {

        if (bankBalance.getLoan < 0) {

        } else {
            let toTransfer = payCheck.getPay
            bankBalance.setbankBalance = bankBalance.getbankBalance + toTransfer;
            payCheck.setPay = 0;
        }

    }

    //bank
    function getLoan() {
        const maxLoanLimit = bankBalance.getbankBalance * 2;
        let promt = parseInt(prompt("How much would you like to loan?"), 0);


        //No bank lends you money if you do not got none
        if (bankBalance.getbankBalance == 0) {
            alert("You are too poore, work some more and come back")
            return null;
        }


        if ((maxLoanLimit-maxLoanLimit/2) < bankBalance.getLoan) {
            alert("Your current loan of " + bankBalance.getLoan + "kr. excites your line of credits\n bank some $ and try again");
            return null;
        }

        //if the loan wish is to big
        if (promt > maxLoanLimit) {
            let alertStr = `That is a bit steap we can only loan you ${maxLoanLimit}`;
            if (confirm(alertStr)) {
                console.log('get the loan anyway');
                processLoan(maxLoanLimit);
            }
        }


        if (bankBalance.getbankBalance != 0 && promt <= maxLoanLimit) {
            console.log('good to go get the loan');
            processLoan(promt);

        } else {
            console.log("wuu")
            return null;
        }

    }

    function processLoan(loanToProcess) {

        console.log(bankBalance.getLoan)
        bankBalance.setLoan = bankBalance.getLoan + loanToProcess;

    }


})