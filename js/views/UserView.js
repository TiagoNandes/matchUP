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
       
    }



    bindAddLoginForm() {
        this.loginForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.userController.loginUser(this.loginUsername.value, this.loginPassword.value);
                

                if (sessionStorage.getItem('loggedUserType') == "atleta") {
                    location.href = 'listActivities.html';
                } else if (sessionStorage.getItem('loggedUserType') == "admin") {
                    location.href = 'statistics.html';
                }


            } catch (e) {
                this.displayLoginMessage(e, 'danger');
            }
        });
    }

  

    displayLoginMessage(message, type) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: message
          })
    }

    
}