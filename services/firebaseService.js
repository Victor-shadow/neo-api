const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert({
            type: "service_account",
            project_id: process.env.FIREBASE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_CLIENT_ID,
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
        })
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}
class FirebaseService {
    async sendNotification(token, title, body){
        try{
            const message = {
                notification: {
                    title,
                    body,
                },
                token,
            };

            const response = await admin.messaging().send(message);
            console.log('Successfully sent message:', response);
            return response;
        } catch(error){
            console.error('Error sending message:', error);
            throw error;
        }
    }

    async verifyToken(token){
        try{
            const decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        } catch(error){
            console.error('Error verifying token: ', error);
            throw error;
        }
    }


    async getUser(uid){
        try {
            const userRecord = await admin.auth().getUser(uid);
            return userRecord;
        } catch(error){
            console.error('Error fetching user:', error);
            throw error;
        }
    }
}

module.exports = new FirebaseService();