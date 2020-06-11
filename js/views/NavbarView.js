import {
    login,
    logout,
    register
} from "../controllers/userController.js"

// Atualização da barra de navegação
updateNavbar()

// Mapeamento dos cliques nos botões de Login/Register/Logout
if (sessionStorage.getItem("loggedUser")) {
    // Apresentação do nome do utilizador autenticado
    document.querySelector("#loggedUser").innerHTML = `Olá <a href="#">${sessionStorage.getItem("loggedUser")}</a>`
    // Clique no botão de logout
    document.querySelector("#btnLogout").addEventListener("click", function () {
        logout()
        location.reload()
    })  
} else {
    // Clique no botão de Login
    document.querySelector("#frmLogin").addEventListener("submit", function (event) {
        // Invocação da função importada para autenticação de utilizador
        const loginResult = login(
            document.querySelector("#txtUsername").value,
            document.querySelector("#txtPassword").value)

        if (loginResult == true) {
            // Fecho da janela modal
            $('#mdlLogin').modal('hide')
            // Apresentação do nome do utilizador autenticado
            document.querySelector("#loggedUser").innerHTML = `Olá <a href="#">${sessionStorage.getItem("loggedUser")}</a>`
        } else {
            alert("Credenciais inválidas!")
        }
        // Prevenção da submissão do formulário
        event.preventDefault()
    })

    // Clique no botão de Register
    document.querySelector("#frmRegister").addEventListener("submit", function (event) {

        const pass1 = document.querySelector("#txtPasswordRegister").value
        const pass2 = document.querySelector("#txtPasswordRegister2").value
        if (pass1 !== pass2) {
            alert("Passwords should be equal")
        } else {
            // Invocação da função importada para registo de utilizador
            const registerResult = register(
                document.querySelector("#txtUsernameRegister").value,
                document.querySelector("#txtPasswordRegister").value)
            if (registerResult == true) {
                // Fecho da janela modal
                $('#mdlRegister').modal('hide')
                // Apresentação do nome do utilizador autenticado
                document.querySelector("#loggedUser").innerHTML = `Olá <a href="#">${sessionStorage.getItem("loggedUser")}</a>`
            } else {
                alert("Credenciais já existentes!")
            }
        }
        // Prevenção da submissão do formulário
        event.preventDefault()
    })

    if (sessionStorage.getItem("loggedUser")) {
        document.querySelector("#loggedUser").innerHTML = `Olá <a href="#">${sessionStorage.getItem("loggedUser")}</a>`
    }
}

/**
 * Função para atualizar a barra de navageação tendo em conta se existe (ou não) algum utilizador autenticado
 */
function updateNavbar() {
    const nav = document.querySelector("nav")
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
            <li class="nav-item" role="presentation"><a class="nav-link" href="activityPage.html">criar
                    atividade</a></li>
        </ul>
        <div class="nav-item dropdown no-arrow"><button class="btn btn-primary dropdown-toggle"
                data-toggle="dropdown" aria-expanded="false" type="button"><span id="loggedUser"
                    class="d-none d-lg-inline mr-2 text-gray-600">John Doe</span><img
                    class="border rounded-circle img-profile"
                    src="/assets/user/img/avatars/avatar5.jpeg" /></button>
            <div role="menu" class="dropdown-menu shadow dropdown-menu-right animated--grow-in"><a
                    role="presentation" class="dropdown-item" href="editProfile.html"><i
                        class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Editar Perfil</a><a
                    role="presentation" class="dropdown-item" href="manageActivitiesUser.html"><i
                        class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Gerir Atividades</a>
                <a role="presentation" class="dropdown-item" href="manageActivitiesUser.html"><i
                        class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i> Histórico de
                    Atividades</a>
                <div class="dropdown-divider"></div><a role="presentation" class="dropdown-item"
                    href="index.html"><i
                        class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Terminar
                    Sessão</a>
            </div>
        </div>
    </div>
    <ul class="nav navbar-nav mr-auto">
        <li class="nav-item" role="presentation"></li>
        <li class="nav-item" role="presentation"></li>
    </ul>
</div>
            `
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
}