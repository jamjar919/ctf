import {getAxisText} from "./GetAxisText";

const getLabelText = (datum: any): string => {
    if (datum.adjustment) {
        return `[${getAxisText(datum.x)}] ${datum.reason}: ${datum.adjustment}`
    }

    return `[${getAxisText(datum.x)}] ${datum.reason}`;
}

export { getLabelText }