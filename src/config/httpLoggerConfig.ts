import { httpLogOptions } from '../utils/middlewares/httpLogger';

/** Logs Http request if true */
export const doLogRequest: boolean = true;

/** Logs Http response if true */
export const doLogResponse: boolean = true;

/** Http log default options */
const httpLoggerOptions: httpLogOptions = {
    showReqBody: true,
    showResBody: true,
    showCookies: true,
    showHeaders: true,
    showSession: true,
};

// Exports ------------------------------------------------------------------
export { httpLoggerOptions };