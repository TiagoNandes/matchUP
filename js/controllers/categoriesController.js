import CategoriesModel from '../models/CategoriesModel.js'

export default class CategoriesController {
    constructor() {
        this.categoriesModel = new CategoriesModel();
    }

    createCategory(name) {
        if (!this.categoriesModel.getAll().some(category => category.name === name)) {
           
            this.categoriesModel.create(name);

        } else {
            throw Error(`Cateogria "${name}" já existe!`);
        }
    }

    getAllCategories(){
        this.categoriesModel.getAll();
        return this.categoriesModel.getAll()
    }

    //remove category
    removeCategory(id) {
        this.categoriesModel.remove(id)
        
    }
}
