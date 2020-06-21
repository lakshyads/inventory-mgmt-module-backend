/** ---------------------------------
 *        String Util
 * ---------------------------------- */

// Imports ---------------------------------------------------------------
import lodash from 'lodash';

// Utils -----------------------------------------------------------------

/**
 * Truncates a text upto specified length and appends the truncated string with a specified ending
 * @param text Text to truncate
 * @param length Total length of output string, `Default` = 100
 * @param ending String appended to the truncated text. `Default` = `'...'`
 */
const truncate = (text: string, length: number = 100, ending: string = '...') => {
    if (text.length > length) {
        return text.substring(0, length - ending.length) + ending;
    }
    else
        return text;
};

// Exports -----------------------------------------------------------------
export default lodash;
export { truncate };