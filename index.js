const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// Use Morgan middleware to log requests
app.use(morgan('dev'));

// Middleware to parse JSON bodies
app.use(express.json());

// 1. / GET: Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Student Information Server');
});

// 2. /about GET: Student name, roll number, course
app.get('/about', (req, res) => {
  res.type('text/plain').send(`Name: John Doe
Roll No: 23
Course: Computer Engineering`);
});

// 3. /contact GET: Email or contact info
app.get('/contact', (req, res) => {
  res.type('text/plain').send('Email: john.doe@example.com\nPhone: +1234567890');
});

// 4. /register POST: Return status 201 Created
app.post('/register', (req, res) => {
  res.status(201).send('Created');
});

// 5. /update PUT: Return status 200 Updated
app.put('/update', (req, res) => {
  res.status(200).send('Updated');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
