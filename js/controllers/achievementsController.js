import AchievementsModel from '../models/AchievementsModel.js'

export default class AchievementsController {
    constructor() {
        this.achievementsModel = new AchievementsModel();
    }

    createAchievement(name) {
        if (!this.achievementsModel.getAll().some(achievement => achievement.name === name)) {
           
            this.achievementsModel.create(name);

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
}
