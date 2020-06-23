import UserController from '../controllers/UserController.js'

export default class RegisterView {
    constructor() {
        this.userController = new UserController();

        // register DOM
        this.registerForm = document.getElementById('frmRegister');
        this.registerUsername = document.getElementById('txtUsernameRegister');
        this.registerEmail = document.getElementById('txtEmailRegister');
        this.registerPassword = document.getElementById('txtPasswordRegister');
        this.registerPassword2 = document.getElementById('txtPasswordRegister2');
        this.registerName = document.getElementById('txtNameRegister');
        this.registerDoB = document.getElementById('txtDoBRegister');
        this.registerLocation = document.getElementById('txtLocationRegister');
        this.registerMessage = document.getElementById('mdlRegisterMessage');
        this.bindAddRegisterForm();
    
    }

    bindAddRegisterForm() {
        this.registerForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                if (this.registerPassword.value !==this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');   
                }
                 this.userController.createUser("atleta" , this.registerUsername.value, this.registerEmail.value, this.registerPassword.value, this.registerName.value, this.registerDoB.value, this.registerLocation.value );
                this.displayRegisterMessage('User registered with success!', 'success');
                
                location.href='login.html';
            } catch(e) {
                this.displayRegisterMessage(e, 'danger');
            }
        });
    }

    
    // bindAddLogoutEvent() {
    //     this.logoutButton.addEventListener('click', event => {
    //         this.userController.logoutUser();
    //         this.updateButtons('logout');
    //         location.reload()
    //     });
    // }

    checkLoginStatus() {
        if (this.userController.checkLoginStatus()) {
            this.updateButtons('login');
        } else {
            this.updateButtons('logout');
        }
    }

    displayRegisterMessage(message, type) {
        this.registerMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }

   
    // updateButtons(event) {
    //     switch(event) {
    //         case 'login':
    //             this.loginButton.style.visibility = 'hidden'
    //             this.registerButton.style.visibility = 'hidden'
    //             this.logoutButton.style.visibility = 'visible'
    //             break;
    //         case 'logout':
    //             this.loginButton.style.visibility = 'visible'
    //             this.registerButton.style.visibility = 'visible'
    //             this.logoutButton.style.visibility = 'hidden'
    //     }
    // }
}
