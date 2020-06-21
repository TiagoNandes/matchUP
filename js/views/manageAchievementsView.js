import AchievementsController from '../controllers/achievementsController.js'

export default class ManageAchievementsView {
    constructor() {
        this.achievementsController = new AchievementsController();

        this.achievementsList = document.querySelector("#listAchievements")


        this.listAchievements(this.achievementsController.getAllAchievements());

        //Add
        this.addAchievementForm = document.getElementById('frmAddAchievement');
        this.achievementName = document.getElementById('txtName');
        this.achievementPhoto = document.getElementById('txtPhoto');

        //Edit
        this.editAchievementForm = document.getElementById('frmEditAchievement');
        this.editAchievementName = document.getElementById('txtEditName');
        this.editAchievementPhoto = document.getElementById('txtEditPhoto');

        this.bindAddAddAchievementForm();

        this.checkLogout();
    }

    bindAddRemoveAchievement() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.achievementsController.removeAchievement(event.target.id)
                this.listAchievements(this.achievementsController.getAllAchievements());
            })
        }
    }

    bindAddAddAchievementForm() {
        this.addAchievementForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.achievementsController.createAchievement(
                    this.achievementName.value,
                    this.achievementPhoto.value

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

    bindEditAchievement() {

        for (const btnEdit of document.getElementsByClassName("edit")) {
            btnEdit.addEventListener('click', event => {
                //set category's data on the placeholder 

                let oldName = event.target.id;
                let getAllAchievements = this.achievementsController.getAllAchievements();
                this.achievementToEdit = getAllAchievements.find(achievement => achievement.name == oldName);
                this.editAchievementName.placeholder = this.achievementToEdit.name;
                this.editAchievementPhoto.placeholder = this.achievementToEdit.photo;
                //form
                this.editAchievementForm.addEventListener('submit', event => {
                    event.preventDefault();
                    //if input is not empty 
                    if (this.editAchievementName.value != "") {
                        this.newName = this.editAchievementName.value
                    }
                    //if input is not used 
                    else {
                        this.newName = this.achievementToEdit.name
                    }
                    //if input is not empty 
                    if (this.editAchievementPhoto.value != "") {
                        this.newPhoto = this.editAchievementPhoto.value

                    }
                    //if input is not used 
                    else {
                        this.newPhoto = this.achievementToEdit.photo
                    }

                    try {
                        this.achievementsController.editAchievement(oldName, this.newName, this.newPhoto);
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

                this.listAchievements(this.achievementsController.getAllAchievements());
            })
        }
    }

    listAchievements(achievements = []) {

        let result = ''
        let i = 0
        for (const achievement of achievements) {
            result += `<tr>`
            result += this._generateAchievementsTable(achievement)
            i++
            result += `</tr>`
        }

        this.achievementsList.innerHTML = result
        //this._renderAddActivityButton(this.userController.checkLoginStatus());

        this.bindAddRemoveAchievement();
        this.bindEditAchievement();

    }

    _generateAchievementsTable(achievement) {
        let html = ` 
                                        <td>${achievement.id}</td>
                                        <td><img class="rounded-circle mr-2" width="30" height="30" src="${achievement.photo}" "></td> 
                                        <td>${achievement.name}</td>
                                        <td>
                                            <button id="${achievement.name}" class="btn btn-primary edit" data-toggle="modal"
                                            data-target="#editAchievementModal" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${achievement.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
                                            
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