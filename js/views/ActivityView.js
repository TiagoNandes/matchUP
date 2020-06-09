import ActivityController from '../controllers/ActivityController.js'

export default class ActivityView {

    
    constructor() {
        this.activityController = new ActivityController()

        // DOM References
        this.activityName = document.querySelector('#activityName')
        this.activityCategory = document.querySelector('#activityCategory')
        this.activityDescription = document.querySelector('#activityDescription')
        this.activityAddress = document.querySelector('#activityAddress')
        this.activityPhoto = document.querySelector('#activityPhoto')
        this.activityLatitude = document.querySelector('#activityLatitude')
        this.activityLongitude = document.querySelector('#activityLongitude')
        this.activityDate = document.querySelector('#activityDate')
        this.activityHour = document.querySelector('#activityHour')
        this.activityDuration = document.querySelector('#activityDuration')
        this.activityMinParticipants = document.querySelector('#activityMinParticipants')
        this.activityMaxParticipants = document.querySelector('#activityMaxParticipants')
        this.btnBack = document.querySelector("#btnBack")

        
        
        this.fillActivityData()
        //this.bindBackButton()
    }

    // bindBackButton() {
    //     this.btnBack.addEventListener('click', () => {
    //         history.back();
    //     })
    // }

    fillActivityData() {
        
        const currentActivity = this.activityController.getCurrentActivity()
        alert("current activity: " + this.activityController.getCurrentActivity())
        this.activityName.innerHTML = currentActivity.name
        this.activityCategory.innerHTML = currentActivity.category
        this.activityDescription.innerHTML = currentActivity.description
        this.activityAddress.innerHTML = currentActivity.address
        this.activityPhoto.src = currentActivity.photo
        this.activityLatitude.innerHTML = currentActivity.latitude
        this.activityLongitude.innerHTML = currentActivity.longitude
        this.activityDate.innerHTML = currentActivity.date
        this.activityHour.innerHTML = currentActivity.hour
        this.activityDuration.innerHTML = currentActivity.duration
        this.activityMinParticipants.innerHTML = currentActivity.minParticipants
        this.activityMaxParticipants.innerHTML = currentActivity.maxParticipants
    } 

}
