const handleLogin = require("./login");

const handleAdminLogin = async (req, res, next) => {
  await handleLogin(req, res, next, "admin");
};

module.exports = handleAdminLogin;
