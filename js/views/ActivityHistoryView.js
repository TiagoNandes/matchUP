import ActivityController from '../controllers/ActivityController.js'
import UserController from '../controllers/UserController.js'
import CategoryController from '../controllers/categoriesController.js'
import RequestsController from '../controllers/requestsController.js';

export default class ActivityHistoryView {

    constructor() {
        this.activityController = new ActivityController()
        this.userController = new UserController()
        this.categoryController = new CategoryController()
        this.requestsController = new RequestsController()

        // Catalog
        this.catalog = document.querySelector("#activityHistory")
        this.btnFilter = document.querySelector("#btnFilter")
        this.txtActivity = document.querySelector("#txtActivity")

        this.renderCatalog(this.activityController.getActivities())
        this.bindAddFilterEvent()

        //render category input
        this.categoryInput = document.querySelector("#sltEditCategory")
        this.renderCategories(this.categoryController.getAllCategories())
    }

    bindAddFilterEvent() {
        this.btnFilter.addEventListener('click', () => {
            this.renderCatalog(this.activityController.getActivities(this.txtActivity.value, this.categoryInput.value))
        })
    }

    activitiesExist() {
        // let allActivities = this.activityController.getAllActivities();
        // this.activityHost = allActivities.find(activity => activity.host == sessionStorage.getItem("loggedUser"))

        // if (this.activityHost == undefined) {
        // document.querySelector("#hideActivities").className = `container `
        // document.querySelector("#showActivities").className = `filter invisible`
        // } else {
        document.querySelector("#hideActivities").className = `container invisible`
        document.querySelector("#showActivities").className = `filter`
        // }
    }

    activitiesDontExist() {
        // let allActivities = this.activityController.getAllActivities();
        // this.activityHost = allActivities.find(activity => activity.host == sessionStorage.getItem("loggedUser"))

        // if (this.activityHost == undefined) {
        document.querySelector("#hideActivities").className = `container `
        document.querySelector("#showActivities").className = `filter invisible`
        // } else {
        //     document.querySelector("#hideActivities").className = `container invisible`
        //     document.querySelector("#showActivities").className = `filter`
        // }
    }


    bindAddRemoveEvent() {
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
                        this.bandController.removeBand(event.target.id)
                        this.renderCatalog(this.bandController.getBands(this.txtBand.value, this.sltGenre.value))
                        Swal.fire(
                            'Apagado!',
                            'Atividade desbloqueada com sucesso.',
                            'success'
                        )
                    }
                })

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

    renderCatalog(activities = []) {
        let allRequests = this.requestsController.getAllRequests();

        let result = ''
        let i = 0


        this.activitiesParticipated = allRequests.filter(request => request.userId == sessionStorage.getItem("loggedUserId") && request.state == "Aceite")



        for (const activity of activities) {
            for (let act in this.activitiesParticipated) {
                if (this.activitiesParticipated[act].activityId == activity.id) {
                    if (i % 3 === 0) {
                        result += `<div class="row articles">`
                    }
                    result += this._generateActivityCard(activity)
                    i++
                    if (i % 3 === 0) {
                        result += `</div>`
                    }
                }
            }
        }



        this.catalog.innerHTML = result

        this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    _generateActivityCard(activity) {
        let html = ` 
        
        <div class="col-sm-6 col-md-4 item"><a href="#"><img style="height: 400px; width: 400px;" class="img-fluid see" id="${activity.id}"
                            src="${activity.photo}"></a>
                    <h3 class="name">${activity.name}</h3>
                    <p class="description">${activity.category}</p>
                    <p class="description">${activity.address}</p>
                    <p class="description">${activity.date} às ${activity.hour} horas!<br></p><br>
                    <button id="${activity.id}" class="btn btn-primary see">Ver mais</button>
                </div>
        `
        return html
    }

    renderCategories(categories = []) {

        let result = ''
        let i = 0
        result += `<option value="">Categoria...</option>`
        for (const category of categories) {

            result += this._generateCategorySelect(category)
            i++


        }

        this.categoryInput.innerHTML = result


    }

    _generateCategorySelect(category) {
        let html = ` 
        
        <option value="${category.name}">${category.name}</option>

        `
        return html
    }
}