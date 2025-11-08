const twilio = require('twilio');

class TwilioService {
    async sendSMS(to, body){
        try{
            const message = await client.messages.create({
                body,
                from: process.env.TWILIO_PHONE_NUMBER,
                to,
            });
            console.log('SMS Sent successfully:', message.sid);
            return message;
        } catch(error){
            console.error('Error sending SMS:', error);
            throw error;
        }
    }

    async sendVoteConfirmation(phoneNumber, electionTitle, candidateName){
        const body = `Your vote for ${candidateName} in the ${electionTitle} election has been recorded sucessfully. Thank you for participating! `;
        return this.sendSMS(phoneNumber, body);
    }

    async sendElectionReminder(phoneNumber, electionTitle, endDate){
        const body = `Reminder: The ${electionTitle} election ends on ${endDate}. Don't forget to cast your vote!`;
        return this.sendSMS(phoneNumber, body);
    }
}

module.exports = new TwilioService();