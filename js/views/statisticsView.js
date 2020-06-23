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


        this.checkLogout();
    }


    showStatistics() {
        
       
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