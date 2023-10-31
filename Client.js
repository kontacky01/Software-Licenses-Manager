// Log in Page
// Store Clients
var users = [];

// Function to log in
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
// ----------------------------------------------------
// Reset Password Page
var users = [
    { email: "example@example.com", resetCode: "123456", newPassword: null }
    // Add more user data here
];

function requestPasswordReset() {
    var email = document.getElementById("resetEmail").value;
    var user = users.find(function (u) {
        return u.email === email;
    });

    if (user) {
        var resetCode = Math.floor(100000 + Math.random() * 900000); 

        console.log("Sending reset code " + resetCode + " to " + user.email);

        user.resetCode = resetCode;
        document.getElementById("resetCode").style.display = "none";
        document.getElementById("resetCodeEmail").style.display = "block";
    } else {
        document.getElementById("resetStatus").textContent = "Email not found. Please try again.";
    }
}

function verifyResetCode() {
    var resetCode = document.getElementById("resetCode").value;
    var user = users.find(function (u) {
        return u.resetCode === resetCode;
    });

    if (user) {
        document.getElementById("resetCodeForm").style.display = "none";
        document.getElementById("resetPasswordForm").style.display = "block";
    } else {
        document.getElementById("resetStatus").textContent = "Invalid Code!";
    }
}

function resetPassword() {
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        document.getElementById("resetStatus").textContent = "Passwords do not match. Please try again.";
    } else {
        var email = document.getElementById("resetEmail").value;
        var user = users.find(function (u) {
            return u.email === email;
        });

        user.newPassword = newPassword;
        document.getElementById("resetPasswordForm").style.display = "none";
        document.getElementById("resetSuccess").style.display = "block";
    }
}
//--------------------------------------------------------
// License Account Page
// Store license information
var licenses = [];

// Activate a license
function activateLicense() {
    var licenseNumber = document.getElementById("licenseNumber").value;
    var purchaseDate = document.getElementById("purchaseDate").value;
    var expiryDate = document.getElementById("expiryDate").value;

    // Check if the fields are all filled out
    if (!licenseNumber || !purchaseDate || !expiryDate){
        alert("All fields must be filled out.");
        return;
    }
    
    // Check if the license number already exists
    var existingLicense = licenses.find(function (license) {
        return license.licenseNumber === licenseNumber;
    });

    if (existingLicense) {
        alert("This license has already been activated.");
    } else {
        // Create a new license object
        var license = {
            licenseNumber: licenseNumber,
            purchaseDate: purchaseDate,
            expiryDate: expiryDate,
        };

        // Add the license to the array
        licenses.push(license);

        alert("License activated successfully.");
    }
}
