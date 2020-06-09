export default class UserModel {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    getAll() {
        return this.users;
    }

    create(type, username, email, password, name, dateOfBirth, location) {
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            type: type,
            username: username,
            email: email,
            password: password,
            name: name,
            dateOfBirth: dateOfBirth,
            location: location


        }
        this.users.push(user);
        this._persist();
    }

    login(username) {
        
        sessionStorage.setItem('loggedUser', username);
        const allUsers = this.getAll();
        const loggedUser = allUsers.find(user => user.username == username )
        sessionStorage.setItem('loggedUserType', loggedUser.type);
    }

    logout() {
        sessionStorage.removeItem('loggedUser');
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') !== null ? true : false;
    }

    _persist() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
}
