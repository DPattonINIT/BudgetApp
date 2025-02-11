
const budgetBtn = document.getElementById("budgetBtn");
const budgetInput = document.getElementById("budgetInput");
const expenseBtn = document.getElementById("expenseBtn");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");

let budget = 0;
let expenses = [];


document.addEventListener("DOMContentLoaded", () => {

  budget = getLocalStorage("budget", 0); 
  expenses = getLocalStorage("expenses", []); 

  update();

 
  budgetBtn.addEventListener("click", () => {
    budget = parseFloat(budgetInput.value);
    saveToLocalStorage("budget", budget); 
    update();
  });

  
  expenseBtn.addEventListener("click", () => {
    if (expenseName.value && expenseAmount.value) {
      const newExpense = {
        name: expenseName.value,
        amount: parseFloat(expenseAmount.value),
      };
      expenses.push(newExpense);
      saveToLocalStorage("expenses", expenses);
      update();
      expenseName.value = "";
      expenseAmount.value = "";
    }
  });

  function update() {
 document.getElementById("remainingBudget").textContent = (

      budget - getTotal()
    ).toFixed(2);

    document.getElementById("totalSpent").textContent = getTotal().toFixed(2);

    expenseList.innerHTML = "";

    for (let index = 0; index < expenses.length; index++) {
      const expense = expenses[index];
      const li = document.createElement("li");
      li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => {
        deleteExpense(index);
      });

      li.appendChild(deleteBtn);
      expenseList.appendChild(li);
    }
  }

  function deleteExpense(index) {
    expenses.splice(index, 1);
    saveToLocalStorage("expenses", expenses);
    update();
  }

  function getTotal() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      total += expenses[i].amount;
    }
    return total;
  }
});

// Local Storage Section-------------------------------------------------------------
function getLocalStorage(key, defaultValue) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return defaultValue;
  }
}

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}


