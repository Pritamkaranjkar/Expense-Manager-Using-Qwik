import { component$, useStyles$} from '@builder.io/qwik';
import styles from "./app.module.css?inline";

        const expenses: { category: string, amount: number }[] = [];
        let totalIncome: number = 0;

        
        function addExpense() {
            const category = document.getElementById("category") as HTMLSelectElement;
            const amount = document.getElementById("amount") as HTMLInputElement;

            if (!category.value || amount.value === "") {
                alert("Please select a category and enter the amount.");
                return;
            }

            const expense = { category: category.value, amount: parseFloat(amount.value) };
            expenses.push(expense);
            updateDisplay();
            amount.value = "";


            const totalSpend = getTotalSpend();
            if (totalIncome < totalSpend)
            {
                alert("Spending is greater than income.");
                expenses.length = 0; 
                updateDisplay(); 
            }

            updateDisplay();


        }

        function updateDisplay() {
            let totalSpend = 0;
            for (const expense of expenses) {
                totalSpend += expense.amount;
            }

            const income = document.getElementById("income") as HTMLInputElement;
            if (income.value !== "") {
                totalIncome = parseFloat(income.value);
            }

            const totalIncomeElement = document.getElementById('totalIncome') as HTMLSpanElement;
            totalIncomeElement.textContent = totalIncome.toFixed(2);

            const totalSpendElement = document.getElementById("totalSpend") as HTMLSpanElement;
            totalSpendElement.textContent = totalSpend.toFixed(2);
            

            // const remainingIncome = document.getElementById("remainingIncome") as HTMLSpanElement;
            // remainingIncome.textContent = (totalIncome - totalSpend).toFixed(2);

            let remainingIncome = totalIncome - totalSpend;
            remainingIncome = Math.max(0, remainingIncome); 
        
            const remainingIncomeElement = document.getElementById("remainingIncome") as HTMLSpanElement;
            remainingIncomeElement.textContent = remainingIncome.toFixed(2);

          
              const tableBody = document.getElementById("expenseTableBody") as HTMLTableSectionElement;
              tableBody.innerHTML = ""; 

              for (const expense of expenses) 
              {
                const row = document.createElement("tr");
                const categoryCell = document.createElement("td");
                const amountCell = document.createElement("td");

                categoryCell.textContent = expense.category;
                amountCell.textContent = expense.amount.toFixed(2);

                row.appendChild(categoryCell);
                row.appendChild(amountCell);

                tableBody.appendChild(row);
              }


              

        }

    
        function getTotalSpend() {
            let totalSpend = 0;
            for (const expense of expenses) {
                totalSpend += expense.amount;
            }
            return totalSpend;
        }
      


export default component$(() => {

  useStyles$(styles);

  return <div class="EM"> 
    {/* <button>Click me!</button> */}
    <div>
    <title>Expense Manager</title>
       <div>
                 <h1>Expense Manager</h1>
                 <label for="category">Category:</label>
                 <select id="category">
                      <option value="electricity">Electricity Bill</option>
                      <option value="groceries">Groceries</option>
                      <option value="rent">Rent</option>
                    
                 </select>
                 <label for="Spendings">Amount:</label>
                <input type="number" id="amount" />

                <button class="button-dark button-small"onClick$={() => addExpense()}>Add Expense✅</button>




                 <br></br>

                 <label for="income">Total Income:</label>
                 <input type="number" id="income" />


                 <h2>Total Income: <span id="totalIncome">0.00</span></h2>
                 <h2>Total Spend: <span id="totalSpend">0</span></h2>
                 <h2>Remaining Income: <span id="remainingIncome">0</span></h2>



                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody id="expenseTableBody"></tbody>
                </table>
             


       </div>
    </div>

    
        

  </div>



});
