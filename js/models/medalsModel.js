export default class MedalsModel {
    constructor() {
        this.medals = localStorage.medals ? JSON.parse(localStorage.medals) : [];
    }

    getAll() {
        return this.medals;
    }

    create(name, photo, description) {
        const medal = {
            id: this.medals.length > 0 ? this.medals[this.medals.length - 1].id + 1 : 1,
            name: name,
            photo: photo,
            description: description

        }
        this.medals.push(medal);
        this._persist();
    }

    
    _persist() {
        localStorage.setItem('medals', JSON.stringify(this.medals));
    }

    remove(id) {
        this.medals = this.medals.filter(medal => medal.id != id)
        this._persist()
    }

}
