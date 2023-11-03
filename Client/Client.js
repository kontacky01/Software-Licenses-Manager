function login() {
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    var user = users.find(function (u) {
        return u.username === username && u.password === password;
    });

    if (user) {
        document.getElementById("loginStatus").textContent = "Welcome!!";
    } else {
        document.getElementById("loginStatus").textContent = "Wrong username or password, Please try again!";
    }
}

var user;
var sentCode;

function requestPasswordReset() {
    // Send a code to the user's email
    var email = document.getElementById("resetEmail").value;
    
    // Generate a random code between 100000 and 999999.
    sentCode = Math.floor(100000 + Math.random() * 900000);
    console.log("Sent code: " + sentCode);
    
    // retrive data from database // for deliverable 2
    user = {
        email: email,
    };
    document.getElementById("emailRequest").style.display = "none";
    document.getElementById("codeReset").style.display = "block";
}

function verifyResetCode() {
    var verificationCode = document.getElementById("verificationCode").value;
    var verificationStatus = document.getElementById("verificationStatus");
    
    if (verificationCode === sentCode.toString()) {
    // Code is valid, proceed to reset password.
    verificationStatus.textContent = "Code verified. Enter your new password";
    
    document.getElementById("codeReset").style.display = "none";
    document.getElementById("newPassword").style.display = "block";
    } else {
        verificationStatus.textContent = "Invalid code. Please try again.";
    }
}

function resetPassword() {
    var newPassword = document.getElementById("newPassword").value; // implement in deliverable two

    user.password = newPassword;
    console.log("Password reset for user with email: " + user.email);

            
    document.getElementById("resetPasswordStatus").textContent = "Password reset successfully.";
}        


function hideAllContent() {
    const contentSections = document.querySelectorAll('.content');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
}        

// Initially hide all content sections except the account summary
hideAllContent();
document.querySelector('.account-summary').style.display = 'block';

function showContent(contentId) {
    // Hide all content sections
    hideAllContent();
    
    // Show the selected content section
    const selectedContent = document.getElementById(contentId);
    selectedContent.style.display = 'block';
}


function acquireLicense() {
var serialNumber = document.querySelector('input[name="serialNumber"]').value;
var productVersion = document.querySelector('select[name="version"]').value;
var vendor = document.querySelector('input[name="vendor"]').value;
var comments = document.querySelector('textarea[name="comments"]').value;
}
function purchase(){
alert("License acquired!");
}

function cancelLicense() {
var serialNumber = document.querySelector('input[name="serialNumber"]').value;
alert("License has been canceled.");
}

function CreateAccount() {
var termsCheckbox = document.getElementById("termsCheckbox");
if (termsCheckbox.checked) {
document.getElementById("CreateAcct").submit(); } 
else {
alert("Please agree to the terms and conditions to create your account.");
}
}

function deleteAccount(){
alert("Account was successfully deleted. You will now be redirected to the Home Page.")
window.location.href = "WelcomePage.html"
}

function EditAccount(){
var newName = document.getElementById("newName").value;
var newPassword = document.getElementById("newPassword").value;
}


function renewLicense() {
var existingSerialNumber = document.querySelector('input[name="serialNumber"]').value;
var newSerialNumber = document.querySelector('input[name="newSerialNumber"]').value;
var productVersion = document.querySelector('select[name="version"]').value;
var vendor = document.querySelector('input[name="vendor"]').value;
var comments = document.querySelector('textarea[name="comments"]').value;
}


function activateLicense() {
    var licenseNumber = document.getElementById("licenseNumber").value;
    var purchaseDate = document.getElementById("purchaseDate").value;
    var expiryDate = document.getElementById("expiryDate").value;
}

function AccountSummary() {
    var accountName = document.querySelector('input[name="accountName"]').value;
    var accountEmail = document.querySelector('input[name="accountEmail"]').value;
    var accoutPhoneNumber = document.querySelector('input[name="accountPhoneNumber"]').value;
    var accoutAddress = document.querySelector('input[name="accountAddress"]').value;
}



