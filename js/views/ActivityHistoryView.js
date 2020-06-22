import ActivityController from '../controllers/ActivityController.js'
import UserController from '../controllers/UserController.js'
import CategoryController from '../controllers/categoriesController.js'

export default class ActivityHistoryView {

    constructor() {
        this.activityController = new ActivityController()
        this.userController = new UserController()
        this.categoryController = new CategoryController()

        // Catalog
        this.catalog = document.querySelector("#activityHistory")
        this.btnFilter = document.querySelector("#btnFilter")
        //this.btnSort = document.querySelector("#btnSort")
        //this.btnAdd = document.querySelector("#btnAdd")
        this.txtActivity = document.querySelector("#txtActivity")

        this.renderCatalog(this.activityController.getActivities())
        this.bindAddFilterEvent()
        this.checkIfActivitiesExist();

        //render category input
        this.categoryInput = document.querySelector("#sltEditCategory")
        this.renderCategories(this.categoryController.getAllCategories())
    }

    bindAddFilterEvent() {
        this.btnFilter.addEventListener('click', () => {
            this.renderCatalog(this.activityController.getActivities(this.txtActivity.value, this.categoryInput.value))
        })
    }

    checkIfActivitiesExist() {
        let allActivities = this.activityController.getAllActivities();
        this.activityHost = allActivities.find(activity => activity.host == sessionStorage.getItem("loggedUser"))

        if (this.activityHost == undefined) {
            document.querySelector("#hideActivities").className = `container `
            document.querySelector("#showActivities").className = `filter invisible`
        } else {
            document.querySelector("#hideActivities").className = `container invisible`
            document.querySelector("#showActivities").className = `filter`
        }
    }

    // bindAddSortEvent() {
    //     this.btnSort.addEventListener('click', () => {
    //         this.renderCatalog(this.activityController.getActivities(this.txtActivity.value, this.sltCategory.value, true))
    //     })
    // }

    // bindAddAddEvent() {
    //     this.btnAdd.addEventListener('click', () => {
    //         location.href='html/addActivity.html';
    //     })
    // }

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

        let result = ''
        let i = 0
        for (const activity of activities) {
            if (activity.host == sessionStorage.getItem("loggedUser")) {
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

        this.catalog.innerHTML = result
        //this._renderAddActivityButton(this.userController.checkLoginStatus());

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