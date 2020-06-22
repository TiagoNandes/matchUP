import ActivityController from '../controllers/ActivityController.js'
import RequestsController from '../controllers/requestsController.js'

export default class ActivityView {


    constructor() {
        this.activityController = new ActivityController()
        this.requestsController = new RequestsController()

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
        this.activityHost = document.querySelector('#activityHost')
        this.btnBack = document.querySelector("#btnBack")

        //add request


        this.addRequestForm = document.querySelector("#addRequestForm")
        this.txtJustification = document.querySelector("#txtJustification")
        this.btnAdd = document.querySelector("#btnAddRequest")


        this.fillActivityData();
        this.addRequest();
        this.hideInputFields();
    }

    // bindBackButton() {
    //     this.btnBack.addEventListener('click', () => {
    //         history.back();
    //     })
    // }

    //TODO Mudar texto conforme status do request
    //Hide input fields and text based on request state and host 
    hideInputFields() {
        const currentActivity = this.activityController.getCurrentActivity()
        const allRequests = this.requestsController.getAllRequests();
        let currentRequest = allRequests.find(request => request.userId == sessionStorage.getItem('loggedUserId'))

        //User is host
        if (allRequests.find(request => request.host == sessionStorage.getItem('loggedUser')) && allRequests.find(request => request.activityId == currentActivity.id)) {
            document.querySelector("#addRequestForm").className = `invisible`
            document.querySelector("#acceptedText").className = `text-success invisible`
        }
        //User already asked to join and got denied
        else if (allRequests.find(request => request.userId == sessionStorage.getItem('loggedUserId')) && allRequests.find(request => request.activityId == currentActivity.id) && currentRequest.state == "Recusado") {

            document.querySelector("#addRequestForm").className = `invisible`
            document.querySelector("#acceptedText").className = `text-danger`
            document.querySelector("#acceptedText").innerHTML = `Pedido Recusado`
        }
        //User already asked to join and got accepted
        else if (allRequests.find(request => request.userId == sessionStorage.getItem('loggedUserId')) && allRequests.find(request => request.activityId == currentActivity.id) && currentRequest.state == "Pendente") {
            document.querySelector("#addRequestForm").className = `invisible`
            document.querySelector("#acceptedText").className = `text-info`
            document.querySelector("#acceptedText").innerHTML = `Pedido de adesão enviado!`
        }
        //User got accepted
        else if (allRequests.find(request => request.userId == sessionStorage.getItem('loggedUserId')) && allRequests.find(request => request.activityId == currentActivity.id) && currentRequest.state == "Aceite") {
            document.querySelector("#addRequestForm").className = `invisible`
            document.querySelector("#acceptedText").className = `text-success`
            document.querySelector("#acceptedText").innerHTML = `Está inscrito! Divirta-se!`
        }
        //user has not asked to join
        else {
            document.querySelector("#addRequestForm").className = `visible`
            document.querySelector("#acceptedText").className = `text-success invisible`
        }
    }

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
        this.activityHost.innerHTML = "Anfitrião: " + currentActivity.host
        // this.activityMaxParticipants.innerHTML = currentActivity.maxParticipants
    }

    addRequest() {
        this.addRequestForm.addEventListener('submit', event => {
            event.preventDefault();

            const currentActivity = this.activityController.getCurrentActivity();
            //userId, host, activityId, justification, state
            this.requestsController.addRequest(
                sessionStorage.getItem('loggedUserId'),
                currentActivity.host,
                currentActivity.id,
                this.txtJustification.value,
                "Pendente"
            )
            location.reload();



        })



    }
}