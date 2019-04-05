const app = require('./index.js').app;
const passport = require('./index.js').passport;
const Router = require('koa-router');

const router = new Router();

router.post('/api/login', (ctx, next) => {
  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      throw err;
    }

    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        success: false
      };
    } else {
      delete user.error;
      delete user.password;
      ctx.body = user;
      return ctx.login(user);
    }
  })(ctx, next);
});

router.post('/api/logout', (ctx) => {
  ctx.logout();
  ctx.status = 204;
});

app.use(router.routes());
app.use(router.allowedMethods());
