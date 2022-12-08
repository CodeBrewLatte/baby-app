import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";

const createCookie = (req, res, next) => {
  setCookie("myCookieName", "some-value", {
    httpOnly: false, // true by default
  });
  res.status(200);
};

export default createCookie;
