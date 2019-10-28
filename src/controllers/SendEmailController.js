const nodemailer = require('nodemailer');
// TODO: Mudar controller para SendEmailController e fazer funções coom o nome do servidor web de email Ex. sendMailTrap() ou sendOutlook()
module.exports = {
    sendMailTrap(req, res) {
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
                    user: req.body.usuario,
                    pass: req.body.senha,
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

    },

    sendGmail(req, res) {

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
        // Create the transporter with the required configuration for Gmail
        // change the user and pass !
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'marcsantosferreira@gmail.com',
                pass: '23725937'
            }
        });

        // setup e-mail data
        var mailOptions = {
            from: '"Não responder " <marcsantosferreira@gmail.com>', // sender address (who sends)
            to: 'msoftware.marc@outlook.com, marcsferreira2000@gmail.com', // list of receivers (who receives)
            subject: 'Nova Mensagem do Site', // Subject line
            text: req.body.message, // plaintext body
            html: htmlEmail // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }

            console.log('Message sent: ' + info.response);
        });
    }
}
