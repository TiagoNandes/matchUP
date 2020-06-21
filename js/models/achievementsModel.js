export default class AchievementsModel {
    constructor() {
        this.achievements = localStorage.achievements ? JSON.parse(localStorage.achievements) : [];
    }

    getAll() {
        return this.achievements;
    }

    create(name, photo) {
        const achievement = {
            id: this.achievements.length > 0 ? this.achievements[this.achievements.length - 1].id + 1 : 1,
            name: name,
            photo: photo
        }
        this.achievements.push(achievement);
        this._persist();
    }

    
    _persist() {
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
    }

    remove(id) {
        this.achievements = this.achievements.filter(achievement => achievement.id != id)
        this._persist()
    }

    edit(oldName, newName, photo) {
        let allAchievements = this.getAll();
        this.achievementToEdit = allAchievements.find(achievement => achievement.name === oldName);
        this.achievementToEdit.name = newName;
        this.achievementToEdit.photo = photo;
        localStorage.setItem('achievements', this.achievementToEdit);
        
        this._persist()
    }

}
