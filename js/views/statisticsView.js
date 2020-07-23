import ActivityController from '../controllers/activityController.js'
import CategoryController from '../controllers/categoriesController.js'
import UserController from '../controllers/UserController.js'
import RequestsController from '../controllers/requestsController.js';


export default class StatisticsView {
    constructor() {
        this.userController = new UserController();
        this.activitiesController = new ActivityController();
        this.categoryController = new CategoryController();

        this.userList = document.querySelector("#listUsers")
        this.requestsController = new RequestsController()



        // DOM References
        this.partBiking = document.querySelector('#partBiking')
        this.partCorrida = document.querySelector('#partCorrida')
        this.partDanca = document.querySelector('#partDanca')
        this.partYoga = document.querySelector('#partYoga')
        this.firstGraph = document.querySelector('#firstGraph')
        this.secondGraph = document.querySelector('#secondGraph')
        this.thirdGraph = document.querySelector('#thirdGraph')



        this.showStatistics();
        this.returnUsers();

        this.checkLogout();
    }


    showStatistics() {

        let allRequests = this.requestsController.getAllRequests();


        //----------------------BIKING --------------------------------

        this.activitiesParticipatedBiking = allRequests.filter(request => request.activityCategory == "Biking")

        let countBiking = 0;

        for (const act of this.activitiesParticipatedBiking) {
            countBiking++;
        }

        this.partBiking.innerHTML = countBiking;

        //----------------------CORRIDA --------------------------------

        this.activitiesParticipatedCorrida = allRequests.filter(request => request.activityCategory == "Corrida")

        let countCorrida = 0;

        for (const act of this.activitiesParticipatedCorrida) {
            countCorrida++;
        }

        this.partCorrida.innerHTML = countCorrida;

        //----------------------DANCA --------------------------------

        this.activitiesParticipatedDanca = allRequests.filter(request => request.activityCategory == "Dança")

        let countDanca = 0;

        for (const act of this.activitiesParticipatedDanca) {
            countDanca++;
        }

        this.partDanca.innerHTML = countDanca;

        //----------------------YOGA --------------------------------

        this.activitiesParticipatedYoga = allRequests.filter(request => request.activityCategory == "Yoga")

        let countYoga = 0;

        for (const act of this.activitiesParticipatedYoga) {
            countYoga++;
        }

        this.partYoga.innerHTML = countYoga;


        //----------------------Atividades mais aderidas  --------------------------------


        let html = ` 
        <div class="chart-area"><canvas
                                            data-bs-chart="{&quot;type&quot;:&quot;doughnut&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;Yoga&quot;,&quot;Biking&quot;,&quot;Dança&quot;,&quot;Corrida&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;&quot;,&quot;backgroundColor&quot;:[&quot;#4e73df&quot;,&quot;#1cc88a&quot;,&quot;#36b9cc&quot;,&quot;#FF0000&quot;],&quot;borderColor&quot;:[&quot;#ffffff&quot;,&quot;#ffffff&quot;,&quot;#ffffff&quot;],&quot;data&quot;:
                                                [&quot;${countYoga}&quot;,&quot;${countBiking}&quot;,&quot;${countDanca}&quot;,&quot;${countCorrida}&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{}}}"></canvas>
                                    </div>
                                    <div class="text-center small mt-4"><span class="mr-2"><i
                                                class="fas fa-circle text-primary"></i>&nbsp;Yoga</span><span
                                            class="mr-2"><i
                                                class="fas fa-circle text-success"></i>&nbsp;Biking</span><span
                                            class="mr-2"><i class="fas fa-circle text-info"></i>&nbsp;Dança</span><span
                                            class="mr-2"><i class="fas fa-circle text-danger"></i>&nbsp;Corrida</span></div>
        `


        this.firstGraph.innerHTML = html


    }

    //----------------------Utilizadores com mais adesões  --------------------------------

    returnUsers() {

        let allRequests = this.requestsController.getAllRequests();


        this.acceptedRequests = allRequests.filter(request => request.state == "Aceite")

        this.allUsers = this.userController.getAllUsers();

        var mostPopular = [];

        for (let user in this.allUsers) {
            this.userRequest = this.acceptedRequests.filter(request => request.userId == this.allUsers[user].id)

            mostPopular.push({
                id: this.allUsers[user].id,
                requests: this.userRequest.length
            });
        }


        let newA = mostPopular.sort(sortFunction);

        function sortFunction(mostPopular, b) {
            if (mostPopular.requests === b.requests) {
                return 0;
            } else {
                return (mostPopular.requests < b.requests) ? -1 : 1;
            }
        }

        let val1;
        let val2;
        let val3;
        let participation1;
        let participation2;
        let participation3;

        if(newA.length = 3){
            val1 = this.userController.getAllUsers().find(user => user.id == newA[newA.length-1].id).username;
            val2 = this.userController.getAllUsers().find(user => user.id == newA[newA.length-2].id).username;
            val3 = this.userController.getAllUsers().find(user => user.id == newA[newA.length-3].id).username;
            participation1 = newA[newA.length-1].requests;
            participation2 = newA[newA.length-2].requests;
            participation3 = newA[newA.length-3].requests;
        }


        let html2 = ` 
        <div class="chart-area"><canvas
                                            data-bs-chart="{&quot;type&quot;:&quot;doughnut&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;Yoga&quot;,&quot;Biking&quot;,&quot;Dança&quot;,&quot;Corrida&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;&quot;,&quot;backgroundColor&quot;:[&quot;#4e73df&quot;,&quot;#1cc88a&quot;,&quot;#36b9cc&quot;,&quot;#FF0000&quot;],&quot;borderColor&quot;:[&quot;#ffffff&quot;,&quot;#ffffff&quot;],&quot;data&quot;:
                                                [&quot;${participation1}&quot;,&quot;${participation2}&quot;,&quot;${participation3}&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{}}}"></canvas>
                                    </div>
                                    <div class="text-center small mt-4"><span class="mr-2"><i
                                                class="fas fa-circle text-primary"></i>&nbsp;${val1}</span><span
                                            class="mr-2"><i
                                                class="fas fa-circle text-success"></i>&nbsp;${val2}</span><span
                                            class="mr-2"><i class="fas fa-circle text-info"></i>&nbsp;${val3}</span></div>
        `


        this.secondGraph.innerHTML = html2




    }



    checkLogout() {

        // Mapeamento dos cliques nos botões de Login/Register/Logout
        if (sessionStorage.getItem("loggedUser")) {
            // Apresentação do nome do utilizador autenticado
            document.querySelector("#loggedUser").innerHTML = `${sessionStorage.getItem("loggedUser")}`
            document.querySelector("#loggedUserPhoto").src = `${sessionStorage.getItem("loggedUserPhoto")}`
            // Clique no botão de logout
            document.querySelector("#btnLogout").addEventListener("click", function () {
                sessionStorage.removeItem('loggedUser');
                sessionStorage.removeItem('loggedUserId');
                sessionStorage.removeItem('loggedUserPhoto');
                sessionStorage.removeItem('loggedUserType');
                //this.userController.logoutUser();

                location.href = "../index.html";

            })
        }

    }
}