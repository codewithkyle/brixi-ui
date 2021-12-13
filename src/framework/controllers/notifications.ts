import { snackbar, toast, append } from "@codewithkyle/notifyjs";
import sound from "./soundscape";

class Notifications {
    public snackbar(message: string) {
        snackbar({
            duration: 10,
            closeable: true,
            message: message,
        });
        sound.snackbar();
    }

    /**
     * Notify a user that something has happened.
     */
    public alert(
        title: string,
        message: string,
        actions: Array<{
            label: string;
            callback: Function;
        }> = []
    ) {
        toast({
            title: title,
            message: message,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
            duration: Infinity,
            closeable: true,
            buttons: actions,
        });
        sound.alert();
    }

    /**
     * Notify a user that an action they triggered has succeeded.
     */
    public success(
        title: string,
        message: string,
        actions: Array<{
            label: string;
            callback: Function;
        }> = []
    ) {
        toast({
            title: title,
            message: message,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
            classes: ["-green"],
            duration: Infinity,
            closeable: true,
            buttons: actions,
        });
        sound.success();
    }

    /**
     * Warn the user of something.
     */
    public warn(
        title: string,
        message: string,
        actions: Array<{
            label: string;
            callback: Function;
        }> = []
    ) {
        toast({
            title: title,
            message: message,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
            classes: ["-yellow"],
            duration: Infinity,
            closeable: true,
            buttons: actions,
        });
        sound.warning();
    }

    /**
     * Notify the user that an action they triggered has failed.
     */
    public error(
        title: string,
        message: string,
        actions: Array<{
            label: string;
            callback: Function;
        }> = []
    ) {
        toast({
            title: title,
            message: message,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
            classes: ["-red"],
            duration: Infinity,
            closeable: true,
            buttons: actions,
        });
        sound.errorAlert();
    }

    /**
     * Add a custom toast element to the toaster.
     */
    public append(toast: HTMLElement) {
        append(toast);
    }
}
const notifications = new Notifications();
export { notifications as default };
