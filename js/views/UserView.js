import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // login DOM
        this.loginForm = document.getElementById('frmLogin');
        this.loginUsername = document.getElementById('txtUsername');
        this.loginPassword = document.getElementById('txtPassword');
        this.loginMessage = document.getElementById('mdlLoginMessage');

        this.bindAddLoginForm();

        // buttons DOM
        this.loginButton = document.getElementById('btnLogin');
        this.registerButton = document.getElementById('btnRegister');
        //this.logoutButton = document.getElementById('btnLogout');

        this.addUserForm = document.getElementById('frmAddUser');
        this.userUsername = document.getElementById('txtUserName');
        this.userName = document.getElementById('txtName');
        // this.userPhoto = document.getElementById('txtPhoto');
        this.userType = document.getElementById('sltType');
        this.userEmail = document.getElementById('txtEmail');
        this.userPassword = document.getElementById('txtPassword');
        this.userDoB = document.getElementById('sltDoB');
        this.userDistrict = document.getElementById('sltDistrict');

        this.bindAddAddUserForm();
    }



    bindAddLoginForm() {
        this.loginForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.userController.loginUser(this.loginUsername.value, this.loginPassword.value);
                this.displayLoginMessage('User logged in with success!', 'success');

                // Wait 1 second before reloading, so the user can see the login success message
                setTimeout(() => {
                        this.updateButtons('login');
                        location.reload()
                    },
                    1000);
                if (sessionStorage.getItem('loggedUser') == "atleta") {
                    location.href = 'listActivities.html';
                } else if (sessionStorage.getItem('loggedUser') == "admin") {
                    location.href = 'statistics.html';
                }


            } catch (e) {
                this.displayLoginMessage(e, 'danger');
            }
        });
    }


    

    

    displayRegisterMessage(message, type) {
        this.registerMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }

    displayLoginMessage(message, type) {
        this.loginMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }

    
}