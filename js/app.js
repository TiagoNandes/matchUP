import UserView from './views/UserView.js'
import RegisterView from './views/RegisterView.js'
import ActivityCatalogView from './views/ActivityCatalogView.js'
import ActivityView from './views/ActivityView.js'
import AddActivityView from './views/AddActivityView.js'

class App {
    constructor() {
        this.routes = {
            '': [
                UserView,
                ActivityCatalogView
            ],
            'login': [
                UserView
            ],
            'signup': [
                RegisterView
            ],
            'activity': [
                ActivityView
            ],
            'addActivity': [
                AddActivityView
            ],
            'listActivities': [
                ActivityCatalogView
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
                date: '2021-02-01',
                hour: '20',
                duration: '120',
                minParticipants:'2',
                maxParticipants: '24',
                host: 'Tiago'
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
                date: '2021-02-01',
                hour: '20',
                duration: '120',
                minParticipants:'2',
                maxParticipants: '24',
                host: 'Quim'
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
                date: '2021-02-01',
                hour: '20',
                duration: '120',
                minParticipants:'2',
                maxParticipants: '24',
                host: 'Manel'
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
                date: '2021-02-01',
                hour: '20',
                duration: '120',
                minParticipants:'2',
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
                photo: "/assets/user/img/avatars/avatar1.jpeg"
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
                photo: "/assets/user/img/avatars/avatar2.jpeg"
            }
        ];

        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.activities) {
            localStorage.setItem('activities', JSON.stringify(activities));
        }
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

new App();