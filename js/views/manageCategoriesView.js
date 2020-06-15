import CategoriesController from '../controllers/categoriesController.js'

export default class ManageCategoriesView {
    constructor() {
        this.categoriesController = new CategoriesController();

        this.categoriesList = document.querySelector("#listCategories")
        

        this.listCategories(this.categoriesController.getAllCategories());

        
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

    bindAddRemoveCategory() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.categoriesController.removeCategory(event.target.id)
                this.listCategories(this.categoriesController.getAllCategories());
            })
        }
    }

    listCategories(categories = []) {

        let result = ''
        let i = 0
        for (const category of categories) {
            result += `<tr>`
            result += this._generateCategoriesTable(category)
            i++
            result += `</tr>`
        }

        this.categoriesList.innerHTML = result
        //this._renderAddActivityButton(this.userController.checkLoginStatus());

        this.bindAddRemoveCategory();

    }

    _generateCategoriesTable(category) {
        let html = ` 
                                        <td>${category.id}</td>
                                        <td>${category.type}</td>
                                        <td>
                                            <button class="btn btn-primary" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${category.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
                                            <button class="btn btn-primary" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;">Bloquear</button>
                                        </td>
        `
        return html
    }
}