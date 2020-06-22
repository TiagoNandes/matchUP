import UserView from './views/UserView.js'
import RegisterView from './views/RegisterView.js'
import ActivityCatalogView from './views/ActivityCatalogView.js'
import ActivityView from './views/ActivityView.js'
import AddActivityView from './views/AddActivityView.js'
import NavbarView from './views/NavbarView.js'
import ManageUserView from './views/manageUserView.js'
import ManageCategoriesView from './views/manageCategoriesView.js'
import ManageAchievementsView from './views/manageAchievementsView.js'
import ManageMedalsView from './views/manageMedalsView.js'
import ManageActivitiesView from './views/manageActivitiesView.js'
import ProfileView from './views/ProfileView.js'
import ManageActivitiesUserView from './views/manageActivitiesUserView.js'
import ActivityHistoryView from './views/ActivityHistoryView.js'
import ManageRequestsView from './views/manageRequestsView.js'

class App {
    constructor() {
        this.routes = {
            '': [
                NavbarView,

            ],
            'login': [
                UserView
            ],
            'signup': [
                RegisterView
            ],
            'activity': [
                NavbarView,
                ActivityView,
            ],
            'addActivity': [
                NavbarView,
                AddActivityView,
            ],
            'listActivities': [
                NavbarView,
                ActivityCatalogView,
            ],
            'profile': [
                NavbarView,
                ProfileView,
            ],
            'manageUsers': [
                ManageUserView,
            ],
            'manageCategories': [
                ManageCategoriesView,
            ],
            'manageAchievements': [
                ManageAchievementsView,
            ],
            'manageMedals': [
                ManageMedalsView,
            ],
            'manageActivities': [
                ManageActivitiesView,
            ],
            'manageActivitiesUser': [
                NavbarView,
                ManageActivitiesUserView,
            ],
            'activityHistory': [
                NavbarView,
                ActivityHistoryView,
            ],
            'manageRequests': [
                NavbarView,
                ManageRequestsView,
            ],
        };

        // import dummy data for testing purposes
        this._importDataFixtures();

        // instantiate the views mapped in the routes object
        this._instantiateViews();
    }

    _instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split('.')[0];

        const views = this._getViews(route);

