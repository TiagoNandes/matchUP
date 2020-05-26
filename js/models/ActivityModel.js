export default class ActivityModel {
    constructor() {
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
    }

    getAll() {
        return this.activities;
    }
    
    create(name, category, photo, latitude, longitude, date, hour, duration, minParticipants, maxParticipants) {
        const activity = {
            id: this.activities.length > 0 ? this.activities[this.activities.length - 1].id + 1 : 1,
            name: name,
            category: category,
            photo: photo,
            latitude: latitude,
            longitude: longitude,
            date: date,
            hour: hour,
            duration: duration,
            minParticipants: minParticipants,
            maxParticipants: maxParticipants,
        }
        this.activities.push(activity);
        this._persist();
    }

    sort() {
        this.activities.sort(this._compare);
        this._persist();
    }

    setCurrentActivity(id) {
        localStorage.setItem("activity", id); 
    }

    getCurrentActivity() {
        return this.activities.find(activity => activity.id === +localStorage.activity)
    }

    remove(name) {
        this.activities = this.activities.filter(activity => activity.name != name)
        this._persist()
    }
   
    _persist() {
        localStorage.setItem('activities', JSON.stringify(this.activities));
    }

    _compare(activityA, activityB) {
        if (activityA.name < activityB.name)
            return -1;
        if (activityA.name > activityB.name)
            return 1;
        return 0;
    }
}
