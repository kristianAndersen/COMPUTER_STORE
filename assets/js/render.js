

 const payfromwork = document.querySelector('#payfromwork');
 const bbalance = document.querySelector('#bankbalance');
 const bLoan = document.querySelector('#bankLoan');
 const bTotal = document.querySelector('#bankTotal')

const createState = (state) => {

    return new Proxy(state, {
      set(target, property, value) {
        target[property] = parseInt(value);
        render(target);
        return true;
      }
    });
  };

function render(target){
  

   if(target.pay){
        payfromwork.innerHTML=target.pay;
   }

   if(target.balance){
       
        bbalance.innerHTML=target.balance;
        payfromwork.innerHTML=0;
        bTotal.innerHTML=target.balance+target.loan
    }

    if(target.loan){
       
        bLoan.innerHTML=target.loan;
      
    }

}

  export {createState}