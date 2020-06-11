import ActivityController from '../controllers/ActivityController.js'
import UserController from '../controllers/UserController.js'

export default class ActivityAddView {
    constructor(){
        this.activityController = new ActivityController();
        this.userController = new UserController();

        // add activity DOM
        this.userLoggedOutContent = document.getElementById('userLoggedOutContent');
        this.userLoggedInContent = document.getElementById('userLoggedInContent');
        this.addActivityForm = document.getElementById('frmAddActivity');
        this.activityName = document.getElementById('txtName');
        this.activityCategory = document.getElementById('sltCategory');
        this.activityPhoto = document.getElementById('txtPhoto');
        this.activityDescription = document.getElementById('txtDescription');
        this.addBandMessage = document.getElementById('addBandMessage');

        this.renderAddActivityForm(this.userController.checkLoginStatus());
        this.bindAddAddActivityForm();
    }

    renderAddActivityForm(userIsLogged) {
        if(userIsLogged) {
            this.userLoggedOutContent.style.visibility = 'hidden';
            this.userLoggedInContent.style.visibility = 'visible';
        } else {
            this.userLoggedOutContent.style.visibility = 'visible';
            this.userLoggedInContent.style.visibility = 'hidden';
        }
    }

    bindAddAddActivityForm() {
        this.addActivityForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.activityController.addActivity(
                    this.activityName.value,
                    this.activityCategory.value,
                    this.activityPhoto.value,
                    this.activityDescription.value,
                );
                this.displayAddCategoryMessage('Activity added with success!', 'success');

                // Wait 1 second before sending to catalog, so the user can see the login success message
                setTimeout(() => {
                    location.href="../index.html";
                },
                1000);
            } catch(e) {
                this.displayAddActivityMessage(e, 'danger');
            }
        });
    }

    displayAddActivityMessage(message, type) {
        this.addActivityMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}
