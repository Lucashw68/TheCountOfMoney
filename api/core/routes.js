const registerRouter = require("../routes/register");
const loginRouter = require("../routes/login");
const logoutRouter = require("../routes/logout");
const authRouter = require("../routes/auth");
const profileRouter = require("../routes/profile");

const cryptosRouter = require("../routes/cryptos");

const articlesRouter = require("../routes/articles");

module.exports = function(app) {
  // Root
  app.get('/', function(req, res) {
    res.sendFile('index.html', { root: 'public' });
  });

  // Users
  app.use("/api/users/register", registerRouter)
  app.use("/api/users/login", loginRouter)
  app.use("/api/users/logout", logoutRouter)
  app.use("/api/users/profile", profileRouter)
  app.use("/api/users/auth", authRouter)

  // Cryptos
  app.use("/api/cryptos", cryptosRouter)

  // Articles
  app.use("/api/articles", articlesRouter)
}
