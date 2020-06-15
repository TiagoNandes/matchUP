import MedalsController from '../controllers/medalsController.js'

export default class ManageAchievementsView {
    constructor() {
        this.medalsController = new MedalsController();

        this.medalsList = document.querySelector("#listMedals")
        

        this.listMedals(this.medalsController.getAllMedals());

           
    }

    bindAddRemoveMedal() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.medalsController.removeMedal(event.target.id)
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
        //this._renderAddActivityButton(this.userController.checkLoginStatus());

        this.bindAddRemoveMedal();

    }

    _generateMedalsTable(medal) {
        let html = ` <td><img class="rounded-circle mr-2" width="30" height="30" src="${medal.photo}" "></td> 
                                        <td>${medal.id}</td>
                                        <td>${medal.id}</td>
                                        <td>${medal.name}</td>
                                        <td>${medal.description}</td>
                                        <td>
                                            <button id="${medal.id}" class="btn btn-primary" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${medal.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
                                            <button id="${medal.id}" class="btn btn-primary" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;">Bloquear</button>
                                        </td>
        `
        return html
    }
}