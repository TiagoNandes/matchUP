import MedalsModel from '../models/medalsModel.js'

export default class AchievementsController {
    constructor() {
        this.medalsModel = new MedalsModel();
    }

    createMedal(name, photo, description) {
        if (!this.medalsModel.getAll().some(medal => medal.name === name)) {
           
            this.medalsModel.create(name, photo, description);

        } else {
            throw Error(`Medalha "${name}" já existe!`);
        }
    }

    getAllMedals(){
        this.medalsModel.getAll();
        return this.medalsModel.getAll()
    }

    //remove medal
    removeMedal(id) {
        this.medalsModel.remove(id)
        
    }
}
