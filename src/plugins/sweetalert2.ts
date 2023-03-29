import Swal from "sweetalert2"

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
  
export const toast = (options: ToastI) => {
    return Toast.fire({
        icon: options.icon,
        title: options.title,
    })
}

type ToastI = {
    icon: "success" | "error" | "warning" | "info";
    title: string;
}