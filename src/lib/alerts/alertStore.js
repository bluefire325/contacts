import { writable } from "svelte/store";


export const ALERT_TYPE = {
    DANGER:"DANGER",
    SUCCESS:"SUCCESS",
    INFO: "INFO",
    WARNING: "WARNING",

}

Object.freeze();


export const alertMessage = writable('');
export const alertType = writable('');



export const  showAlert = (message, type=ALERT_TYPE.INFO, resetTime) => {
    console.log("showAlert", message, type , resetTime);
    alertType.set(type);
    alertMessage.set(message);
    console.log("showAlert11111111", alertType);
    // alertType.set(type);

    if(resetTime){
        setTimeout(() => {
            alertMessage.set();
            alertType.set();
        }, resetTime)
    }
}