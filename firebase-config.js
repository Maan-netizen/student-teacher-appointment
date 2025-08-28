// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCmuCTN-bJWLOq5Yxa9Zpevt5gf9v4NA2A",
  authDomain:"student-teacher-appontme-5f0d6.firebaseapp.com",
  projectId: "student-teacher-appontme-5f0d6",
  storageBucket:"student-teacher-appontme-5f0d6.firebasestorage.app" ,
  messagingSenderId:" 391451881441" ,
  appId: "1:391451881441:web:2948c8a66bc2e236b0aca0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
const auth = firebase.auth();
const db = firebase.firestore();