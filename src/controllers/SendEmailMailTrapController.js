const nodemailer = require('nodemailer');
// TODO: Mudar controller para SendEmailController e fazer funções coom o nome do servidor web de email Ex. sendMailTrap() ou sendOutlook()
module.exports = {
    send(req, res) {
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
    }
}
