const Insta = require("instamojo-nodejs");
const API_KEY = process.env.IM_API_KEY;
const AUTH_KEY = process.env.IM_AUTH_KEY;

Insta.setKeys(API_KEY, AUTH_KEY);
Insta.isSandboxMode(true);

module.exports = Insta;
