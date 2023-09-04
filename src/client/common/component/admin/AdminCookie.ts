import Cookies from "js-cookie";

const COOKIE_NAME: string = "doritos-and-fritos"

const setAdminCookie = (value: string) => Cookies.set(COOKIE_NAME, value);
const getAdminCookie = () => Cookies.get(COOKIE_NAME);

export { setAdminCookie, getAdminCookie }