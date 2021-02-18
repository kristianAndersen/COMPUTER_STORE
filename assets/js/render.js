

 const payfromwork = document.querySelector('#payfromwork');
 const bbalance = document.querySelector('#bankbalance');
 const bLoan = document.querySelector('#bankLoan');
 const bTotal = document.querySelector('#bankTotal');
 const rploanBtn = document.querySelector('#repayloanbtn');

const createState = (state) => {

    return new Proxy(state, {
      set(target, property, value) {
        target[property] = value;
        render(target);
        return true;
      }
    });
  };

function render(target){

  

   if(target.pay){
        payfromwork.innerHTML=target.pay;
        bLoan.innerHTML=target.outStanding;
      
   }

   if(target.balance){
   
        bbalance.innerHTML=target.balance;
        payfromwork.innerHTML=0;
        bTotal.innerHTML=target.total;
        bLoan.innerHTML=target.loan;
        
        //toggle repay button
        if(target.loan>0){
            rploanBtn.style="display: inline"
         }else{
            rploanBtn.style="display: none"
         }

    }

}

  export {createState}