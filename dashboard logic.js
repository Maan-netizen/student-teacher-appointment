//------------------- admin.js -------------------
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is admin, otherwise redirect
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(doc => {
                if (!doc.exists || doc.data().role !== 'admin') {
                    window.location.href = 'index.html';
                }
            });
        } else {
            window.location.href = 'index.html';
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        auth.signOut().then(() => window.location.href = 'index.html');
    });

    // Add Teacher Logic
    // ... (Code to add teacher to 'teachers' collection in Firestore)

    // Display Teachers Logic
    // ... (Code to fetch and display teachers from Firestore)

    // Display Pending Students Logic
    // ... (Code to fetch students with 'pending' status and show approve/reject buttons)
});


// ------------------- teacher.js -------------------
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is teacher, otherwise redirect
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(doc => {
                if (!doc.exists || doc.data().role !== 'teacher') {
                    window.location.href = 'index.html';
                } else {
                    document.getElementById('teacher-welcome').innerText = `Welcome, ${doc.data().name}!`;
                }
            });
        } else {
            window.location.href = 'index.html';
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        auth.signOut().then(() => window.location.href = 'index.html');
    });

    // Manage Schedule Logic
    // ... (Code to add/view available slots in Firestore)

    // View Appointment Requests Logic
    // ... (Code to fetch appointments for this teacher and show approve/cancel buttons)
});


// ------------------- student.js -------------------
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is approved student, otherwise redirect
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(doc => {
                if (!doc.exists || doc.data().status !== 'approved') {
                    alert('Your account is pending approval or you are not a student.');
                    auth.signOut();
                    window.location.href = 'index.html';
                } else {
                     document.getElementById('student-welcome').innerText = `Welcome, ${doc.data().name}!`;
                }
            });
        } else {
            window.location.href = 'index.html';
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        auth.signOut().then(() => window.location.href = 'index.html');
    });

    // Search Teacher Logic
    // ... (Code to search/filter teachers from Firestore)

    // Book Appointment Logic
    // ... (Code to create a new appointment document in Firestore)

    // View My Appointments Logic
    // ... (Code to fetch and display appointments for the current student)
});
