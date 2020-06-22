import RequestModel from '../models/requestsModel.js'

export default class RequestController {
    constructor() {
        this.requestModel = new RequestModel()
    }

    getAllRequests(){
        this.requestModel.getAll();
        return this.requestModel.getAll()
    }

    //Add new request 
    addRequest(userId, host, activityId, justification, state) {
        alert("TOU AQUI")
        if (!this.requestModel.getAll().some(request => request.userId == userId) || !this.requestModel.getAll().some(request => request.activityId == activityId)) {
            this.requestModel.create(userId, host, activityId, justification, state);
        } else {
            throw Error(`Já fez uma inscrição neste evento!`);
        }
    }

    acceptRequest(id) {
        this.requestModel.accept(id)
    }

    denyRequest(id) {
        this.requestModel.deny(id)
    }
}
