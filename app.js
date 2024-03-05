const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/guess', (req, res) => {
  console.log(req.body);

  axios.post(`${process.env.BACKEND_URL}/guess`, {
    data: req.body
  }).then(response => {
    res.status(200).json(response.data);
  }).catch(error => {
    console.log(error);
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});