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
    var issuedate = clientsTable.rows[row + 1].cells[5].innerText;
    var expirydate = clientsTable.rows[row + 1].cells[6].innerText;

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
    selectedRow.cells[5].textContent = currentDate;
    selectedRow.cells[6].textContent = expiryDate;
  
    // Hide the "Renew License" button
    document.getElementById('renewlicense').hidden = true;

    // Show the "Cancel license button"
    document.getElementById('cancellicense').hidden = false;
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
    selectedRow.cells[6].textContent = currentDate;
  
    // Hide the "Cancel License" button
    document.getElementById('cancellicense').hidden = true;

    // Show the "Renew license button"
    document.getElementById('renewlicense').hidden = false;
}
/**
 * this function blocks the client when a user clicks block client button and sets the client's status to blocked
 */
function blockClient() {

    var table = document.getElementById("clientsTable");
    var selectedRow = table.rows[currentSelectedRow + 1];
    // update status of client in the table
    selectedRow.cells[8].textContent = "Blocked";

    document.getElementById("blockclient").hidden = true;
    
    document.getElementById("unblockclient").hidden = false;
  }
/**
 * this function unblocks the client when a user clicks unblock client button  and sets the client's status to active
 */
  function unblockClient() {

    var table = document.getElementById("clientsTable");
    var selectedRow = table.rows[currentSelectedRow + 1];

    // update status of client in the table
    selectedRow.cells[8].textContent = "Active";

    document.getElementById("unblockclient").hidden = true;

    document.getElementById("blockclient").hidden = false;
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
 * this function egenerates a random 8 digit serial number
 */
function generateSN() {
    const min = 10000000;
    const max = 99999999;
  
    // Generate a random number between min and max (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomNumber;
}
/**
 * this function issues licenses which includes generating a random serial number for each new license
 */
function issuelicense() {
    var f = document.getElementById("issueLicenseForm");
    var table = document.getElementById('clientsTable');

    // Get the current date and calculate the new expiry date (one year from the current date)
    var today = new Date();
    var future = new Date(today);
    future.setFullYear(today.getFullYear() + 1);

    // Format the current and new expiry dates as strings in the format of "Mon DD YYYY"
    var currentDate = today.toDateString().substring(4);
    var expiryDate = future.toDateString().substring(4);

    // Create a new row and cells for the record
    var newRow = table.insertRow(table.rows.length);
    var cellClientId = newRow.insertCell(0);
    var cellName = newRow.insertCell(1);
    var cellAddress = newRow.insertCell(2);
    var cellSoftware = newRow.insertCell(3);
    var cellSerialNumber = newRow.insertCell(4);
    var cellIssuedOn = newRow.insertCell(5);
    var cellExpiresOn = newRow.insertCell(6);
    var cellEmail = newRow.insertCell(7);
    var cellStatus = newRow.insertCell(8);

    // Populate the cells with data
    cellClientId.innerHTML = f.getElementById('id').value;
    cellName.innerHTML = f.getElementById('fn').value;
    cellAddress.innerHTML = f.getElementById('adr').value;
    cellSoftware.innerHTML = f.getElementById('sft').value;
    cellSerialNumber = generateSN();
    cellIssuedOn.innerHTML = currentDate;
    cellExpiresOn.innerHTML = expiryDate;
    cellEmail.innerHTML = '<a href="mailto:' + f.getElementById('em').value + '"><button type="button" id="email">Send email</button></a>';
    cellStatus.innerHTML = 'Active';// Default status
    
}
/**
 * this function  gets details of the provider who is currently logged in
 */
function populateProviderForm() {

    var enteredEmail = document.getElementById("logInEmail").value;
    var form2 = document.getElementById("providerDetailsForm");
    var providersTable = document.getElementById("providersTable");
    var rows = providersTable.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
        // Gets each email of the provider from the table
        var providerEmail = rows[i].getElementsByTagName("td")[3].textContent; // since email is in the 4th column

        // Checks if the entered email matches each provider's email
        if (i === rows.length-1 && enteredEmail !== providerEmail) {
            confirm("Incorrect Email or Password. Try Again");
        }
        if (enteredEmail === providerEmail) {
            //redirect to main page of the website once the user has been authenticated
            window.location.href = "MainPage.html";

            //enables the fields in the provider details form to make them editable
            document.getElementById("companyname").disabled = false;
            document.getElementById("provideraddress").disabled = false;
            document.getElementById("providerphonenumber").disabled = false;
            document.getElementById("provideremail").disabled = false;

            var companyname = rows[i].getElementsByTagName("td")[0].textContent;
            console.log("companyname is: "+companyname);
            var address = rows[i].getElementsByTagName("td")[1].textContent;
            var phonenumber = rows[i].getElementsByTagName("td")[2].textContent;

            // Populate the fields in the provider details form on MyAccount tab
            form2.companyname.value = companyname;
            form2.provideraddress.value = address;
            form2.providerphonenumber.value = phonenumber;
            form2.provideremail.value = enteredEmail;

            // Break the loop since a match has been found
            break;
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