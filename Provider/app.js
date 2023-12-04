/**==========================================connecting to pages html, css, javascript=============================================== */

const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');

const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname)); //loads css file which has css style content which is in the same directory as this app.js file

// Create a connection
const connection = mysql.createConnection({
  host: 'sql5.freemysqlhosting.net',
  user: 'sql5664836',
  password: 'vNfGfCnCBQ',
  database: 'sql5664836'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

/**
 *  Authentication endpoint
 */
app.post('/authenticate', (req, res) => {
  const { logInEmail, logInPassword } = req.body;
  const sql = 'SELECT * FROM Provider WHERE Email = ? AND Password = ?';
  connection.query(sql, [logInEmail, logInPassword], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      // Authentication successful
      res.redirect('/MainPage');
    } else {
      // Authentication failed
      res.status(401).send('Invalid email or password');
    }
  });
});

/**
 * Sign up endpoint
 */
app.post('/saveSignupData', (req, res) => {
  const { SignupEmail, SignupCompanyname, SignupPassword } = req.body;

  const sql = 'INSERT INTO Provider (Email, CompanyName, Password) VALUES (?, ?, ?)';
  connection.query(sql, [SignupEmail, SignupCompanyname, SignupPassword], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, error: 'Failed to sign up' });
    } else {
      console.log('Data inserted:', result);
      res.redirect('/');
    }
  });
});

/**
 * Update Provider details endpoint
 */
app.post('/saveUpdatedData', (req, res) => {
  const { CompanyName, Email, CompanyAddress, CompanyPhoneNumber, Password } = req.body;
  console.log(CompanyName)
  const sql = `UPDATE Provider 
               SET Address=?, 
                   PhoneNumber=?, 
                   Email=?, 
                   Password=? 
               WHERE CompanyName=?`;

  connection.query(
    sql,
    [CompanyAddress, CompanyPhoneNumber, Email, Password, CompanyName],
    (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ success: false, error: 'Failed to update data' });
      } else {
        console.log('Query executed:', result);
        if (result.changedRows > 0) {
          res.status(200).send('Provider information updated successfully');
        } else if (result.affectedRows > 0) {
          res.status(200).send('No changes applied');
        } else {
          res.status(404).send('Provider not found');
        }
      }
    }
  );
});

/**
 * Save details of an issued license endpoint
 */
app.post('/saveSignupData', (req, res) => {
  const { SignupEmail, SignupCompanyname, SignupPassword } = req.body;

  const sql = 'INSERT INTO Provider (Email, CompanyName, Password) VALUES (?, ?, ?)';
  connection.query(sql, [SignupEmail, SignupCompanyname, SignupPassword], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, error: 'Failed to sign up' });
    } else {
      console.log('Data inserted:', result);
      res.redirect('/');
    }
  });
});

app.post('/issueLicense', (req, res) => {
  const { CliendID, ClientFullName, ClientAddress, ClientEmail, ClientPhoneNumber, ClientSoftware, ClientCurrentDate, ClientExpiryDate, ClientSerialNumber, ClientStatus } = req.body;
  const sql = 'INSERT INTO Software (SerialNumber, SoftwareName, IssuedOn, ExpiresOn, ProviderID, ClientID) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(sql, [ClientSerialNumber, ClientSoftware, ClientCurrentDate, ClientExpiryDate, '5', CliendID], (err, result) => {
    if (err) {
      console.error('Error issuing license:', err);
      res.status(500).json({ success: false, error: 'Failed to issue license' });
    } else {
      console.log('License issued:', result);
      res.redirect('/');
    }
  });
});
/**
 * Cancel license endpoint
 */
app.post('/cancelLicense', (req, res) => {
  const { CliendID, ClientExpiryDate } = req.body;
  const sql = `UPDATE Software 
               SET ExpiresOn=?,
               WHERE ClientID=?`;

  connection.query(
    sql,
    [ClientExpiryDate, CliendID],
    (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ success: false, error: 'Failed to update data' });
      } else {
        console.log('Query executed:', result);
        if (result.changedRows > 0) {
          res.status(200).send('Software information updated successfully');
        } else if (result.affectedRows > 0) {
          res.status(200).send('No changes applied');
        } else {
          res.status(404).send('Software not found');
        }
      }
    }
  );
});
/**
 * Renew license endpoint
 */
app.post('/renewLicense', (req, res) => {
  const { ClientCurrentDate, ClientExpiryDate, CliendID } = req.body;
  const sql = `UPDATE Software 
               SET IssuedOn=?, 
                    ExpiresOn=?,
               WHERE ClientID=?`;

  connection.query(
    sql,
    [ClientCurrentDate, ClientExpiryDate, CliendID],
    (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ success: false, error: 'Failed to update data' });
      } else {
        console.log('Query executed:', result);
        if (result.changedRows > 0) {
          res.status(200).send('Software information updated successfully');
        } else if (result.affectedRows > 0) {
          res.status(200).send('No changes applied');
        } else {
          res.status(404).send('Software not found');
        }
      }
    }
  );
});
//=======================================Serve static files from the 'public' directory===================================================

// Define routes to serve different HTML pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/LogInPage.html');
});
app.get('/CreateAccount', (req, res) => {
  res.sendFile(__dirname + '/CreateAccount.html');
});

app.get('/MainPage', (req, res) => {
  res.sendFile(__dirname + '/MainPage.html');
});
//========================================================================================================================================

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Close the connection when done
//connection.end();