        for (const view of views) {
            new view();
        }
    }

    _getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

    _importDataFixtures() {
        const activities = [{
                id: 1,
                name: 'Yoga no Parque da Cidade',
                category: 'Yoga',
                description: 'Junta-te  a nós nesta aula de Yoga completamente gratuíta no Parque da Cidade do Porto! Apenas precisas de trazer o teu tapete de yoga e divertires-te!',
                address: 'Estrada Interior da Circunvalação, 4100-083 Porto',
                photo: '/assets/user/img/AdobeStock_212822246-400x400.jpeg',
                latitude: '41.14961',
                longitude: '-8.61099',
                date: '2020-06-25',
                hour: '15:35',
                duration: '120',
                minParticipants: '2',
                maxParticipants: '24',
                host: 'atleta'
            },
            {
                id: 2,
                name: 'Trilho Biking Marão',
                category: 'Biking',
                description: 'Junta-te  a nós nesta aula de Yoga completamente gratuíta no Parque da Cidade do Porto! Apenas precisas de trazer o teu tapete de yoga e divertires-te!',
                address: 'Estrada Interior da Circunvalação, 4100-083 Porto',
                photo: '/assets/user/img/tomaz-slotrips-biking-guide.jpg',
                latitude: '41.14961',
                longitude: '-8.61099',
                date: '2020-06-26',
                hour: '15:00',
                duration: '120',
                minParticipants: '2',
                maxParticipants: '24',
                host: 'atleta'
            },
            {
                id: 3,
                name: 'Aula de Dança no Parque da Cidade',
                category: 'Dança',
                description: 'Junta-te  a nós nesta aula de Yoga completamente gratuíta no Parque da Cidade do Porto! Apenas precisas de trazer o teu tapete de yoga e divertires-te!',
                address: 'Estrada Interior da Circunvalação, 4100-083 Porto',
                photo: '/assets/user/img/Yoga_connect.jpeg',
                latitude: '41.14961',
                longitude: '-8.61099',
                date: '2020-06-27',
                hour: '17:30',
                duration: '120',
                minParticipants: '2',
                maxParticipants: '24',
                host: 'atleta'
            },
            {
                id: 4,
                name: 'Yoga no Parque da Cidade',
                category: 'Yoga',
                description: 'Junta-te  a nós nesta aula de Yoga completamente gratuíta no Parque da Cidade do Porto! Apenas precisas de trazer o teu tapete de yoga e divertires-te!',
                address: 'Estrada Interior da Circunvalação, 4100-083 Porto',
                photo: '/assets/user/img/AdobeStock_212822246-400x400.jpeg',
                latitude: '41.14961',
                longitude: '-8.61099',
                date: '2020-06-21',
                hour: '10:20',
                duration: '120',
                minParticipants: '2',
                maxParticipants: '24',
                host: 'Zé'
            }
        ];

        const users = [{
                id: 1,
                type: "atleta",
                username: "atleta",
                email: "atleta@atleta.com",
                password: "12345",
                name: "Tiago Fernandes",
                dateOfBirth: 1,
                location: "Porto",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                blocked: true
            },
            {
                id: 2,
                type: "admin",
                username: "admin",
                email: "admin@admin.com",
                password: "12345",
                name: "Tiago Fernandes",
                dateOfBirth: 1,
                location: "Porto",
                photo: "/assets/user/img/avatars/avatar2.jpeg",
                blocked: false
            }
        ];

        //userId, host, activityId, justification, state
        const requests = [{
            id: 1,
            userId: 1,
            host: "atleta",
            activityId: 1,
            justification: "Gosto muito de Yoga",
            state: "Pendente"
        },
        {
            id: 2,
            userId: 1,
            host: "atleta",
            activityId: 2,
            justification: "Gosto muito de Biking",
            state: "Aceite"
        },
        {
            id: 3,
            userId: 1,
            host: "atleta",
            activityId: 3,
            justification: "Gosto muito de Dança",
            state: "Recusado"
        }
    ];

        const categories = [{
                id: 1,
                name: "Yoga"
            },
            {
                id: 2,
                name: "Biking"
            },
            {
                id: 3,
                name: "Dança"
            },
            {
                id: 4,
                name: "Corrida"
            },
            {
                id: 5,
                name: "Futebol"
            },
            {
                id: 6,
                name: "Basket"
            },
            {
                id: 7,
                name: "Andebol"
            },
            {
                id: 8,
                name: "Voley"
            },
        ];

        const achievements = [{
                id: 1,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Jogar 10 Jogos de Futebol"
            },
            {
                id: 2,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer 10 Corridas"
            },
            {
                id: 3,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Jogar 5 Jogos de Vólei"
            },
            {
                id: 4,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer Ciclismo 5 vezes"
            },
            {
                id: 5,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer BTT 5 vezes"
            },
            {
                id: 6,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer Yoga 10 vezes"
            },
            {
                id: 7,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Participar Numa Aula de Dança 5 vezes"
            },
            {
                id: 8,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Jogar Basketball 5 vezes"
            },
            {
                id: 9,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer Marcha 5 vezes"
            },
            {
                id: 10,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Jogar Andebol 10 vezes"
            },
        ];

        const medals = [{
                id: 1,
                name: "Futebolista Nível 1!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 2,
                name: "Futebolista Nível 2!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 3,
                name: "Futebolista Nível 3!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 4,
                name: "Futebolista Nível 4!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 5,
                name: "Futebolista Nível 5!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 6,
                name: "Ciclista Nível 1!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 7,
                name: "Ciclista Nível 2!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 8,
                name: "Ciclista Nível 3!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 9,
                name: "Ciclista Nível 4!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 10,
                name: "Ciclista Nível 5!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 11,
                name: "Runner Nível 1!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 12,
                name: "Runner Nível 2!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 13,
                name: "Runner Nível 3!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 13,
                name: "Runner Nível 4!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            {
                id: 14,
                name: "Runner Nível 5!",
                photo: "/assets/user/img/avatars/avatar1.jpeg",
                description: "Bela Medalha!"
            },
            
        ];

        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.activities) {
            localStorage.setItem('activities', JSON.stringify(activities));
        }
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (!localStorage.categories) {
            localStorage.setItem('categories', JSON.stringify(categories));
        }
        if (!localStorage.achievements) {
            localStorage.setItem('achievements', JSON.stringify(achievements));
        }
        if (!localStorage.medals) {
            localStorage.setItem('medals', JSON.stringify(medals));
        }
        if (!localStorage.requests) {
            localStorage.setItem('requests', JSON.stringify(requests));
        }
    }
}

new App();