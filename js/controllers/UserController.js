import UserModel from '../models/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    createUser(type, username, email, password, name, dateOfBirth, location) {
        if (!this.userModel.getAll().some(user => user.username === username) && !this.userModel.getAll().some(user => user.email === email)) {
           
            this.userModel.create(type, username, email, password, name, dateOfBirth, location);

            

        } else {
            throw Error(`Utilizador com este Username ou Email já existe!`);
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

    getAllUsers(){
        this.userModel.getAll();
        return this.userModel.getAll()
    }

    //remove user
    removeUser(id) {
        this.userModel.remove(id)
        
    }

    //block user
    blockUser(id) {
        this.userModel.block(id)
        
    }

    //edit user
    editUser(id, type, username, email, name, dateOfBirth, location, photo) {
        this.userModel.edit(id, type, username, email, name, dateOfBirth, location, photo)
    }

    //edit user with password
    editUserWithPassword(id, type, username, email, name, dateOfBirth, location, photo, password) {
        this.userModel.editWithPassword(id, type, username, email, name, dateOfBirth, location, photo, password)
    }
}
