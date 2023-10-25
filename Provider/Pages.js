/**
 * global variable that keeps track of the row that is currently selected by the user
 *  to be used later by function renewlicense and cancellicense
 */
var currentSelectedRow = 0;
/**
 * this functions unhides other functional buttons once a specific client is selected by the user
 */
function unhideButtons() {
    document.getElementById("blockclient").removeAttribute("hidden");
    document.getElementById("unblockclient").removeAttribute("hidden");
    document.getElementById("issuelicense").removeAttribute("hidden");
    document.getElementById("renewlicense").removeAttribute("hidden");
    document.getElementById("cancellicense").removeAttribute("hidden");
}
/**
 * this function  gets details of each row in the table clientsTable depending on which client you click
 * and fill those details in the form that shows each individual client's data for edit or view purposes
 */
function populateClientForm(row){

    var clientsTable = document.getElementById("clientsTable");
    var form1 = document.getElementById("clientDetailsForm");

    var fname = clientsTable.rows[row + 1].cells[1].innerText;
    var addr = clientsTable.rows[row + 1].cells[2].innerText;
    var softw = clientsTable.rows[row + 1].cells[3].innerText;
    var issuedate = clientsTable.rows[row + 1].cells[4].innerText;
    var expirydate = clientsTable.rows[row + 1].cells[5].innerText;

    form1.fullname.value = fname;
    form1.address.value = addr;
    form1.software.value = softw;
    form1.issuedate.value = issuedate;
    form1.expirydate.value = expirydate;

    //unhide buttons to perform more operations for the selected client
    unhideButtons();

    //Show Renew License and Cancel License buttons again everytime user clicks a new row
    document.getElementById('renewlicense').hidden = false;
    document.getElementById('renewlicense').hidden = false;
    
    //keeps track of the row that is currently selected by the user to be used later by function renewlicense and cancellicense
    currentSelectedRow = row;
}
/**
 * this function updates issue and expiry dates of a software
 *  to whatever today's date and one year from today respectivelly as an indication of its renewal
 */
function renewLicense() {
    var table = document.getElementById("clientsTable");
    var selectedRow = table.rows[currentSelectedRow + 1];

    // Get the current date and calculate the new expiry date (one year from the current date)
    var today = new Date();
    var future = new Date(today);
    future.setFullYear(today.getFullYear() + 1);

    // Format the current and new expiry dates as strings in the format of "Mon DD YYYY"
    var currentDate = today.toDateString().substring(4);
    var expiryDate = future.toDateString().substring(4);
  
    // Update the "issuedate" and "future" in the table
    selectedRow.cells[4].textContent = currentDate;
    selectedRow.cells[5].textContent = expiryDate;
  
    // Hide the "Renew License" button
    document.getElementById('renewlicense').hidden = true;
}
/**
 * this function updates the expiry date of a software to whatever today's date as an indication of its cancellation
 */
function cancelLicense() {
    var table = document.getElementById("clientsTable");
    var selectedRow = table.rows[currentSelectedRow + 1];

    // Get the current date and Format it in the format of "Mon DD YYYY"
    var today = new Date();
    var currentDate = today.toDateString().substring(4);
  
    // Update the "expirydate" in the table
    selectedRow.cells[5].textContent = currentDate;
  
    // Hide the "Renew License" button
    document.getElementById('cancellicense').hidden = true;
}
/**
 * this function  gets details of the provider who is currently logged in
 */
function populateProviderForm() {
    var enteredEmail = document.getElementById("logInEmail").value;
    var providersTable = document.getElementById("providersTable");
    var rows = providersTable.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
        // Gets each email of the provider from the table
        var providerEmail = rows[i].getElementsByTagName("td")[3].textContent; // since email is in the 4th column
        // Checks if the entered email matches each provider's email
        if (enteredEmail === providerEmail) {
            var companyname = rows[i].getElementsByTagName("td")[0].textContent;
            var address = rows[i].getElementsByTagName("td")[1].textContent;
            var phonenumber = rows[i].getElementsByTagName("td")[2].textContent;

            // Populate the fields in the provider details form
            document.getElementById("companyname").value = companyname;
            document.getElementById("provideraddress").value = address;
            document.getElementById("providerphonenumber").value = phonenumber;
            document.getElementById("provideremail").value = enteredEmail;

            //enables the fields in the provider details form to make them editable
            document.getElementById("companyname").disabled = false;
            document.getElementById("provideraddress").disabled = false;
            document.getElementById("providerphonenumber").disabled = false;
            document.getElementById("provideremail").disabled = false;

            // Break the loop since a match has been found
            break;
        }
    }
}
/**
 * this function blocks the client when a user clicks block client button and sets the client's status to blocked
 */
function blockClient() {
    var clientStatus = document.querySelector('#clientsTable tr.selected td:nth-child(6)');
    if (clientStatus) {
      clientStatus.textContent = "Blocked";
    }
    var blockClientButton = document.getElementById("blockclient");
    blockClientButton.style.display = "none";

    var unblockClientButton = document.getElementById("unblockclient");
    unblockClientButton.style.display = "inline";
  }
/**
 * this function unblocks the client when a user clicks unblock client button  and sets the client's status to active
 */
  function unblockClient() {
    var clientStatus = document.querySelector('#clientsTable tr.selected td:nth-child(8)');
    if (clientStatus) {
      clientStatus.textContent = "Active";
    }
    var blockClientButton = document.getElementById("unblockclient");
    blockClientButton.style.display = "none";

    var unblockClientButton = document.getElementById("blockclient");
    unblockClientButton.style.display = "inline";
  }    
/**
 * this function helps filter the clients table given what the user is typing in the search box
 */
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("clientsTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1] ;
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}
/**
 * On the main page of our website there are multiple tabs. this function gets each tab's details
 * depending on the tab the user clicks on
 */
var tabs = document.querySelectorAll('[data-tab-value]')
var tabInfos = document.querySelectorAll('[data-tab-info]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        var target = document
            .querySelector(tab.dataset.tabValue);
        tabInfos.forEach(tabInfo => {
            tabInfo.classList.remove('active')
        })
        target.classList.add('active');
    })
})  