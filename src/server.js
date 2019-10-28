const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
const SendEmailController = require('./controllers/SendEmailController');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/form/mail_trap', SendEmailController.sendMailTrap);
app.post('/api/form/gmail', SendEmailController.sendGmail);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server Listen on port ${PORT}`);
})
