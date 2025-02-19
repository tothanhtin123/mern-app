import firebaseServiceAccount from './react-http-c3250-firebase-adminsdk-x59tr-5bc55187f8.json';
import firebaseAdmin from 'firebase-admin';
import dotenv from 'dotenv'
dotenv.config();

//đường dẫn đến storage của firebase
const STORAGE_URL = process.env.FIREBASE_STORAGE_BUCKET_URL;

console.log(STORAGE_URL);

//thiết lập kết nối firebase
const firebase = firebaseAdmin.initializeApp({
    //cấu hình service được lấy từ firebase
    credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    storageBucket: STORAGE_URL,
})

export default firebase;