import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.js';

export default class SwalClass{
    static position = "top-end";
    static timer = 2500;
    static confirmation = false;

    static success(message="Success"){
        Swal.fire({
            position: this.position,
            icon: 'success',
            // title: 'Success',
            text:message,
            showConfirmButton: this.confirmation,
            timer: this.timer,
            toast:true
        })
    }

    static failed(message="Failed"){
        Swal.fire({
            position: this.position,
            icon: 'error',
            // title:'Error',
            text: message,
            showConfirmButton: this.confirmation,
            timer: this.timer,
            toast:true
        })
    }
}