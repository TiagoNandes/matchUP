import ActivityController from '../controllers/activityController.js'
import CategoryController from '../controllers/categoriesController.js'
import UserController from '../controllers/UserController.js';
import RequestsController from '../controllers/requestsController.js';

export default class ManageActivitiesUserView {
    constructor() {
        this.userController = new UserController();
        this.activitiesController = new ActivityController();
        this.categoryController = new CategoryController()
        this.requestsController = new RequestsController()


        //render category input
        this.requestsList = document.querySelector("#requestsList")

        this.listRequests(this.requestsController.getAllRequests());


    }

    activitiesExist() {
            document.querySelector("#hideTable").className = `container invisible`
            document.querySelector("#showTable").className = `card shadow `
        
    }


    activitiesDontExist() {
            document.querySelector("#hideTable").className = `container `
            document.querySelector("#showTable").className = `card shadow invisible`
      
    }
    

    bindAcceptRequest() {

        for (const btnAccept of document.getElementsByClassName("accept")) {
            btnAccept.addEventListener('click', event => {
                //set activity's data on the placeholder 
                let requestId = event.target.id;
                let allRequests = this.requestsController.getAllRequests();
                this.requestToChange = allRequests.find(request => request.id == requestId);



                try {
                    this.requestsController.acceptRequest(this.requestToChange.id);
                    location.reload();



                } catch (e) {
                    Swal.fire({
                        title: 'Erro!',
                        text: e,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }


                this.listRequests(this.requestsController.getAllRequests());
            })
        }
    }

    bindDenyRequest() {

        for (const btnDeny of document.getElementsByClassName("deny")) {
            btnDeny.addEventListener('click', event => {
                //set activity's data on the placeholder 
                let requestId = event.target.id;
                let allRequests = this.requestsController.getAllRequests();
                this.requestToChange = allRequests.find(request => request.id == requestId);
                this.requestsController.denyRequest(this.requestToChange.id);
                location.reload();


                try {
                    this.requestsController.denyRequest(this.requestToChange.id);
                    location.reload();

                } catch (e) {
                    Swal.fire({
                        title: 'Erro!',
                        text: e,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }


                this.listRequests(this.requestsController.getAllRequests());
            })
        }
    }


    listRequests(requests = []) {

        let existsOne = false;

        let result = ''
        for (const request of requests) {
            
            if (request.state == "Pendente") {
                
                if (request.host == sessionStorage.getItem("loggedUser")) {
                    existsOne = true;
                    result += `<tr>`
                    result += this._generateRequestsTable(request)
                    result += `</tr>`
                }
            }
        }

        this.requestsList.innerHTML = result
        if (existsOne == true){
            this.activitiesExist();
            existsOne = false;
        }else{
            this.activitiesDontExist();
        }
        this.bindAcceptRequest()
        this.bindDenyRequest()


    }

    _generateRequestsTable(request) {
        let allActivities = this.activitiesController.getAllActivities();
        let currentActivity = allActivities.find(activity => activity.id == request.activityId);
        let allUsers = this.userController.getAllUsers();
        let currentUser = allUsers.find(user => user.id == request.userId);

        let html = `
                                        <td>${currentActivity.name}</td>
                                        <td>${currentActivity.date}</td>
                                        <td>${currentUser.username}</td>
                                        <td>${request.justification}</td>
                                        <td>
                                            <button id="${request.id}" class="btn btn-primary accept" type="button" style="margin-left: 5px;margin-bottom: 2px;">Aceitar</button>
                                            <button id="${request.id}" class="btn btn-danger deny" type="button" style="margin: 0px;padding-left: 12px;padding-right: 12px;margin-left: 5px;margin-right: 0px;margin-bottom: 2px;" >Recusar</button>
                                           
                                        </td>
        `

        return html
    }




}