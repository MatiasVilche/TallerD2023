import axios from 'axios';

const sendEmail = async(message) => {
    const response = await axios.post(`${process.env.SERVIDOR}/Mailer/${message}`);
    return response
}

module.exports = {
    sendEmail
}