import CategoriesController from '../controllers/categoriesController.js'

export default class ManageCategoriesView {
    constructor() {
        this.categoriesController = new CategoriesController();

        this.categoriesList = document.querySelector("#listCategories")


        this.listCategories(this.categoriesController.getAllCategories());

        //add
        this.addCategoryForm = document.getElementById('frmAddCategory');
        this.categoryName = document.getElementById('txtName');

        //edit
        this.editCategoryForm = document.getElementById('frmEditCategory');
        this.editCategoryName = document.getElementById('txtEditName');

        this.bindAddAddCategoryForm();

        this.checkLogout();


    }

    bindAddRemoveCategory() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.categoriesController.removeCategory(event.target.id)
                this.listCategories(this.categoriesController.getAllCategories());
            })
        }
    }


    bindAddAddCategoryForm() {
        this.addCategoryForm.addEventListener('submit', event => {
            event.preventDefault();

            try {

                this.categoriesController.createCategory(this.categoryName.value);
                location.reload();


            } catch (e) {
                Swal.fire({
                    title: 'Erro!',
                    text: e,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        });
    }

    bindEditCategory() {

        for (const btnEdit of document.getElementsByClassName("edit")) {
            btnEdit.addEventListener('click', event => {
                //set category's data on the placeholder 
                let oldName = event.target.id;
                let allCategories = this.categoriesController.getAllCategories();
                this.categoryToEdit = allCategories.find(category => category.name == oldName);
                this.editCategoryName.placeholder = this.categoryToEdit.name;
                //form
                this.editCategoryForm.addEventListener('submit', event => {
                    event.preventDefault();

                    //if input is not empty 
                    if (this.editCategoryName.value != "") {
                        this.newName = this.editCategoryName.value
                    }
                    //if input is not used 
                    else {
                        this.newName = this.categoryToEdit.name
                    }

                    try {
                        this.categoriesController.editCategory(oldName, this.newName);
                        location.reload();


                    } catch (e) {
                        Swal.fire({
                            title: 'Erro!',
                            text: e,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }
                });

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
        this.bindEditCategory();

    }

    _generateCategoriesTable(category) {
        let html = ` 
                                        <td>${category.id}</td>
                                        <td>${category.name}</td>
                                        <td>
                                            <button id="${category.name}" class="btn btn-primary edit" data-toggle="modal"
                                            data-target="#editCategoryModal" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${category.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
                                            
                                        </td>
        `
        return html
    }

    checkLogout() {

        // Mapeamento dos cliques nos botões de Login/Register/Logout
        if (sessionStorage.getItem("loggedUser")) {
            // Apresentação do nome do utilizador autenticado
            document.querySelector("#loggedUser").innerHTML = `${sessionStorage.getItem("loggedUser")}`
            document.querySelector("#loggedUserPhoto").src = `${sessionStorage.getItem("loggedUserPhoto")}`
            // Clique no botão de logout
            document.querySelector("#btnLogout").addEventListener("click", function () {
                sessionStorage.removeItem('loggedUser');
                sessionStorage.removeItem('loggedUserId');
                sessionStorage.removeItem('loggedUserPhoto');
                sessionStorage.removeItem('loggedUserType');
                //this.userController.logoutUser();

                location.href = "../index.html";

            })
        }

    }
}