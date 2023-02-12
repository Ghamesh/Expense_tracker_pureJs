
//========= Select elements from the html document ====//

let transactions = document.querySelector("#transactions");
let balance = document.querySelector("#balance");
let button = document.querySelector("#submit");
let textValue = document.querySelector("#text-value");
let amountValue = document.querySelector("#amount-value");

//==== Define an array for store tranctions ======//

let transactionsList = [];

//== Functions to update tranctions in local storage =====//

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactionsList));
};

//===== Function to retrieve transactions from local storage ======//

const retrieveTransactions = () => {
  if (localStorage.getItem("transactions")) {
    transactionsList = JSON.parse(localStorage.getItem("transactions"));
  }
};

//==== Function to render transactions ====//

const renderTransactions = () => {
  transactions.innerHTML = "";
  let total = 0;
  transactionsList.forEach((transaction) => {
    let li = document.createElement("li");
    li.className = "items";
    li.innerHTML = `
      <span class="left">${transaction.text}</span>
      <span class="right">${transaction.amount}</span>
      <span class="delete fas fa-xmark"></span>
    `;
    transactions.appendChild(li);
    total += parseInt(transaction.amount);
  });
  balance.innerHTML = `₹ ${total}`;
};

//==== Click event on button =====//

button.addEventListener("click", () => {
  if (!textValue.value || !amountValue.value || isNaN(amountValue.value)) {
    alert("Please enter both text and a valid number for the amount.");
    return;
  }

  let li = document.createElement("li");
  li.className = "items";
  li.innerHTML = `
    <span class="left">${textValue.value}</span>
    <span class="right">${amountValue.value}</span>
    <span class="delete fas fa-xmark"></span>
  `;
  transactions.insertBefore(li, transactions.firstChild);

  transactionsList.push({ text: textValue.value, amount: amountValue.value });
  updateLocalStorage();

  balance.innerHTML = `₹ ${parseInt(balance.innerHTML.substr(2)) + parseInt(amountValue.value)}`;
  textValue.value = "";
  amountValue.value = "";
});
//== Remove transctions ==//

transactions.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentElement;
    transactions.removeChild(li);

    let index = transactionsList.findIndex((transaction) => transaction.text === li.querySelector(".left").innerHTML);
    transactionsList.splice(index, 1);
    updateLocalStorage();

    balance.innerHTML = `₹ ${parseInt(balance.innerHTML.substr(2)) - parseInt(li.querySelector(".right").innerHTML)}`;
  }
});
//== Function call 

retrieveTransactions();
renderTransactions();
