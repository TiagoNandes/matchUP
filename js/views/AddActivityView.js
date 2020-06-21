import ActivityController from '../controllers/ActivityController.js'
import UserController from '../controllers/UserController.js'

export default class AddActivityView {
    constructor(){
        this.activityController = new ActivityController();
        this.userController = new UserController();

        //add
        this.addActivityForm = document.getElementById('frmAddActivityUser');
        this.txtName = document.getElementById('txtName');
        this.sltCategory = document.getElementById('sltCategory');
        this.txtDescription = document.getElementById('txtDescription');
        this.txtAddress = document.getElementById('txtAddress');
        this.txtPhoto = document.getElementById('txtPhoto');
        this.txtLatitude = document.getElementById('txtLatitude');
        this.txtLongitude = document.getElementById('txtLongitude');
        this.sltDay = document.getElementById('sltDay');
        this.sltHour = document.getElementById('sltHour');
        this.txtDuration = document.getElementById('txtDuration');
        this.txtMinParticipants = document.getElementById('txtMinParticipants');
        this.txtMaxParticipants = document.getElementById('txtMaxParticipants');
        this.bindAddActivityForm();
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

    bindAddActivityForm() {
        this.addActivityForm.addEventListener('submit', event => {
            event.preventDefault();


            //name, category, description, address, photo, latitude, 
            //longitude, date, hour, duration, minParticipants, maxParticipants, host
            try {
                this.activityController.addActivity(
                    this.txtName.value,
                    this.sltCategory.value,
                    this.txtDescription.value,
                    this.txtAddress.value,
                    this.txtPhoto.value,
                    this.txtLatitude.value,
                    this.txtLongitude.value,
                    this.sltDay.value,
                    this.sltHour.value,
                    this.txtDuration.value,
                    this.txtMinParticipants.value,
                    this.txtMaxParticipants.value,
                    sessionStorage.getItem('loggedUser')

                );
                location.reload();


            } catch (e) {
                Swal.fire({
                    title: 'Erro!',
                    text: e,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        });
    }

}
