const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors =  require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((error, account) => {
        const htmlEmail = `
            <h3>Detalhes do contato - Site Msoftware</h3>
            <ul>
                <li>Name: ${req.body.name} </li>
                <li>Email: ${req.body.email} </li>
                <li>Phone: ${req.body.phone} </li>
            </ul>
            <h2>Mensagem do detalhe do site do cliente: </h2>
            <p>${req.body.message}</p>
        `;

        let transpoter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '785500aaf9ad00',
                pass: 'da4840519080d0',
            }
        });
        let mailOptions = {
            from: 'teste@teste.com',
            to: 'msoftware.marc@outlook.com',
            replyTo: 'test@testaccount.com',
            subject: 'Nova mensagem',
            text: req.body.message,
            html: htmlEmail,
        }

        transpoter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }

            console.log('Message sent: %s', info.message);
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));

        });

    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server Listen on port ${PORT}`);
})
