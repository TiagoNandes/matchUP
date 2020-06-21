import UserController from '../controllers/UserController.js'

export default class NavbarView {

    constructor() {
        this.userController = new UserController()

        this.updateNavbar()
        //this.NavBarMap()

    }



    /**
     * Função para atualizar a barra de navageação tendo em conta se existe (ou não) algum utilizador autenticado
     */
    updateNavbar() {
        const nav = document.querySelector("#navBar")
        let result = ""
        result =
            `
        <div class="container"><a class="navbar-brand" href="#">matchup</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navbarResponsive"><span class="navbar-toggler-icon"></span></button>
                       
            `
        if (sessionStorage.getItem("loggedUser")) {
            result += `
    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="nav navbar-nav mr-auto">
            <li class="nav-item" role="presentation"><a class="nav-link text-white"
                    href="listActivities.html">Listar atividades</a></li>
            <li class="nav-item" role="presentation"><a class="nav-link" href="addActivity.html">criar
                    atividade</a></li>
        </ul>
        <div class="nav-item dropdown no-arrow"><button class="btn btn-primary dropdown-toggle"
                                    data-toggle="dropdown" aria-expanded="false" type="button"><span
                                        class="d-none d-lg-inline mr-2 text-gray-600" id="loggedUser"></span><img
                                        class="border rounded-circle img-profile" style="width:60px; height:60px;" id="loggedUserPhoto"
                                        src="" /></button>
            <div role="menu" class="dropdown-menu shadow dropdown-menu-right animated--grow-in"><a
                    role="presentation" class="dropdown-item" href="profile.html"><i
                        class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Editar Perfil</a><a
                    role="presentation" class="dropdown-item" href="manageActivitiesUser.html"><i
                        class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Gerir Atividades</a>
                <a role="presentation" class="dropdown-item" href="manageActivitiesUser.html"><i
                        class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i> Histórico de
                    Atividades</a>
                <div class="dropdown-divider" ></div><a type="button" role="presentation" class="dropdown-item"
                     id="btnLogout" ><i
                        class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" ></i> Terminar
                    Sessão</a>
            </div>
        </div>
    </div>
    <ul class="nav navbar-nav mr-auto">
        <li class="nav-item" role="presentation"></li>
        <li class="nav-item" role="presentation"></li>
    </ul>
</div>`
        } else {
            result += `  
        <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item" role="presentation"><a class="nav-link" href="/html/login.html">Entrar</a></li>
            <li class="nav-item" role="presentation"><a class="nav-link" href="/html/signup.html">Registar</a></li>
        </ul>
        </div>     
            `
        }
        result += `</div>`
        // Injeção do conteúdo na barra de navegação
        nav.innerHTML = result


        // Mapeamento dos cliques nos botões de Login/Register/Logout
        if (sessionStorage.getItem("loggedUser")) {
            // Apresentação do nome do utilizador autenticado
            document.querySelector("#loggedUser").innerHTML = `Olá ${sessionStorage.getItem("loggedUser")}</a>`
            document.querySelector("#loggedUserPhoto").src = `${sessionStorage.getItem("loggedUserPhoto")}`
            // Clique no botão de logout
            document.querySelector("#btnLogout").addEventListener("click", function () {
                sessionStorage.removeItem('loggedUser');
                sessionStorage.removeItem('loggedUserId');
                sessionStorage.removeItem('loggedUserPhoto');
                sessionStorage.removeItem('loggedUserType');
                //this.userController.logoutUser();
                
                location.href="../index.html";

            })
        }

    }


    // NavBarMap() {
    //     alert("Nao está a fazer nada fdc")
    //     // Mapeamento dos cliques nos botões de Login/Register/Logout
    //     if (sessionStorage.getItem("loggedUser") && sessionStorage.getItem("loggedUserPhoto")) {
    //         alert("vou-me matar")
    //         // Apresentação do nome do utilizador autenticado
    //         document.querySelector("#loggedUser").innerHTML = `Olá ${sessionStorage.getItem("loggedUser")}</a>`
    //         document.querySelector("#loggedUserPhoto").src = `${sessionStorage.getItem("loggedUserPhoto")}`
    //         alert("OI")
    //         // Clique no botão de logout
    //         document.querySelector("#btnLogout").addEventListener("click", function () {

    //             this.userController.logoutUser();
    //             location.reload();

    //         })
    //     }
    // }



}