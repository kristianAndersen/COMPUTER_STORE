import {payCheck} from './work.js';
import {bankBalance} from './bank.js';

document.addEventListener('DOMContentLoaded', function () {
  


    
    let dataObj={};
    let curlaptop=0;
    const laptoplist = document.querySelector('#someList')
    const datafeat = document.querySelectorAll("[data-feat]");
    const features = document.querySelector("#features");

    const selectLaptop = document.querySelector("#laptops");
   


    const workBtn = document.querySelector('#workbtn');
    const bankBtn = document.querySelector('#bankbtn');
    const rploanBtn = document.querySelector('#repayloanbtn');
    const buyit = document.querySelector('#buyit')

    const bbalance = document.querySelector('#bankbalance');
    const bLoan = document.querySelector('#bankLoan');
    const bTotal = document.querySelector('#bankTotal');

    workBtn.addEventListener("click", getPayedForWork);
    bankBtn.addEventListener("click", transferToBank);
    rploanBtn.addEventListener("click", repayLoanToBank);
    buyit.addEventListener('click', buyLaptop, false)
  

    //bank
    const loanBtn = document.querySelector('#loanbtn');
    loanBtn.addEventListener("click", getLoan);

    async function fetchMoviesJSON() {
        const response = await fetch('/assets/data/laptop.json');
        const data = await response.json();
        return data;
    }

    fetchMoviesJSON().then(data => {
        dataObj=data;
        laptopSlide(dataObj)
    });
   
    function laptopSlide(data) {

        for (let i = 0; i < data.length; i++) {


            let name = data[i].name;
            let feature = data[i].feature;
            let description = data[i].description;
            let price = data[i].price;
            let image = data[i].image;

            datafeat[i].setAttribute('data-feat', feature);

            let template = `<div class="item" id="laptop${i}">
                            <img src="assets/images/${image}.png" class="imgc">
                            <h4 class="itemheading">${name}</h4>
                            <p class="itemdesc">${description}</p>
                            <p>Price:  <span id="laptopPrice">${price}</span> kr.</p>
                            </div>`

            laptoplist.innerHTML += template;
        }

        setFeatureDesc()
    }

    /**Select a laptop from the dropdown */
    selectLaptop.addEventListener("change", laptopitem, false);
    function laptopitem(e) {
        let num = e.currentTarget.value;
        curlaptop=num;
        setFeatureDesc(num)
    }

    function setFeatureDesc(num = 0) {
        features.innerHTML = datafeat[num].getAttribute('data-feat');
        document.querySelector('#laptop' + num).scrollIntoView({ behavior: 'smooth' });
    }








     //buy 
     function buyLaptop() {
     
        const laptopPrice= dataObj[curlaptop].price
        const toDeduct= bankBalance.getTotal - laptopPrice;

        if(laptopPrice<bankBalance.getTotal || laptopPrice==bankBalance.getTotal ){

            // 
           // 
            bankBalance.setbankBalance = (bankBalance.getTotal - laptopPrice);
             bankBalance.setTotal = bankBalance.getbankBalance-bankBalance.getLoan;
          //(bankBalance.getbankBalance-bankBalance.getLoan)
            
            /**For some reason the render will not update so 
             * i have to do it here :(
            */
            bbalance.innerHTML=bankBalance.getbankBalance;
            bTotal.innerHTML=bankBalance.getTotal;
            bLoan.innerHTML=bankBalance.getLoan;
            
            alert("The new "+dataObj[curlaptop].name+" is on its way to you")
          
            return;
        }
        alert("Sorry we do no conduct buiness with poore people")
        
       
    }



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
            bankBalance.setTotal = bankBalance.getbankBalance+bankBalance.getLoan;
            payCheck.setPay = 0;

        } else {

            payCheck.setOutStanding = payCheck.getOutStanding - transferTolan;
            bankBalance.setLoan = payCheck.getOutStanding;
            bankBalance.setbankBalance = toTransfer - transferTolan + bankBalance.getbankBalance;
            
            //better check if the bank account is in + or -
            if(payCheck.getOutStanding>=0 && bankBalance.getbankBalance <=0){
                bankBalance.setTotal = bankBalance.getLoan+bankBalance.getbankBalance;
            }else{
                bankBalance.setTotal = -bankBalance.getLoan+bankBalance.getbankBalance;
            }

                
           
            payCheck.setPay = 0;
        }


    }

    function repayLoanToBank() {

        if (payCheck.getOutStanding > 0) {

            //i got more mony than i owe to the bank so i can repay my loane
            
            if (payCheck.getPay > payCheck.getOutStanding) {
            
                //transfer all the mony needed to close the loan
                do {
                    let toTransfer = payCheck.getPay - payCheck.getOutStanding;
                    payCheck.setOutStanding = clamp(payCheck.getOutStanding - toTransfer, 0, payCheck.getOutStanding);
                    bankBalance.setLoan = payCheck.getOutStanding;
                    bankBalance.setTotal = bankBalance.getbankBalance+bankBalance.getLoan;

                    payCheck.setPay = payCheck.getPay - toTransfer;
                } while (payCheck.getOutStanding > 0);

          
            } else{
                alert("A loane can only be paied in full\n and you need to have a available amount in cash")
            }
            
            
        }
    }
    /**no bank ows a normal customer money so i better  
     * prevent the loan going nigative  
      */
    function clamp(val, min, max) {
        return val > max ? max : val < min ? min : val;
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
        bankBalance.setTotal = bankBalance.getbankBalance+bankBalance.getLoan;
        payCheck.setPay=payCheck.getPay;

    }


 


})