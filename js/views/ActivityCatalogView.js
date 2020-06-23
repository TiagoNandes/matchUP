import ActivityController from '../controllers/ActivityController.js'
import UserController from '../controllers/UserController.js'
import CategoryController from '../controllers/categoriesController.js'

export default class ActivityView {

    constructor() {
        this.activityController = new ActivityController()
        this.userController = new UserController()
        this.categoryController = new CategoryController()

        // Catalog
        this.catalog = document.querySelector("#myCatalog")
        this.btnFilter = document.querySelector("#btnFilter")
        this.txtActivity = document.querySelector("#txtActivity")
        this.sltCategory = document.querySelector("#sltCategory")

        this.categoryInput = document.querySelector("#sltCategory")

        this.renderCatalog(this.activityController.getActivities())
        this.renderCategories(this.categoryController.getAllCategories())
        this.bindAddFilterEvent()
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

    renderCatalog(activities = []) {

        let result = ''
        let i = 0
        for (const activity of activities) {
            if (i % 3 === 0) {
                result += `<div class="row articles">`
            }
            result += this._generateActivityCard(activity)
            i++
            if (i % 3 === 0) {
                result += `</div>`
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

        this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    _generateCategorySelect(category) {
        let html = ` 
        
        <option value="${category.name}">${category.name}</option>

        `
        return html
    }

}