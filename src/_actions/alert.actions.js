import { alertConstants } from "../_constants";

export const alertActions = {
    success,
    error,
    clear
}

function sucess(message) {
    return { type: alertConstants.SUCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}