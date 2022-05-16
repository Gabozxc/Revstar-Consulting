const user = require('./user');
const invoice = require('./invoice')
const articulo = require('./articulo')
const auth = require('./auth')

module.exports = indexRoutes = (app) => {
    app.use('/api/user', user)
       .use("/api/auth", auth)
       .use("/api/invoice", invoice)
       .use("/api/articulo", articulo)
};