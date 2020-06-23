import MedalsController from '../controllers/medalsController.js'

export default class ManageAchievementsView {
    constructor() {
        this.medalsController = new MedalsController();

        this.medalsList = document.querySelector("#listMedals")


        this.listMedals(this.medalsController.getAllMedals());

        //form add
        this.addMedalForm = document.getElementById('frmAddMedal');
        this.medalName = document.getElementById('txtName');
        this.medalPhoto = document.getElementById('txtPhoto');
        this.medalDescription = document.getElementById('txtDescription');

        //form edit
        this.editMedalForm = document.getElementById('frmEditMedal');
        this.editMedalName = document.getElementById('txtEditName');
        this.editMedalPhoto = document.getElementById('txtEditPhoto');
        this.editMedalDescription = document.getElementById('txtEditDescription');

        this.bindAddAddMedalForm();

        this.checkLogout();
    }

    bindAddRemoveMedal() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.medalsController.removeMedal(event.target.id)
                this.listMedals(this.medalsController.getAllMedals());
            })
        }
    }

    bindAddAddMedalForm() {
        this.addMedalForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.medalsController.createMedal(
                    this.medalName.value,
                    this.medalPhoto.value,
                    this.medalDescription.value

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

    bindAddEditMedal() {

        for (const btnEdit of document.getElementsByClassName("edit")) {
            btnEdit.addEventListener('click', event => {
                //set category's data on the placeholder 
                let oldName = event.target.id;
                let allMedals = this.medalsController.getAllMedals();
                this.medalToEdit = allMedals.find(medal => medal.name == oldName);
                this.editMedalName.placeholder = this.medalToEdit.name;
                this.editMedalPhoto.placeholder = this.medalToEdit.photo;
                this.editMedalDescription.placeholder = this.medalToEdit.description;
                //form
                this.editMedalForm.addEventListener('submit', event => {
                    event.preventDefault();

                    //if input is not empty 
                    if (this.editMedalName.value != "") {
                        this.newName = this.editMedalName.value
                    }
                    //if input is not used 
                    else {
                        this.newName = this.medalToEdit.name
                    }
                    //if input is not empty 
                    if (this.editMedalPhoto.value != "") {
                        this.newPhoto = this.editMedalPhoto.value

                    }
                    //if input is not used 
                    else {
                        this.newPhoto = this.medalToEdit.photo
                    }
                    //if input is not empty 
                    if (this.editMedalDescription.value != "") {
                        this.newDescription = this.editMedalDescription.value

                    }
                    //if input is not used 
                    else {
                        this.newDescription = this.medalToEdit.description
                    }
                    

                    try {
                        this.medalsController.editMedal(oldName, this.newName, this.newPhoto, this.newDescription);
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

                this.listMedals(this.medalsController.getAllMedals());
            })
        }
    }


    listMedals(medals = []) {

        let result = ''
        let i = 0
        for (const medal of medals) {
            result += `<tr>`
            result += this._generateMedalsTable(medal)
            i++
            result += `</tr>`
        }

        this.medalsList.innerHTML = result

        this.bindAddRemoveMedal();
        this.bindAddEditMedal();

    }

    _generateMedalsTable(medal) {
        let html = `<td>${medal.id}</td> 
        <td><img class="rounded-circle mr-2" width="30" height="30" src="${medal.photo}" "></td> 
                                        <td>${medal.name}</td>
                                        <td>${medal.description}</td>
                                        <td>
                                            <button id="${medal.name}" class="btn btn-primary edit" data-toggle="modal"
                                            data-target="#editMedalModal" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${medal.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
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