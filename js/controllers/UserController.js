import UserModel from '../models/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    createUser(type, username, email, password, name, dateOfBirth, location) {
        if (!this.userModel.getAll().some(user => user.username === username) || !this.userModel.getAll().some(user => user.email === email)) {
           
            this.userModel.create(type, username, email, password, name, dateOfBirth, location);
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }

    loginUser(username, password) {
        if (this.userModel.getAll().some(user => { return user.username === username && user.password === password })) {
            this.userModel.login(username);
            return true;
        } else {
            throw Error('Invalid login!');
        }    
    }

    logoutUser() {
        this.userModel.logout();
    }

    checkLoginStatus() {
        return this.userModel.isLogged();
    }
}
