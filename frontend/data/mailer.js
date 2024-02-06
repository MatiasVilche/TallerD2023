import axios from 'axios';

const sendEmail = async(message) => {
    const response = await axios.post(`${process.env.SERVIDOR}/Mailer/materiales/${message}`);
    return response;
}

const sendEmailPassword = async(msg) => {
    const response = await axios.post(`${process.env.SERVIDOR}/Mailer/password`, msg);
    return response;
}

export {
    sendEmail,
    sendEmailPassword
}
