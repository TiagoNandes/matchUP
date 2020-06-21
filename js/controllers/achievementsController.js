import AchievementsModel from '../models/AchievementsModel.js'

export default class AchievementsController {
    constructor() {
        this.achievementsModel = new AchievementsModel();
    }

    createAchievement(name, photo) {
        if (!this.achievementsModel.getAll().some(achievement => achievement.name === name)) {
           
            this.achievementsModel.create(name, photo);

        } else {
            throw Error(`Conquista "${name}" já existe!`);
        }
    }

    getAllAchievements(){
        this.achievementsModel.getAll();
        return this.achievementsModel.getAll()
    }

    //remove category
    removeAchievement(id) {
        this.achievementsModel.remove(id)
        
    }

    editAchievement(oldName, newName, photo) {
        this.achievementsModel.edit(oldName, newName, photo)
    }
}
