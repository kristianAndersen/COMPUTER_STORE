import { createState } from './render.js';


//bank 
 const bankBalance = createState({
    balance:0,
    loan:0
});

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

export {bankBalance};