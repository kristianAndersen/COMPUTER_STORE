document.addEventListener('DOMContentLoaded', function () {


    //work
    const workBtn = document.querySelector('#workbtn');
    const payfromwork = document.querySelector('#payfromwork');

    workBtn.addEventListener("click", payForWork);



    //bank
    const loanBtn = document.querySelector('#loanbtn');
    const rploanBtn = document.querySelector('#repayloanbtn');
    const bbalance = document.querySelector('#bankbalance');

    loanBtn.addEventListener("click", getLoan);


    function getLoan() {
        const maxLoanLimit=pay.getPay * 2;
        
        let promt = prompt("How much would you like to loan?");
        
        //No bank lends you money if you do not got none
        if (pay.getPay == 0) {
            alert("You are too poore, work some more and come back")
            return null;
        }

        //if the loan wish is to big
        if (promt > maxLoanLimit) {
            let alertStr = `That is a bit steap we can only loan you ${maxLoanLimit}`;
            if (confirm(alertStr)) {
                console.log('get the loan anyway');
                processLoan(maxLoanLimit);
                
            } else {
                return null;
            }
        }

        if(pay.getPay!=0 && promt < (pay.getPay * 2) ){
            console.log('good to go get the loan');
            processLoan(promt);
        }

    }


function processLoan(loanToProcess){

bankBalance.setLoan =loanToProcess

}





    
    //bank 
    const bankBalance = {
        balance: 0,
        loan: 0
    }

    // getting property
    Object.defineProperty(bankBalance, "getbankBalance", {
        get: function () {
            return this.balance;
        }
    });

    // setting property
    Object.defineProperty(bankBalance, "setbankBalance", {
        set: function (value) {
            this.balance = value;
        }
    });


    Object.defineProperty(bankBalance, "getLoan", {
        get: function () {
            return this.loan;
        }
    });
   
    Object.defineProperty(bankBalance, "setLoan", {
        set: function (value) {
            this.loan = value;
        }
    });





    //work
    const workPay = 100;
    function payForWork() {
        pay.setPay = (pay.getPay + workPay)
        payfromwork.innerHTML = pay.getPay;
    }



    const pay = {
        paycheck: 0
    }

    // getting property
    Object.defineProperty(pay, "getPay", {
        get: function () {
            return this.paycheck;
        }
    });

    // setting property
    Object.defineProperty(pay, "setPay", {
        set: function (value) {
            this.paycheck = value;
        }
    });








})