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
import StatisticsView from './views/statisticsView.js'

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
            'statistics': [
                StatisticsView,
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
                latitude: '41.398590',
                longitude: '-8.756840',
                date: '2020-08-25',
                hour: '15:35',
                duration: '2',
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
                latitude: '41.217020',
                longitude: '-7.906900',
                date: '2020-08-26',
                hour: '15:00',
                duration: '1',
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
                latitude: '41.398590',
                longitude: '-8.756840',
                date: '2020-08-27',
                hour: '17:30',
                duration: '2',
                minParticipants: '2',
                maxParticipants: '24',
                host: 'atleta'
            },
            {
                id: 4,
                name: 'Ciclismo em Lisboa',
                category: 'Biking',
                description: 'Junta-te  a nós nesta volta em bicicleta a Lisboa! Apenas precisas de trazer a tua bicicleta e divertires-te!',
                address: 'Rua da Igreja, 4100-083 Lisboa',
                photo: 'https://images.theconversation.com/files/166681/original/file-20170425-13411-1bbrx53.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
                latitude: '38.722252',
                longitude: '-9.139337',
                date: '2020-08-29',
                hour: '10:20',
                duration: '1',
                minParticipants: '2',
                maxParticipants: '24',
                host: 'tiago'
            },
            {
                id: 5,
                name: 'Volley de praia em Vila do Conde',
                category: 'Voley',
                description: 'Junta-te  a nós neste jogo de volley de praia!',
                address: 'Praia do Turismo Norte, Av. do Brasil, Vila do Conde',
                photo: 'https://bstatic.com/xdata/images/xphoto/1182x887/73542228.jpg?k=f42ea77af5c0919d2b9a3651c4a744cfaa9cf625b66e3c851080e7f74bf61a11&o=?size=S',
                latitude: '41.36218686975544',
                longitude: '-8.760309219360353',
                date: '2020-08-30',
                hour: '16:30',
                duration: '1',
                minParticipants: '2',
                maxParticipants: '24',
                host: 'ze'
            },
            {
                id: 6,
                name: 'Corrida no centro de Guimarães',
                category: 'Corrida',
                description: 'Junta-te  a nós nesta corrida no centro de Guimarães!',
                address: 'Largo do Toural 22, 4810-445 Guimarães',
                photo: 'https://www.sportsdirect.com/images/marketing/pt/asics-lp-social-426x426-2.jpg',
                latitude: '41.441952',
                longitude: '-8.295610',
                date: '2020-08-31',
                hour: '09:30',
                duration: '1',
                minParticipants: '10',
                maxParticipants: '200',
                host: 'ze'
            }
        ];

        const users = [{
                id: 1,
                type: "atleta",
                username: "atleta",
                email: "atleta@atleta.com",
                password: "12345",
                name: "Tiago Fernandes",
                dateOfBirth: '1990-02-06',
                location: "Porto",
                photo: "https://thumbs.web.sapo.io/?W=800&H=0&delay_optim=1&epic=OWYzgOzI231PlJytHOBPjnIeMqBWY+SJunVC6fPsVZbV28Bdi11sUF9TZNVvcXz4+y0+7Fg2KfY8VUT3o0Cn4tJdQlsO7PEK3q6FW3sDz7Zt6mc=",
                blocked: true
            },
            {
                id: 2,
                type: "admin",
                username: "admin",
                email: "admin@admin.com",
                password: "12345",
                name: "Tiago Fernandes",
                dateOfBirth: '2000-10-02',
                location: "Porto",
                photo: "/assets/user/img/avatars/avatar2.jpeg",
                blocked: false
            },
            {
                id: 3,
                type: "atleta",
                username: "tiago",
                email: "tiago@atleta.com",
                password: "12345",
                name: "Tiago Fernandes",
                dateOfBirth: '1995-01-02',
                location: "Porto",
                photo: "/assets/user/img/avatars/avatar4.jpeg",
                blocked: false
            },
            {
                id: 4,
                type: "atleta",
                username: "ze",
                email: "jose@atleta.com",
                password: "12345",
                name: "Jose Fernandes",
                dateOfBirth: '1992-02-03',
                location: "Lisboa",
                photo: "/assets/user/img/avatars/avatar5.jpeg",
                blocked: false
            }
        ];

        //userId, host, activityId, justification, state
        const requests = [{
            id: 1,
            userId: 3,
            host: "atleta",
            activityId: 1,
            justification: "Gosto muito de Yoga",
            state: "Pendente",
            activityCategory: "Yoga"
        },
        {
            id: 2,
            userId: 3,
            host: "atleta",
            activityId: 2,
            justification: "Gosto muito de Biking",
            state: "Aceite",
            activityCategory: "Biking"
        },
        {
            id: 3,
            userId: 4,
            host: "atleta",
            activityId: 2,
            justification: "Gosto muito de Biking",
            state: "Aceite",
            activityCategory: "Biking"
        },
        {
            id: 4,
            userId: 3,
            host: "atleta",
            activityId: 3,
            justification: "Gosto muito de dança!",
            state: "Pendente",
            activityCategory: "Dança"
        },
        {
            id: 5,
            userId: 1,
            host: "ze",
            activityId: 5,
            justification: "Gosto muito de Volley de praia",
            state: "Aceite",
            activityCategory: "Voley"
        },
        {
            id: 6,
            userId: 1,
            host: "ze",
            activityId: 6,
            justification: "Gosto muito de correr",
            state: "Aceite",
            activityCategory: "Corrida"
        },

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
                name: "Jogar 10 Jogos de Futebol",
                category: "Futebol"
            },
            {
                id: 2,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer 10 Corridas",
                category: "Corrida"
            },
            {
                id: 3,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Jogar 5 Jogos de Vólei",
                category: "Volei"
            },
            {
                id: 4,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer Ciclismo 5 vezes",
                category: "Ciclismo"
            },
            {
                id: 5,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer BTT 5 vezes",
                category: "Biking"
            },
            {
                id: 6,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer Yoga 10 vezes",
                category: "Yoga"
            },
            {
                id: 7,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Participar Numa Aula de Dança 5 vezes",
                category: "Dança"
            },
            {
                id: 8,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Jogar Basketball 5 vezes",
                category: "Basketball"
            },
            {
                id: 9,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Fazer Marcha 5 vezes",
                category: "Corrida"
            },
            {
                id: 10,
                photo: "https://www.awardsaplus.com/wp-content/uploads/2016/08/ICON_achievement-icon.png",
                name: "Jogar Andebol 10 vezes",
                category: "Andebol"
            },
        ];

        const medals = [{
                id: 1,
                name: "Desportista Nível 1!",
                photo: "https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-gold-medal-vector-golden-1st-place-badge-sport-game-golden-challenge-png-image_1887633.jpg",
                description: "Parabéns! Atingiu o status de Desportista Nível 1!"
            },
            {
                id: 2,
                name: "Desportista Nível 2!",
                photo: "https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-silver-medal-vector-best-first-placement-winner-champion-number-one-2nd-png-image_1888381.jpg",
                description: "Parabéns! Atingiu o status de Desportista Nível 2!"
            },
            {
                id: 3,
                name: "Desportista Nível 3!",
                photo: "https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-bronze-medal-vector-best-first-placement-winner-champion-number-one-3rd-png-image_1887553.jpg",
                description: "Parabéns! Atingiu o status de Desportista Nível 3!"
            },
            {
                id: 4,
                name: "Desportista Nível 4!",
                photo: "https://png.pngtree.com/png-clipart/20190117/ourmid/pngtree-hand-painted-medal-medal-medal-png-image_423365.jpg",
                description: "Parabéns! Atingiu o status de Desportista Nível 4!"
            },
            {
                id: 5,
                name: "Desportista Nível 5!",
                photo: "https://png.pngtree.com/png-clipart/20190117/ourmid/pngtree-hand-painted-medal-medal-medal-png-image_423365.jpg",
                description: "Parabéns! Atingiu o status de Desportista Nível 5!"
            }
            
            
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