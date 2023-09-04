import {randomInt} from "next/dist/shared/lib/bloom-filter/utils";

const SENSIBLE_START = 10;
const SENSIBLE_VARIANCE = 50;

const varySensibleStart = () => SENSIBLE_START + randomInt(0, SENSIBLE_VARIANCE);

const getSensibleInitialPosition = (): [number, number] => {
    if (document) {
        return [varySensibleStart(), window.scrollY + varySensibleStart()];
    }

    return [varySensibleStart(), varySensibleStart()];
}

export { getSensibleInitialPosition }