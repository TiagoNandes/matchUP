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
        this.bindBackButton()
    }

    bindBackButton() {
        this.btnBack.addEventListener('click', () => {
            history.back();
        })
    }

    fillActivityData() {
        const currentActivity = this.activityController.getCurrentActivity()
        this.activityName.innerHTML = currentActivity.name
        this.activityCategory.innerHTML = currentActivity.category
        this.activityDescription.innerHTML = currentActivity.description
        this.activityAddress.src = currentActivity.address
        this.activityPhoto.src = currentActivity.photo
        this.activityLatitude.src = currentActivity.latitude
        this.activityLongitude.src = currentActivity.longitude
        this.activityDate.src = currentActivity.date
        this.activityHour.src = currentActivity.hour
        this.activityDuration.src = currentActivity.duration
        this.activityMinParticipants.src = currentActivity.minParticipants
        this.activityMaxParticipants.src = currentActivity.maxParticipants
    } 

}
