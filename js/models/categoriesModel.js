export default class CategoriesModel {
    constructor() {
        this.categories = localStorage.categories ? JSON.parse(localStorage.categories) : [];
    }

    getAll() {
        return this.categories;
    }

    create(name) {
        const category = {
            id: this.categories.length > 0 ? this.categories[this.categories.length - 1].id + 1 : 1,
            name: name
        }
        this.categories.push(category);
        this._persist();
    }

    edit(oldName, newName) {
        let allCategories = this.getAll();
        this.categoryToEdit = allCategories.find(category => category.name === oldName);
        this.categoryToEdit.name = newName;
        localStorage.setItem('categories', this.categoryToEdit);
        
        this._persist()
    }


    _persist() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }

    remove(id) {
        this.categories = this.categories.filter(category => category.id != id)
        this._persist()
    }

}