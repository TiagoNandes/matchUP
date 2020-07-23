export default class RequestModel {
    constructor() {
        this.requests = localStorage.requests ? JSON.parse(localStorage.requests) : [];
    }

    getAll() {
        return this.requests;
    }
    
    create(userId, host, activityId, justification, state) {
        const request = {
            id: this.requests.length > 0 ? this.requests[this.requests.length - 1].id + 1 : 1,
            userId: userId,
            host: host,
            activityId: activityId,
            justification: justification,
            state: state

        }
        this.requests.push(request);
        this._persist();
    }

    accept(id) {
        let allRequests = this.getAll();
        this.requestToAccept = allRequests.find(request => request.id == id);
        
        let state = "Aceite";
        this.requestToAccept.state = state;
        localStorage.setItem('requests', this.requestToAccept);
        
        this._persist()
    }

    deny(id) {
        let allRequests = this.getAll();
        this.requestToDeny = allRequests.find(request => request.id == id);
        let state = "Recusado";
        this.requestToDeny.state = state;
        localStorage.setItem('requests', this.requestToAccept);
        
        this._persist()
    }


    sort() {
        this.activities.sort(this._compare);
        this._persist();
    }
   
    _persist() {
        localStorage.setItem('requests', JSON.stringify(this.requests));
    }

    _compare(activityA, activityB) {
        if (activityA.name < activityB.name)
            return -1;
        if (activityA.name > activityB.name)
            return 1;
        return 0;
    }
}
