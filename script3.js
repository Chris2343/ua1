let editingRowId = null; // Track the ID of the row being edited

// Load user data from localStorage when the page loads
window.addEventListener('load', loadUserData);

function saveUserInfo(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const dob = document.forms["userInfoForm"]["dob"].value;
  const email = document.forms["userInfoForm"]["email"].value;
  const firstName = document.forms["userInfoForm"]["firstName"].value;
  const lastName = document.forms["userInfoForm"]["lastName"].value;

  const address = document.forms["userInfoForm"]["address"].value;
  const phoneNumber = document.forms["userInfoForm"]["phoneNumber"].value;
  const callBackTime = document.getElementById("callBackTime").value; // Get the Call Back Time value
  const serviceType = document.forms["userInfoForm"]["serviceType"].value;

  if (editingRowId) {
    // Update the existing row in the records table
    const row = document.getElementById(editingRowId);
    row.cells[0].innerText = dob;
    row.cells[1].innerText = email;
    row.cells[2].innerText = firstName;
    row.cells[3].innerText = lastName;
    row.cells[4].innerText = address;
    row.cells[5].innerText = phoneNumber;
    row.cells[6].innerText = callBackTime; // Update the Call Back Time cell
    row.cells[7].innerText = serviceType;
    row.cells[8].innerHTML = '<button class="edit-btn" onclick="editUserInfo(\'' + editingRowId + '\')">Edit</button>';
    row.cells[9].innerHTML = '<button class="delete-btn" onclick="deleteUserInfo(\'' + editingRowId + '\')">Delete</button>';
    editingRowId = null; // Reset the editing row ID
  } else {
    // Create a new row for the records table
    const recordsTableBody = document.getElementById("recordsTableBody");
    const newRow = recordsTableBody.insertRow();

    // Generate a unique ID for the new row
    const rowId = 'row-' + Date.now();
    newRow.id = rowId;

    // Insert the user information into the new row
    newRow.innerHTML = `
      <td>${dob}</td>
      <td>${email}</td>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${address}</td>
      <td>${phoneNumber}</td>
      <td>${callBackTime}</td> <!-- Add the Call Back Time cell -->
      <td>${serviceType}</td>
      <td><button class="edit-btn" onclick="editUserInfo('${rowId}')">Edit</button></td>
      <td><button class="delete-btn" onclick="deleteUserInfo('${rowId}')">Delete</button></td>
    `;

    // Update the data in localStorage
    updateLocalStorageData();

    // Reset the form fields
    document.getElementById("userInfoForm").reset();
  }
}

function editUserInfo(rowId) {
  // Retrieve the row being edited
  const row = document.getElementById(rowId);
  const cells = row.cells;

  // Populate the form fields with the row data
  document.forms["userInfoForm"]["dob"].value = cells[0].innerText;
  document.forms["userInfoForm"]["email"].value = cells[1].innerText;
  document.forms["userInfoForm"]["firstName"].value = cells[2].innerText;
  document.forms["userInfoForm"]["lastName"].value = cells[3].innerText;
  document.forms["userInfoForm"]["address"].value = cells[4].innerText;
  document.forms["userInfoForm"]["phoneNumber"].value = cells[5].innerText;
  document.forms["userInfoForm"]["callBackTime"].value = cells[6].innerText;
  document.forms["userInfoForm"]["serviceType"].value = cells[7].innerText;

  // Set the editingRowId to the current row ID
  editingRowId = rowId;
}

function deleteUserInfo(rowId) {
  // Remove the row with the given ID from the table
  const row = document.getElementById(rowId);
  row.remove();

  // Update the data in localStorage after deletion
  updateLocalStorageData();
}

function updateLocalStorageData() {
  // Collect the data from the table and store it in localStorage
  const data = [];
  const tableRows = document.querySelectorAll("#recordsTableBody tr");
  tableRows.forEach((row) => {
    const rowData = {
      dob: row.cells[0].innerText,
      email: row.cells[1].innerText,
      firstName: row.cells[2].innerText,
      lastName: row.cells[3].innerText,
      address: row.cells[4].innerText,
      phoneNumber: row.cells[5].innerText,
      callBackTime: row.cells[6].innerText,
      serviceType: row.cells[7].innerText,
    };
    data.push(rowData);
  });

  localStorage.setItem("userData", JSON.stringify(data));
}

function loadUserData() {
  // Retrieve and load user data from localStorage
  const userData = localStorage.getItem("userData");
  if (userData) {
    const data = JSON.parse(userData);
    const recordsTableBody = document.getElementById("recordsTableBody");
    data.forEach((rowData) => {
      // Generate a unique ID for each row
      const rowId = 'row-' + Date.now();
      const newRow = recordsTableBody.insertRow();
      newRow.id = rowId;

      // Populate the row with data
      newRow.innerHTML = `
        <td>${rowData.dob}</td>
        <td>${rowData.email}</td>
        <td>${rowData.firstName}</td>
        <td>${rowData.lastName}</td>
        <td>${rowData.address}</td>
        <td>${rowData.phoneNumber}</td>
        <td>${rowData.callBackTime}</td>
        <td>${rowData.serviceType}</td>
        <td><button class="edit-btn" onclick="editUserInfo('${rowId}')">Edit</button></td>
        <td><button class="delete-btn" onclick="deleteUserInfo('${rowId}')">Delete</button></td>
      `;
    });
  }
}
