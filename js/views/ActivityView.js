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
        this.activityDate = document.querySelector('#activityDate')
        this.activityHour = document.querySelector('#activityHour')
        this.activityMinParticipants = document.querySelector('#activityMinParticipants')
        this.activityLatitude = document.querySelector('#activityLatitude')
        this.activityLongitude = document.querySelector('#activityLongitude')
        this.activityDuration = document.querySelector('#activityDuration')
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
        this.activityName.innerHTML = currentActivity.name
        this.activityCategory.innerHTML = "Categoria: " + currentActivity.category 
        this.activityDescription.innerHTML = currentActivity.description
        this.activityAddress.innerHTML = currentActivity.address
        this.activityPhoto.src = currentActivity.photo
        // this.activityLatitude.innerHTML = currentActivity.latitude
        // this.activityLongitude.innerHTML = currentActivity.longitude
        this.activityDate.innerHTML = "Data: " + currentActivity.date
        this.activityHour.innerHTML = " às " + currentActivity.hour + " horas"
        // this.activityDuration.innerHTML = currentActivity.duration
        this.activityMinParticipants.innerHTML = "Vagas: " + currentActivity.minParticipants
        // this.activityMaxParticipants.innerHTML = currentActivity.maxParticipants
    } 

}
