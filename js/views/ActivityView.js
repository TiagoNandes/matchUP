import ActivityController from '../controllers/ActivityController.js'

export default class ActivityView {

    constructor() {
        this.activityController = new ActivityController()

        // DOM References
        this.bandName = document.querySelector('#bandName')
        this.bandGenre = document.querySelector('#bandGenre')
        this.bandDescription = document.querySelector('#bandDescription')
        this.bandPhoto = document.querySelector('#bandPhoto')
        this.btnBack = document.querySelector("#btnBack")

        this.fillBandData()
        this.bindBackButton()
    }

    bindBackButton() {
        this.btnBack.addEventListener('click', () => {
            history.back();
        })
    }

    fillBandData() {
        const currentBand = this.bandController.getCurrentBand()
        this.bandName.innerHTML = currentBand.name
        this.bandGenre.innerHTML = currentBand.genre
        this.bandDescription.innerHTML = currentBand.description
        this.bandPhoto.src = currentBand.photo
    } 

}
