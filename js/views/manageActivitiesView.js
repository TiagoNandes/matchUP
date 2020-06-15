import ActivityController from '../controllers/activityController.js'

export default class ManageActivitiesView {
    constructor() {
        this.activitiesController = new ActivityController();

        this.activitiesList = document.querySelector("#listActivities")
        

        this.listActivities(this.activitiesController.getAllActivities());

           
    }

    bindAddRemoveActivity() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.activitiesController.removeActivity(event.target.id)
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
                                            <button id="${activity.id}" class="btn btn-primary" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${activity.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
                                            <button id="${activity.id}" class="btn btn-primary" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;">Bloquear</button>
                                        </td>
        `
        return html
    }
}