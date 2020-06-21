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
            location: location,
            photo: "https://yinnepal.files.wordpress.com/2017/11/admin.png?w=640",
            blocked: false


        }
        this.users.push(user);
        this._persist();
    }

    login(username) {
        
        sessionStorage.setItem('loggedUser', username);
        const allUsers = this.getAll();
        console.log(JSON.stringify(allUsers));
        const loggedUser = allUsers.find(user => user.username == username )
        sessionStorage.setItem('loggedUserType', loggedUser.type);
        sessionStorage.setItem('loggedUserId', loggedUser.id);
        sessionStorage.setItem('loggedUserPhoto', loggedUser.photo);
    }

    logout() {
        sessionStorage.removeItem('loggedUser');
        sessionStorage.removeItem('loggedUserId');
        sessionStorage.removeItem('loggedUserPhoto');
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') !== null ? true : false;
    }

    _persist() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    remove(id) {
        this.users = this.users.filter(user => user.id != id)
        this._persist()
    }

    edit(id, type, username, email, name, dateOfBirth, location, photo) {
        let allUsers = this.getAll();
        this.userToEdit = allUsers.find(user => user.id == id);
        this.userToEdit.type = type;
        this.userToEdit.username = username;
        this.userToEdit.email = email;
        this.userToEdit.name = name;
        this.userToEdit.dateOfBirth = dateOfBirth;
        this.userToEdit.location = location;
        this.userToEdit.photo = photo;
        localStorage.setItem('users', this.userToEdit);

        
        this._persist()
    }

    editWithPassword(id, type, username, email, name, dateOfBirth, location, photo, password) {
        let allUsers = this.getAll();
        this.userToEdit = allUsers.find(user => user.id == id);
        this.userToEdit.type = type;
        this.userToEdit.username = username;
        this.userToEdit.email = email;
        this.userToEdit.name = name;
        this.userToEdit.dateOfBirth = dateOfBirth;
        this.userToEdit.location = location;
        this.userToEdit.photo = photo;
        this.userToEdit.password = password;
        localStorage.setItem('users', this.userToEdit);

        
        this._persist()
    }

    block(id) {
        const allUsers = this.getAll();
        this.userToBlock = allUsers.find(user => user.id == id);
        if(this.userToBlock.blocked === false){
            this.userToBlock.blocked = true;
            localStorage.setItem('users', this.userToBlock);
        }
        else{
            this.userToBlock.blocked = false;
            localStorage.setItem('users', this.userToBlock);
        }
        this._persist()
    }

}

