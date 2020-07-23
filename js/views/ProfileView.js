import UserController from '../controllers/UserController.js'
import MedalsController from '../controllers/medalsController.js'
import AchievementsController from '../controllers/achievementsController.js'
import RequestsController from '../controllers/requestsController.js';

export default class ProfileView {

    constructor() {
        this.userController = new UserController()
        this.medalsController = new MedalsController()
        this.achievementsController = new AchievementsController()
        this.requestsController = new RequestsController()

        this.medalCatalog = document.querySelector("#medalCatalog")
        this.achievementCatalog = document.querySelector("#achievemetCatalog")

        // DOM References
        this.userPhoto = document.querySelector('#userPhoto')
        this.userName = document.querySelector('#userName')
        this.userName2 = document.querySelector('#userName2')
        this.userUserName = document.querySelector('#userUserName')
        this.userEmail = document.querySelector('#userEmail')
        this.userLocation = document.querySelector('#userLocation')


        //edit
        this.editUserForm = document.getElementById('frmEditUser');
        this.editUserUsername = document.getElementById('txtEditUserName');
        this.editUserName = document.getElementById('txtEditName');
        this.editUserPassword = document.getElementById('txtEditPassword');
        this.editUserPassword2 = document.getElementById('txtEditPassword2');
        this.editUserEmail = document.getElementById('txtEditEmail');
        this.editUserDoB = document.getElementById('sltEditDoB');
        this.editUserDistrict = document.getElementById('sltEditDistrict');
        this.editUserPhoto = document.getElementById('txtEditPhoto');

        // this.userPhoto = document.querySelector('#userPhoto')


        this.renderMedalCatalog(this.medalsController.getAllMedals())
        this.renderAchievementCatalog(this.achievementsController.getAllAchievements())
        //this.bindAddFilterEvent();
        this.fillProfileData();
        this.bindEditUser();
    }

    bindAddFilterEvent() {
        this.btnFilter.addEventListener('click', () => {
            this.renderCatalog(this.activityController.getActivities(this.txtActivity.value, this.sltCategory.value))
        })
    }

    bindAddRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.bandController.removeBand(event.target.id)
                this.renderCatalog(this.bandController.getBands(this.txtBand.value, this.sltGenre.value))
            })
        }
    }

    bindAddSeeMoreEvent() {
        for (const btnSee of document.getElementsByClassName("see")) {
            btnSee.addEventListener('click', event => {
                this.activityController.setCurrentActivity(event.target.id)
                location.href = 'activity.html';
            })
        }
    }

    bindEditUser() {


        //set category's data on the placeholder 
        let userToEditId = sessionStorage.getItem('loggedUserId')
        let allUsers = this.userController.getAllUsers();
        this.userToEdit = allUsers.find(user => user.id == userToEditId);
        this.editUserUsername.placeholder = this.userToEdit.username;
        this.editUserEmail.placeholder = this.userToEdit.email;
        this.editUserName.placeholder = this.userToEdit.name;
        this.editUserPassword.value = this.userToEdit.password;
        this.editUserPassword2.value = this.userToEdit.password;
        this.editUserDoB.value = this.userToEdit.dateOfBirth;
        this.editUserDistrict.value = this.userToEdit.location;
        this.editUserPhoto.placeholder = this.userToEdit.photo;

        //form
        this.editUserForm.addEventListener('submit', event => {
            event.preventDefault();

            this.newType = "atleta"

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
            if (this.editUserPassword.value == this.editUserPassword2.value) {
                this.newPassword = this.editUserPassword.value


                this.userController.editUser(userToEditId, this.newType, this.newUsername, this.newEmail, this.newName, this.newDoB, this.newLocation, this.newPhoto);
                location.reload();
                this.userController.editUserWithPassword(userToEditId, this.newType, this.newUsername, this.newEmail, this.newName, this.newDoB, this.newLocation, this.newPhoto, this.newPassword);
                location.reload();

                try {


                } catch (e) {
                    Swal.fire({
                        title: 'Erro!',
                        text: e,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            } else {
                alert("Passwords não são iguais!")
                event.stopImmediatePropagation();
            }


        });

    }



    fillProfileData() {

        const allUsers = this.userController.getAllUsers()
        this.currentUser = allUsers.find(user => user.id == sessionStorage.getItem('loggedUserId'))
        this.userPhoto.src = this.currentUser.photo
        this.userName.innerHTML = "Perfil de " + this.currentUser.name
        this.userName2.innerHTML = this.currentUser.name
        this.userUserName.innerHTML = this.currentUser.username
        this.userEmail.innerHTML = this.currentUser.email
        this.userLocation.innerHTML = this.currentUser.location


    }

    renderMedalCatalog(medals = []) {

        let allRequests = this.requestsController.getAllRequests();

        let countAct = 0;

        this.activitiesParticipated = allRequests.filter(request => request.userId == sessionStorage.getItem("loggedUserId") && request.state == "Aceite")

        for (const act of this.activitiesParticipated) {
            countAct++;
        }


        let result = ''

        let i = 0
        for (const medal of medals) {
            if (i < countAct) {
                if (i % 3 === 0) {
                    result += `<div class="card-group">`
                }
                result += this._generateMedalCard(medal)
                i++
                if (i % 3 === 0) {
                    result += ` </div>`
                }
            }
        }

        this.medalCatalog.innerHTML = result


    }


    _generateMedalCard(medal) {
        let html = ` 
        <div  class="card col-md-4" style="margin: 10px;">
        <img style="height: 190px; width: 190px;" class="card-img-top" src="${medal.photo}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${medal.name}</h5>
                                    <p class="card-text">${medal.description}</p>
                                    <div class="social" style="text-align: center;">
                                    <a href="#" id="share-fb" class="sharer button"><i class="fa fa-3x fa-facebook-square"></i></a>
                                    <a href="#" id="share-tw" class="sharer button"><i class="fa fa-3x fa-twitter-square"></i></a>
                                    </div>
                                </div>
                                </div>
        `
        return html
    }


    renderAchievementCatalog(achievements = []) {

        let result = ''
        let i = 0
        for (const achievement of achievements) {
            if (i % 3 === 0) {
                result += `<div class="card-group">`
            }
            result += this._generateAchievementCard(achievement)
            i++
            if (i % 3 === 0) {
                result += ` </div>`
            }
        }

        this.achievementCatalog.innerHTML = result


    }

    _generateAchievementCard(achievement) {
        let html = ` 
        <div class="card col-md-4" style="margin: 10px;">
        <img style="height: 190px; width: 190px;" class="card-img-top" src="${achievement.photo}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${achievement.name}</h5>
                                    <div class="social" style="text-align: center;">
                                    <a href="#" id="share-fb" class="sharer button"><i class="fa fa-3x fa-facebook-square"></i></a>
                                    <a href="#" id="share-tw" class="sharer button"><i class="fa fa-3x fa-twitter-square"></i></a>
                                    </div>
                                </div>
                                </div>
        `
        return html
    }



}