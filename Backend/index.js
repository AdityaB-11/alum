const express = require("express");
const fs = require("fs");
const mongoose = require('mongoose');
const app = express();
const { connectDB } = require('./db/index.js');
const path = require("path");
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const hbs = require("hbs");

const {Registration}= require('./models/Registration.js');
// const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../template');
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


connectDB()

// Middleware setup
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'views')));

// app.set("views", templatePath);

// Define routes
app.get("/card", (req, res) => {
    res.render("card");
});
 

// app.post("/signup", async (req, res) => {
//     try {
//         const { name, password } = req.body
//         // await collection.insertMany([data]);
//         const user = await User.create({
//             username: name,
//             password
//         })
//         console.log(user)
//         res.render("home");
//     } catch (err) {
//         console.error("Error during signup:", err);
//         res.status(500).send("Error during signup");
//     }
// });

// app.post('/signup', async (req, res) => {
//     try {
//         // Create a new user instance using the submitted form data
//         const newUser = new User({
//             fname: req.body.fname,
//             lname: req.body.lname,
//             age: req.body.age,
//             email: req.body.email,
//             gender: req.body.gender,
//             department: req.body.department,
//             contactno: req.body.contactno,
//             username: req.body.username,
//             password: req.body.password,

//         });
//         // Save the user data to MongoDB
//         await newUser.save();
//         res.status(201).send('User registered successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// Route handler for POST requests to '/signup'
app.post('/signup', async (req, res) => {
    try {
        // Extract form data from request body
        const { fname, lname, email, gender, contactno, age,address,occupation,expertise, department,batch, username, password } = req.body;

        // Create a new registration document
        const registration = await Registration.create({
            fname,
            lname,
            email,
            gender,
            contactno,
            age,
            address,
            occupation,
            expertise,
            
            department,
            batch,
            username,
            password
        });

      
        
        // Send success response
        res.status(201).json({ message: 'User registered successfully',
                               redirectUrl: "login.html" });
    } catch (error) {
        // Send error response
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(req.body)

        if (!username && !password) {
            res.status(400).send("USERNAME AND PASSWORD NEEDED.")
        }

        const user = await Registration.findOne({ username })
        if (!user) {
            res.status(400).send("USER NOT FOUND")
        }

        if (user.password === password) {
            res.status(200).json({
                redirectUrl: "profile.html",
                data: user
            })
        } else {
            res.status(400).send("WRONG PASSWORD")
        }
        

    } catch (error) {
        console.log(error)
    }
});
// Backend route handler for retrieving user profile
app.get('/login', async (req, res) => {
    try {
        // Assuming you're using sessions for authentication and storing user data in the session
        // Retrieve user information from the session
        const user = req.session.user;

        // Assuming user object has a 'username' property
        // You can adjust this based on your user schema
        const username = user.username;

        // Send the user's information as a JSON response
        res.json({ username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// // POST endpoint for handling login
// app.post('/login', (req, res) => {
//     // Extract username and password from the request body
//     const { username, password } = req.body;

//     // Here, you would typically perform authentication,
//     // such as checking the credentials against a database

//     // For demonstration purposes, assuming authentication is successful
//     // You would replace this with your actual authentication logic
//     if (username === 'example_user' && password === 'example_password') {
//         // If authentication is successful, send back a response with the username
//         res.status(200).json({ success: true, username: username });
//     } else {
//         // If authentication fails, send back an error response
//         res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
// });


app.get('/alumni', async (req, res) => {
    try {
      const alumniData = await Registration.find();
      res.json(alumniData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Serve HTML file
  app.use(express.static('public'));
  


 

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
