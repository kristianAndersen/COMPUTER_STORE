import {
    payCheck
} from './work.js';
import {
    bankBalance
} from './bank.js';

document.addEventListener('DOMContentLoaded', function () {


    const workBtn = document.querySelector('#workbtn');
    const bankBtn = document.querySelector('#bankbtn');
    const rploanBtn = document.querySelector('#repayloanbtn');

    workBtn.addEventListener("click", getPayedForWork);
    bankBtn.addEventListener("click", transferToBank);
    rploanBtn.addEventListener("click", repayLoanToBank);

    //bank
    const loanBtn = document.querySelector('#loanbtn');
    loanBtn.addEventListener("click", getLoan);

    fetch("/assets/data/laptop.json")
    .then(response => {
       return response.json();
    })
    .then(data => console.log(data));

    //work
    const workPay = 100;
    function getPayedForWork() {
        payCheck.setPay = (payCheck.getPay + workPay)
    }

    function transferToBank() {

        const toTransfer = payCheck.getPay
        const transferTolan = (10 / 100) * payCheck.getPay;

        if (bankBalance.getLoan == 0) {

            bankBalance.setbankBalance = bankBalance.getbankBalance + toTransfer;
            payCheck.setPay = 0;

        } else {

            payCheck.setOutStanding = payCheck.getOutStanding - transferTolan;
            bankBalance.setLoan = payCheck.getOutStanding;
            bankBalance.setbankBalance = toTransfer - transferTolan + bankBalance.getbankBalance;
            payCheck.setPay = 0;
        }


    }

    function repayLoanToBank() {

        if (payCheck.getOutStanding > 0) {

            //i got more mony than i owe to the bank wuhu
            let toTransfer;
            if (payCheck.getPay > payCheck.getOutStanding) {
                //transfer all the mony needed to close the loan
                do {
                toTransfer = payCheck.getPay - payCheck.getOutStanding;
                payCheck.setOutStanding = payCheck.getOutStanding - toTransfer;
                bankBalance.setLoan = payCheck.getOutStanding;
                payCheck.setPay = payCheck.getPay - toTransfer;
                } while (payCheck.getOutStanding > 0);

            } else {
                //i got less mony than i owe to the bank buuhu
                toTransfer = payCheck.getPay;
                payCheck.setOutStanding = payCheck.getOutStanding - toTransfer;
                bankBalance.setLoan = payCheck.getOutStanding;
                payCheck.setPay = 0;
            }
        }
    }


    //bank
    function getLoan() {
        const maxLoanLimit = bankBalance.getbankBalance * 2;
        let promt = parseInt(prompt("How much would you like to loan?"), 0);

        //No bank lends you money if you do not got none
        if (bankBalance.getbankBalance == 0) {
            alert("You got no dough so a loan is a no go....")
            return null;
        }

        //Put a cap on the credit line if user already has a loan
        if ((maxLoanLimit - maxLoanLimit / 2) < bankBalance.getLoan) {
            alert("Your current loan of " + bankBalance.getLoan + "kr. excites your line of credits");
            return null;
        }

        //if the loan wish is to big we offer a that match users credit
        if (promt > maxLoanLimit) {
            let alertStr = `That is a bit steap we can only loan you ${maxLoanLimit}`;
            if (confirm(alertStr)) {
                processLoan(maxLoanLimit);

            }
            return null;
        }
        //all checks out you get a loan 
        if (bankBalance.getbankBalance != 0 && promt <= maxLoanLimit) {
            processLoan(promt);
            return null;
        }

    }

    function processLoan(loanToProcess) {
        console.log(bankBalance.getLoan)
        bankBalance.setLoan = bankBalance.getLoan + loanToProcess;
        payCheck.setOutStanding = payCheck.getOutStanding + bankBalance.getLoan;
    }


})