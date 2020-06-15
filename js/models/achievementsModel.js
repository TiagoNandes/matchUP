export default class AchievementsModel {
    constructor() {
        this.achievements = localStorage.achievements ? JSON.parse(localStorage.achievements) : [];
    }

    getAll() {
        return this.achievements;
    }

    create(name) {
        const category = {
            id: this.achievements.length > 0 ? this.achievements[this.achievements.length - 1].id + 1 : 1,
            name: name
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

}
