document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    // Toggle between login and registration forms
    showRegister.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    showLogin.addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Login functionality
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const userId = userCredential.user.uid;
                // Check user role and redirect
                db.collection('users').doc(userId).get().then(doc => {
                    if (doc.exists) {
                        const userRole = doc.data().role;
                        if (userRole === 'admin') window.location.href = 'admin.html';
                        else if (userRole === 'teacher') window.location.href = 'teacher.html';
                        else window.location.href = 'student.html';
                    } else {
                        alert('User role not found.');
                    }
                });
            })
            .catch(error => alert(error.message));
    });

    // Registration functionality
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Store user info in Firestore with 'pending' status
                db.collection('users').doc(userCredential.user.uid).set({
                    name: name,
                    email: email,
                    role: 'student',
                    status: 'pending'
                }).then(() => {
                    alert('Registration successful! Please wait for admin approval.');
                    registerForm.reset();
                });
            })
            .catch(error => alert(error.message));
    });
});
