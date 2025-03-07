require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const ip_addr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  return res.status(200).json({
      status: 'OK',
      message: `Welcome ${ip_addr}`,
  });
});

app.post('/pre-parse/validation', async (req, res) => {
    try {
      const authHeader = req.headers['hasura-m-auth'];
      if (authHeader !== 'your-super-secret-key') {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const { rawRequest } = req.body;
      const { query, mutation, operationName, variables } = rawRequest;

      console.log(rawRequest);

      const match = query.match(/objects:\s*({.*?})/s);

      let jsonObject = null;
      if (match) {
        const jsonString = match[1]
            .replace(/(\w+):/g, '"$1":')  // Convert keys to valid JSON format
            .replace(/"/g, '\"');        // Ensure correct escaping
    
        jsonObject = JSON.parse(jsonString);
        console.log(jsonObject);
    } else {
        console.log("No JSON object found.");
    }

      if (operationName == 'SendMessage') {
        return res.status(200).json({
          data: {
            validate: true,
            message: 'Validation success',
            rawRequest: rawRequest,
            jsonObject: jsonObject
          },
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'error.internal', message: 'Error retrieving data' });
    }
});

module.exports = app;