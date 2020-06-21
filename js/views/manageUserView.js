import UserController from '../controllers/UserController.js'

export default class ManageUserView {
    constructor() {
        this.userController = new UserController();

        this.userList = document.querySelector("#listUsers")


        this.listUsers(this.userController.getAllUsers());

        //add
        this.addUserForm = document.getElementById('frmAddUser');
        this.userUsername = document.getElementById('txtUserName');
        this.userName = document.getElementById('txtName');
        // this.userPhoto = document.getElementById('txtPhoto');
        this.userType = document.getElementById('sltType');
        this.userEmail = document.getElementById('txtEmail');
        this.userPassword = document.getElementById('txtPassword');
        this.userDoB = document.getElementById('sltDoB');
        this.userDistrict = document.getElementById('sltDistrict');

        //edit
        this.editUserForm = document.getElementById('frmEditUser');
        this.editUserUsername = document.getElementById('txtEditUserName');
        this.editUserName = document.getElementById('txtEditName');
        this.editUserType = document.getElementById('sltEditType');
        this.editUserEmail = document.getElementById('txtEditEmail');
        this.editUserDoB = document.getElementById('sltEditDoB');
        this.editUserDistrict = document.getElementById('sltEditDistrict');
        this.editUserPhoto = document.getElementById('txtEditPhoto');

        this.bindAddAddUserForm();

        this.checkLogout();
    }

    bindAddRemoveUser() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {

                Swal.fire({
                    title: 'Tem a certeza que quer apagar?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, apagar!'
                }).then((result) => {
                    if (result.value) {
                        this.userController.removeUser(event.target.id)
                        this.listUsers(this.userController.getAllUsers());
                        Swal.fire(
                            'Apagado!',
                            'Utilizador apagado com sucesso.',
                            'success'
                        )
                    }
                })
            })
        }
    }

    //TODO mudar nome e cor do botao ao mudar de bloqueado para desbloqueado
    bindBlockUser() {
        for (const btnBlock of document.getElementsByClassName("block")) {
            btnBlock.addEventListener('click', event => {

                let userToBlockId = event.target.id;
                let allUsers = this.userController.getAllUsers();
                let userToBlock = allUsers.find(user => user.id == userToBlockId);
                let blockedStatus = userToBlock.blocked;

                //Block
                if (blockedStatus == false) {
                    Swal.fire({
                        title: 'Tem a certeza que quer bloquear?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sim, bloquear!'
                    }).then((result) => {
                        if (result.value) {
                            this.userController.blockUser(userToBlockId)
                            this.listUsers(this.userController.getAllUsers());
                            Swal.fire(
                                'Bloqueado!',
                                'Utilizador bloqueado com sucesso.',
                                'success'
                            )
                        }
                    })
                }
                //Unblock
                if (blockedStatus == true) {
                    Swal.fire({
                        title: 'Tem a certeza que quer desbloquear?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sim, desbloquear!'
                    }).then((result) => {
                        if (result.value) {
                            this.userController.blockUser(userToBlockId)
                            this.listUsers(this.userController.getAllUsers());
                            Swal.fire(
                                'Desbloqueado!',
                                'Utilizador desbloqueado com sucesso.',
                                'success'
                            )
                        }
                    })
                }
            })
        }
    }

    bindAddAddUserForm() {
        this.addUserForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.userController.createUser(
                    this.userType.value,
                    this.userUsername.value,
                    this.userEmail.value,
                    this.userPassword.value,
                    this.userName.value,
                    this.userDoB.value,
                    this.userDistrict.value


                );
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


    bindEditUser() {



        for (const btnEdit of document.getElementsByClassName("edit")) {
            btnEdit.addEventListener('click', event => {
                //set category's data on the placeholder 
                let userToEditId = event.target.id;
                let allUsers = this.userController.getAllUsers();
                this.userToEdit = allUsers.find(user => user.id == userToEditId);
                this.editUserType.value = this.userToEdit.type;
                this.editUserUsername.placeholder = this.userToEdit.username;
                this.editUserEmail.placeholder = this.userToEdit.email;
                this.editUserName.placeholder = this.userToEdit.name;
                this.editUserDoB.value = this.userToEdit.dateOfBirth;
                this.editUserDistrict.value = this.userToEdit.location;
                this.editUserPhoto.placeholder = this.userToEdit.photo;

                //form
                this.editUserForm.addEventListener('submit', event => {
                    event.preventDefault();

                    this.newType = this.editUserType.value

                    //if input is not empty 
                    if (this.editUserUsername.value != "") {
                        this.newUsername = this.editUserUsername.value
                    }
                    //if input is not used 
                    else {
                        this.newUsername = this.userToEdit.username
                    }

                    //if input is not empty 
                    if (this.editUserEmail.value != "") {
                        this.newEmail = this.editUserEmail.value
                    }
                    //if input is not used 
                    else {
                        this.newEmail = this.userToEdit.email
                    }

                    //if input is not empty 
                    if (this.editUserName.value != "") {
                        this.newName = this.editUserName.value
                    }
                    //if input is not used 
                    else {
                        this.newName = this.userToEdit.name
                    }

                    this.newDoB = this.editUserDoB.value


                    this.newLocation = this.editUserDistrict.value


                    //if input is not empty 
                    if (this.editUserPhoto.value != "") {
                        this.newPhoto = this.editUserPhoto.value
                    }
                    //if input is not used 
                    else {
                        this.newPhoto = this.userToEdit.photo
                    }

                    this.userController.editUser(userToEditId, this.newType, this.newUsername, this.newEmail, this.newName, this.newDoB, this.newLocation, this.newPhoto);
                    location.reload();
                    try {
                        this.userController.editUser(userToEditId, this.newType, this.newUsername, this.newEmail, this.newName, this.newDoB, this.newLocation, this.newPhoto);
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
        this.bindBlockUser();
        this.bindEditUser();

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
                                        <td>${user.blocked}</td>
                                        <td>
                                            <button id="${user.id}" data-toggle="modal"
                                            data-target="#editUserModal" class="btn btn-primary edit" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${user.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
                                            <button id="${user.id}" class="btn btn-primary block" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;">Bloquear</button>
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
                
                location.href="../index.html";

            })
        }

    }
}