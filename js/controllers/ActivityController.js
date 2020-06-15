import ActivityModel from '../models/ActivityModel.js'

export default class ActivityController {
    constructor() {
        this.activityModel = new ActivityModel()
    }

    getAllActivities(){
        this.activityModel.getAll();
        return this.activityModel.getAll()
    }

    //Add new activity 
    addActivity(name, category, description, address, photo, latitude, longitude, date, hour, duration, minParticipants, maxParticipants, host) {
        
        if (!this.activityModel.getAll().some(activity => activity.name === name)) {
            this.activityModel.create(
                name, category, description, address, photo, latitude, longitude, date, hour, duration, minParticipants, maxParticipants, host
            );
        } else {
            throw Error(`Activity with name "${name}" already exists!`);
        }
    }

    //remove activity
    removeActivity(id) {
        this.activityModel.remove(id)
        
    }

    

    //working
    setCurrentActivity(id) {
        this.activityModel.setCurrentActivity(id)
    }

    getCurrentActivity() {
        return this.activityModel.getCurrentActivity()
    }


    getActivities(filterName='', filterCategory='', isSorted=false) {

        if (isSorted) {
            this.activityModel.sort()
        }

        const activities = this.activityModel.getAll()
        
        if (filterName==='' && filterCategory==='') {
            return activities
        }

        let filteredActivities = []

        for (const activity of activities) {
            let filterActivityName = false, filterActivityCategory = false

            if((activity.name.includes(filterName) && filterName!='') || filterName==='') {
                filterActivityName = true
            }

            if((activity.category===filterCategory && filterCategory!='') || filterCategory==='') {
                filterActivityCategory = true
            }

            // Alimentar filteredActivities
            if(filterActivityName && filterActivityCategory) {
                filteredActivities.push(activity)
            }
        }

        return filteredActivities
    }
}
