import { createState } from './render.js';

    const payCheck = createState({
        pay: 0,
        outStanding:0
    });
    
    Object.defineProperty(payCheck, "getPay", {
        get: function () {
            return this.pay;
        }
    });

    Object.defineProperty(payCheck, "setPay", {
        set: function (value) {
            this.pay = value;
        }
    });

    Object.defineProperty(payCheck, "getOutStanding", {
        get: function () {
            return this.outStanding;
        }
    });

    Object.defineProperty(payCheck, "setOutStanding", {
        set: function (value) {
            this.outStanding = value;
        }
    });

    export {payCheck};
    
