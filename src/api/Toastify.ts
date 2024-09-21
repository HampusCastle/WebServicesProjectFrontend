import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
    autoClose: 750,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
    className: 'relative flex items-center p-4 text-sm text-white rounded-lg shadow-lg',
};

const createToast = (type: 'info' | 'success' | 'warn' | 'error', message: string) => {
    toast[type](message, { ...toastConfig, className: `${toastConfig.className} bg-${type}-600` });
};

export const toastInfo = (message: string) => createToast('info', message);
export const toastSuccess = (message: string) => createToast('success', message);
export const toastWarning = (message: string) => createToast('warn', message);
export const toastError = (message: string) => createToast('error', message);