import nodemailer from "nodemailer";
import { ErrorHandler } from "../handlers/errorHandler";

export const sendEmail = async (token:string, email:string) => {
    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        },
        auth: {
            user: 'epaycotestbaron@gmail.com',
            pass: 'epayco1234'
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);

    const mailOptions = {
        from: 'Epayco',
        to: email,
        subject: 'Confirma la Transacción',
        text: 'El Token es ' + token
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            throw new ErrorHandler(404, "Error al Enviar el Correo");
        } else {
            console.log("Correo Enviado: %s", info.messageId);
        }
    });
};
