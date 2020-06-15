import AchievementsController from '../controllers/achievementsController.js'

export default class ManageAchievementsView {
    constructor() {
        this.achievementsController = new AchievementsController();

        this.achievementsList = document.querySelector("#listAchievements")
        

        this.listAchievements(this.achievementsController.getAllAchievements());

           
    }

    bindAddRemoveAchievement() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.achievementsController.removeAchievement(event.target.id)
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

    }

    _generateAchievementsTable(achievement) {
        let html = ` 
                                        <td>${achievement.id}</td>
                                        <td>${achievement.name}</td>
                                        <td>
                                            <button id="${achievement.id}" class="btn btn-primary" type="button" style="margin-left: 5px;margin-bottom: 2px;">Editar</button>
                                            <button id="${achievement.id}" class="btn btn-primary remove" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Apagar</button>
                                            <button id="${achievement.id}" class="btn btn-primary" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;">Bloquear</button>
                                        </td>
        `
        return html
    }
}