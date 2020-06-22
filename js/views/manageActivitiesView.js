import ActivityController from '../controllers/activityController.js'
import CategoryController from '../controllers/categoriesController.js'

export default class ManageActivitiesView {
    constructor() {
        this.activitiesController = new ActivityController();
        this.categoryController = new CategoryController()
        this.activitiesList = document.querySelector("#listActivities")

        //edit
        this.editActivityForm = document.getElementById('frmEditActivityUser');
        this.txtEditName = document.getElementById('txtEditName');
        this.sltEditCategory = document.getElementById('sltEditCategory');
        this.txtEditDescription = document.getElementById('txtEditDescription');
        this.txtEditAddress = document.getElementById('txtEditAddress');
        this.txtEditPhoto = document.getElementById('txtEditPhoto');
        this.txtEditLatitude = document.getElementById('txtEditLatitude');
        this.txtEditLongitude = document.getElementById('txtEditLongitude');
        this.sltEditDay = document.getElementById('sltEditDay');
        this.sltEditHour = document.getElementById('sltEditHour');
        this.txtEditDuration = document.getElementById('txtEditDuration');
        this.txtEditMinParticipants = document.getElementById('txtEditMinParticipants');
        this.txtEditMaxParticipants = document.getElementById('txtEditMaxParticipants');

        this.listActivities(this.activitiesController.getAllActivities());
        this.renderCategories(this.categoryController.getAllCategories())

        this.checkLogout();

    }

    bindAddRemoveActivity() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.activitiesController.removeActivity(event.target.id)
                this.listActivities(this.activitiesController.getAllActivities());
            })
        }
    }

    bindEditActivity() {

        for (const btnEdit of document.getElementsByClassName("edit")) {
            btnEdit.addEventListener('click', event => {
                //set activity's data on the placeholder 
                let activityToEditId = event.target.id;
                let allActivities = this.activitiesController.getAllActivities();
                this.activityToEdit = allActivities.find(activity => activity.id == activityToEditId);
                this.txtEditName.placeholder = this.activityToEdit.name;
                this.sltEditCategory.value = this.activityToEdit.category;
                this.txtEditDescription.placeholder = this.activityToEdit.description;
                this.txtEditAddress.placeholder = this.activityToEdit.address;
                this.txtEditPhoto.placeholder = this.activityToEdit.photo;
                this.txtEditLatitude.placeholder = this.activityToEdit.latitude;
                this.txtEditLongitude.placeholder = this.activityToEdit.longitude;
                this.sltEditDay.value = this.activityToEdit.date;
                this.sltEditHour.value = this.activityToEdit.hour;
                this.txtEditDuration.placeholder = this.activityToEdit.duration;
                this.txtEditMinParticipants.placeholder = this.activityToEdit.minParticipants;
                this.txtEditMaxParticipants.placeholder = this.activityToEdit.maxParticipants;

                //form
                this.editActivityForm.addEventListener('submit', event => {
                    event.preventDefault();



                    //if input is not empty 
                    if (this.txtEditName.value != "") {
                        this.newName = this.txtEditName.value
                    }
                    //if input is not used 
                    else {
                        this.newName = this.activityToEdit.name
                    }

                    this.newCategory = this.sltEditCategory.value

                    //if input is not empty 
                    if (this.txtEditDescription.value != "") {
                        this.newDescription = this.txtEditDescription.value
                    }
                    //if input is not used 
                    else {
                        this.newDescription = this.activityToEdit.description
                    }

                    //if input is not empty 
                    if (this.txtEditAddress.value != "") {
                        this.newAddress = this.txtEditAddress.value
                    }
                    //if input is not used 
                    else {
                        this.newAddress = this.activityToEdit.address
                    }

                    //if input is not empty 
                    if (this.txtEditPhoto.value != "") {
                        this.newPhoto = this.txtEditPhoto.value
                    }
                    //if input is not used 
                    else {
                        this.newPhoto = this.activityToEdit.photo
                    }

                    //if input is not empty 
                    if (this.txtEditLatitude.value != "") {
                        this.newLatitude = this.txtEditLatitude.value
                    }
                    //if input is not used 
                    else {
                        this.newLatitude = this.activityToEdit.latitude
                    }

                    //if input is not empty 
                    if (this.txtEditLongitude.value != "") {
                        this.newLongitude = this.txtEditLongitude.value
                    }
                    //if input is not used 
                    else {
                        this.newLongitude = this.activityToEdit.longitude
                    }


                    this.newDay = this.sltEditDay.value


                    this.newHour = this.sltEditHour.value


                    //if input is not empty 
                    if (this.txtEditDuration.value != "") {
                        this.newDuration = this.txtEditDuration.value
                    }
                    //if input is not used 
                    else {
                        this.newDuration = this.activityToEdit.duration
                    }

                    //if input is not empty 
                    if (this.txtEditMinParticipants.value != "") {
                        this.newMinParticipants = this.txtEditMinParticipants.value
                    }
                    //if input is not used 
                    else {
                        this.newMinParticipants = this.activityToEdit.minParticipants
                    }

                    //if input is not empty 
                    if (this.txtEditMaxParticipants.value != "") {
                        this.newMaxParticipants = this.txtEditMaxParticipants.value
                    }
                    //if input is not used 
                    else {
                        this.newMaxParticipants = this.activityToEdit.maxParticipants
                    }


                    try {
                        this.activitiesController.editActivity(activityToEditId, this.newName, this.newCategory, this.newDescription, this.newAddress, this.newPhoto,
                            this.newLatitude, this.newLongitude, this.newDay, this.newHour, this.newDuration, this.newMinParticipants, this.newMaxParticipants);

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

                this.listActivities(this.activitiesController.getAllActivities());
            })
        }
    }


    listActivities(activities = []) {

        let result = ''
        let i = 0
        for (const activity of activities) {
            result += `<tr>`
            result += this._generateActivitiesTable(activity)
            i++
            result += `</tr>`
        }

        this.activitiesList.innerHTML = result
        //this._renderAddActivityButton(this.userController.checkLoginStatus());

        this.bindAddRemoveActivity();
        this.bindEditActivity();
    }


    _generateActivitiesTable(activity) {
        let html = ` <td><img class="rounded-circle mr-2" width="30" height="30" src="${activity.photo}" "></td> 
                                        <td>${activity.id}</td>
                                        <td>${activity.name}</td>
                                        <td>${activity.category}</td>
                                        <td>${activity.description}</td>
                                        <td>${activity.address}</td>
                                        <td>${activity.latitude}</td>
                                        <td>${activity.longitude}</td>
                                        <td>${activity.date}</td>
                                        <td>${activity.hour}</td>
                                        <td>${activity.duration}</td>
                                        <td>${activity.minParticipants}</td>
                                        <td>${activity.maxParticipants}</td>
                                        <td>${activity.host}</td>
                                        <td>
                                            <button id="${activity.id}" data-toggle="modal"
                                            data-target="#editActivityModal" class="btn btn-primary edit" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${activity.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
                                           
                                        </td>
        `
        return html
    }

    renderCategories(categories = []) {

        let result = ''
        let i = 0
        for (const category of categories) {

            result += this._generateCategorySelect(category)
            i++
        }

        this.sltEditCategory.innerHTML = result

        
    }

    _generateCategorySelect(category) {
        let html = ` 
        
        <option value="${category.name}">${category.name}</option>

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