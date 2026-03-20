const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 1. / GET: Welcome message -> served via explicitly sending index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2. /about GET: Student name, roll number, course
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// 3. /contact GET: Email or contact info
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Serve frontend forms
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/update', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'update.html'));
});

// In-memory persistence
let student = {
    name: 'John Doe',
    rollNo: 23,
    course: 'Computer Engineering'
};

// API endpoint for frontend to dynamically load data
app.get('/api/student', (req, res) => {
    res.json(student);
});

// API endpoints to fulfill the postman requirements
// 4. /register POST: Return status 201 Created
app.post('/register', (req, res) => {
  if (req.body.name) student.name = req.body.name;
  if (req.body.branch) student.course = req.body.branch;
  // Year is submitted but not shown in About by default requirements, so we store it silently or ignore it
  
  res.status(201).send('Created');
});

// 5. /update PUT: Return status 200 Updated
app.put('/update', (req, res) => {
  const { field, value } = req.body;
  if (field === 'name') student.name = value;
  if (field === 'branch' || field === 'course') student.course = value;
  
  res.status(200).send('Updated');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
