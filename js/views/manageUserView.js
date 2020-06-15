import UserController from '../controllers/UserController.js'

export default class ManageUserView {
    constructor() {
        this.userController = new UserController();

        this.userList = document.querySelector("#listUsers")
        

        this.listUsers(this.userController.getAllUsers());

        
        // // login DOM
        // this.loginForm = document.getElementById('frmLogin');
        // this.loginUsername = document.getElementById('txtUsername');
        // this.loginPassword = document.getElementById('txtPassword');
        // this.loginMessage = document.getElementById('mdlLoginMessage');

        // this.bindAddLoginForm();

        // // buttons DOM
        // this.loginButton = document.getElementById('btnLogin');
        // this.registerButton = document.getElementById('btnRegister');
        //this.logoutButton = document.getElementById('btnLogout');

        //this.bindAddLogoutEvent();

        //this.checkLoginStatus();     
    }

    bindAddRemoveUser() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.userController.removeUser(event.target.id)
                this.listUsers(this.userController.getAllUsers());
            })
        }
    }

    listUsers(users = []) {

        let result = ''
        let i = 0
        for (const user of users) {
            result += `<tr>`
            result += this._generateUserTable(user)
            i++
            result += `</tr>`
        }

        this.userList.innerHTML = result
        //this._renderAddActivityButton(this.userController.checkLoginStatus());

        this.bindAddRemoveUser();

    }

    _generateUserTable(user) {
        let html = ` 
        <td><img class="rounded-circle mr-2" width="30" height="30" src="${user.photo}" "></td> 
                                        <td>${user.username}</td>
                                        <td>${user.name}</td>
                                        <td>${user.type}</td>
                                        <td>${user.email}</td>
                                        <td>${user.dateOfBirth}</td>
                                        <td>${user.location}</td>
                                        <td>
                                            <button class="btn btn-primary" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${user.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
                                            <button class="btn btn-primary" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;">Bloquear</button>
                                        </td>
        `
        return html
    }
}