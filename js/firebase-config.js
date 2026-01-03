// Firebase Configuration for Dev Sandesh Store
const firebaseConfig = {
    apiKey: "AIzaSyCqr_EYuOP_CNkh84Wbqg5NkvNVuAB6nnU",
    authDomain: "dev-sandesh-uc.firebaseapp.com",
    databaseURL: "https://dev-sandesh-uc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dev-sandesh-uc",
    storageBucket: "dev-sandesh-uc.firebasestorage.app",
    messagingSenderId: "438328231734",
    appId: "1:438328231734:web:75962e83c4ca8361825597",
    measurementId: "G-XDVPGH16J3"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();
// const analytics = firebase.analytics(); // Analytics optional, may need script tag
