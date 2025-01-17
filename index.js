function onPageLoad() {
  displayData();
  console.log("page loaded");
  displayExpenseList();
}

function displayExpenseList() {
  
  let getExpense = localStorage.getItem("expenseAll");
  getExpense = JSON.parse(getExpense);
  getExpense.map((x, index) => {
    // console.log(x, index);

    const expenseTableBody = document.getElementById("expense_body");

    const create_row = document.createElement("tr");
    addRows(x.categoryInput, create_row);
    addRows(x.amountInput, create_row);
    addRows(x.dateInput, create_row);
    const buttonRowCell = document.createElement("button");
    buttonRowCell.innerHTML = "Remove";
    buttonRowCell.classList.add("table_row_cell");
    create_row.append(buttonRowCell);

    buttonRowCell.addEventListener("click", () => {
      create_row.remove();
      expenseTableBody.innerHTML = "";
      let something = getExpense;
      something.splice(index, 1);
      localStorage.setItem("expenseAll", JSON.stringify(something));
      onPageLoad();
    });

    expenseTableBody.append(create_row);
  });
}

function addRows(rowCellValue, rowCellGroup) {
  const createRowCell = document.createElement("td");
  createRowCell.innerHTML = rowCellValue;
  createRowCell.classList.add("tablerowcell");
  rowCellGroup.append(createRowCell);
}

function setBudget() {
  const budgetInput = document.getElementById("budgetInput");
  if (budgetInput.value) {
    localStorage.setItem("budget", budgetInput.value); // save budget value to local storage
    resetInput("budgetInput");
    clearDisplayList()
    onPageLoad();
  }
}

function displayData() {
  
  displayBudget = document.getElementById("displayBudget");
  const budgetValue =localStorage.getItem("budget");
  displayBudget.innerText = budgetValue;


  let getExpense = localStorage.getItem("expenseAll");
  getExpense = JSON.parse(getExpense);
  let totalExpenditure = parseInt(0)

  const displayExpenditure= document.getElementById("displayExpenditure")
  clearDisplayList()
  getExpense.map((x) => {
    totalExpenditure += parseInt(x.amountInput)
    
  })
  displayExpenditure.innerText=totalExpenditure || 0

  let displayBalance = document.getElementById("displayBalance")
  let balanceValue = budgetValue - totalExpenditure
  displayBalance.innerText = balanceValue
}

function setExpense() {
  const categoryInput = document.getElementById("categoryInput");
  const amountInput = document.getElementById("amountInput");
  const dateInput = document.getElementById("dateInput");

  if (categoryInput.value && amountInput.value && dateInput.value) {
    const expenseListData = {
      categoryInput: categoryInput.value,
      amountInput: amountInput.value,
      dateInput: dateInput.value,
    };

    let expenseListLocalStorage = localStorage.getItem("expenseAll");
    expenseListLocalStorage = expenseListLocalStorage
      ? JSON.parse(expenseListLocalStorage)
      : []; //ternary conditon ? if true use this : if false use this json parse Converts a JavaScript Object Notation (JSON) string into an object.
    expenseListLocalStorage.push(expenseListData); // add value of expense to the main expense list
    localStorage.setItem("expenseAll", JSON.stringify(expenseListLocalStorage)); // save expense value to local storage

    resetInput("categoryInput");
    resetInput("amountInput");
    resetInput("dateInput");

   clearDisplayList()
    onPageLoad();
  }
}

function resetInput(inputId) {
  const inputField = document.getElementById(inputId);
  inputField.value = "";
}

function clearDisplayList(){
  const expenseTableBody = document.getElementById("expense_body");
  expenseTableBody.innerHTML = "";
  const displayExpenditure= document.getElementById("displayExpenditure")
  displayExpenditure.innerText = ""
}
