
function displayExpenses() {
  const tableBody = document.getElementById('expense-body');

  axios
    .get('https://crudcrud.com/api/bdd99c4da68043df8192ae03862c81b9/appointmentData')
    .then((response) => {
      console.log(response);

      // clear previous table data
      tableBody.innerHTML = '';

      // iterate over response data and add to table
      response.data.forEach((expense) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = expense.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = expense.email;
        row.appendChild(emailCell);

        const phoneNumberCell = document.createElement('td');
        phoneNumberCell.textContent = expense.phoneNumber;
        row.appendChild(phoneNumberCell);

        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          const editForm = document.getElementById('edit-form');
          editForm.style.display = 'block';
          editForm.elements['name'].value = expense.name;
          editForm.elements['email'].value = expense.email;
          editForm.elements['phoneNumber'].value = expense.phoneNumber;
          editForm.elements['expenseId'].value = expense._id;
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteExpense(expense._id);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.log(error);
      tableBody.innerHTML = '<tr><td colspan="4">Error loading expenses</td></tr>';
    });
}

displayExpenses()