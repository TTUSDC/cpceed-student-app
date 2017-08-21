const express = require('express');
const authManager = require('api/auth/auth-manager');
const logger = require('common/logger.js');
const passport = require('api/passport-config.js');

const authRouter = express.Router();

// Get the current User's role.
authRouter.get('/', authManager.verify, (req, res) => {
  if (res.locals.err) {
    logger.error(res.locals.err);
    res.status(400).json(res.locals.err).end();
  }

  res.status(200).json({ role: req.user.role }).end();
});

// Log the User in on a specific device.
authRouter.post('/', (req, res) => {
  // Arguments come from passport-config.js callback.
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(400).json({ message: err.message }).end();
      return;
    }

    if (!user) {
      res.status(401).json(info).end();
      return;
    }

    req.logIn(user, (authErr) => {
      if (authErr) {
        res.status(400).json({ message: authErr.message }).end();
        return;
      }

      // The token is in a cookie, so it doesn't have to be in the body
      res.status(201).end();
    });
  })(req, res);
});

// Log the user out of a specific device.
authRouter.delete('/', authManager.verify, (req, res) => {
  if (res.locals.err) {
    res.status(400).json({ message: res.locals.err.message }).end();
    return;
  }

  authManager.logout(req.session)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(400).json({ message: err.message }).end();
    });
});

// Change the user's password.
authRouter.put('/password',
  authManager.verify,
  authManager.validateUidPermissions,
  (req, res) => {
    if (res.locals.err) {
      res.status(400).json({ message: res.locals.err.message }).end();
      return;
    }

    const email = req.body.email;
    const storedPassword = req.user.password;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    authManager.changePassword(email, storedPassword, password, newPassword)
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        res.status(400).json({ message: err.message }).end();
      });
  });

// Change the user's email.
authRouter.put('/email',
  authManager.verify,
  authManager.validateUidPermissions,
  (req, res) => {
    if (res.locals.err) {
      res.status(400).json({ message: res.locals.err.message }).end();
      return;
    }

    const email = req.body.email;
    const storedPassword = req.user.password;
    const password = req.body.password;
    const newEmail = req.body.newEmail;

    authManager.changeEmail(email, storedPassword, password, newEmail)
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        res.status(400).json({ message: err.message }).end();
      });
  });

module.exports = { router: authRouter };
