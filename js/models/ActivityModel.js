export default class ActivityModel {
    constructor() {
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
    }

    getAll() {
        return this.activities;
    }
    
    create(name, category, description, address, photo, latitude, longitude, date, hour, duration, minParticipants, maxParticipants, host) {
        const activity = {
            id: this.activities.length > 0 ? this.activities[this.activities.length - 1].id + 1 : 1,
            name: name,
            category: category,
            description: description,
            address: address,
            photo: photo,
            latitude: latitude,
            longitude: longitude,
            date: date,
            hour: hour,
            duration: duration,
            minParticipants: minParticipants,
            maxParticipants: maxParticipants,
            host: host

        }
        this.activities.push(activity);
        this._persist();
    }

    edit(activityToEditId, newName, newCategory, newDescription, newAddress, newPhoto,
        newLatitude, newLongitude, newDay, newHour, newDuration, newMinParticipants, newMaxParticipants) {
        let allActivities = this.getAll();
        this.activityToEdit = allActivities.find(activity => activity.id == activityToEditId);
        this.activityToEdit.name = newName;
        this.activityToEdit.category = newCategory;
        this.activityToEdit.description = newDescription;
        this.activityToEdit.address = newAddress;
        this.activityToEdit.photo = newPhoto;
        this.activityToEdit.latitude = newLatitude;
        this.activityToEdit.longitude = newLongitude;
        this.activityToEdit.date = newDay;
        this.activityToEdit.hour = newHour;
        this.activityToEdit.duration = newDuration;
        this.activityToEdit.minParticipants = newMinParticipants;
        this.activityToEdit.maxParticipants = newMaxParticipants;
        localStorage.setItem('activities', this.activityToEdit);

        
        this._persist()
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

    remove(id) {
        this.activities = this.activities.filter(activity => activity.id != id)
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
