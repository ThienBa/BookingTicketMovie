import Swal from 'sweetalert2';

export const SweetAlertSuccess = (message) => {
    return Swal.fire({
        position: 'top',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2500
    })
}
export const SweetAlertError = (message) => {
    return Swal.fire(
        message,
        '',
        'error'
    )
}

export const SweetAlertWarning = (message) => {
    return Swal.fire(
        message,
        '',
        'warning'
    )
}