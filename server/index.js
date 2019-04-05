const conifg = require('./config.json');

const Koa = require('koa');
const cors = require('kcors');
const serve = require('koa-static');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');

// For Passport support
const session = require('koa-session2');
const redis = require('koa-redis');
const passport = require('koa-passport');

const app = new Koa();

app.use(
  cors({
    credentials: true
  })
);

exports.app = app;
exports.passport = passport;

// The Auth model for Passport support
require('./models/auth');

// Trust proxy
app.proxy = true;

// Sessions
app.keys = [ config.site.secret ];
if (process.env.NODE_ENV === 'production') {
  app.use(
    sessions({
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      store: redis()
    })
  );
} else {
  app.use(session());
}

// Body parser
app.use(bodyParser());

// Authentication
app.use(passport.initialize());
app.use(passport.session());

// Statically serve assets
app.use(mount('../src/assets', serve('./assets')));

// Error-handling middleware
app.use(async(ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    console.error(`ERROR ${ctx.status} :: ${err.message}`);
    console.error(JSON.stringify(err, null, 2));
    ctx.body = {
      message: err.message,
      error: {}
    };
  }
});

require('./routes');

console.log(`${config.site.name} is now listening on port ${process.env.PORT || config.site.port}`);
app.listen(process.env.PORT || config.site.port);

process.on('SIGINT', function exit() {
  process.exit();
});
