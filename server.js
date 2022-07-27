const express = require('express');
const connectDB = require('./server/db/conn');
const path = require('path');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());


// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Server static assets in production
if (process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static('client/build'));

   // send HTML file to load
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const port = PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));