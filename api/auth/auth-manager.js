const authErrors = require('api/errors/auth-errors');
const User = require('api/users/user-models').User;
const Session = require('api/auth/auth-models').Session;
const getToken = require('api/core/utils.js').getToken;

/**
 * Delete a specific session from the database.
 * @param {string} token - The client's token.
 * @returns {Promise<SessionSchema, Error>} - Resolves, or rejects with an error.
 */
const logout = async (token) => {
  // Delete the session from the DB.
  const session = await Session.findOneAndRemove({ id: token }).exec();

  return session;
};

/**
 * Delete all of user's sessions from database and change their password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's old password.
 * @param {string} newPassword - The user's new password.
 * @returns {Promise<undefined, Error>} - resolves, or rejects with an error.
 */
const changePassword = async (email, password, newPassword) => {
  try {
    const user = await User.findOne({ email }).exec();

    // No user found for the given email address.
    if (!user) {
      throw authErrors.userNotFoundError;
    }

    const isMatch = await user.comparePassword(password);

    // The wrong password was provided.
    if (!isMatch) {
      throw authErrors.invalidPasswordError;
    }

    await Session.deleteMany({ email });

    const conditions = { email };
    const update = { password: newPassword };
    const options = { new: true };

    await User.findOneAndUpdate(conditions, { $set: update }, options).exec();

    return;
  } catch (err) {
    throw err;
  }
};

/**
 * Delete all of user's sessions from database and change their email.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's old password.
 * @param {string} newEmail - The user's new email.
 * @returns {Promise<undefined, Error>} - resolves, or rejects with an error.
 */
const changeEmail = async (email, password, newEmail) => {
  try {
    const user = await User.findOne({ email }).exec();

    // No user found for the given email address.
    if (!user) {
      throw authErrors.userNotFoundError;
    }

    const isMatch = await user.comparePassword(password);

    // The wrong password was provided.
    if (!isMatch) {
      throw authErrors.invalidPasswordError;
    }

    await Session.deleteMany({ email });

    const conditions = { email };
    const update = { email: newEmail };
    const options = { new: true };

    await User.findOneAndUpdate(conditions, { $set: update }, options).exec();

    return;
  } catch (err) {
    throw err;
  }
};

/**
 * Middleware to verify the token.
 * For valid tokens, an `auth` object is added to the response.locals object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - Invoke the next middleware or route.
 */
const verify = (req, res, next) => {
  const token = getToken(req);

  // If no token is provided, inform the client.
  if (!token) {
    res.locals.err = new Error(authErrors.missingTokenError);
    next();
    return;
  }

  Session.findOne({ id: token }).exec()
    .then((session) => {
      // If no session is found, then the user was logged out of their account.
      if (!session) {
        throw authErrors.invalidSessionError;
      }

      return User.findOne({ email: session.email }).exec();
    })
    .then((user) => {
      // If, for some weird reason, the user isn't found.
      if (!user) {
        throw authErrors.userNotFoundError;
      }

      // Add the token information to `res.locals.auth`.
      res.locals.auth = {
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
        id: user.id,
      };

      next();
    })
    .catch((err) => {
      res.locals.err = err;

      next();
    });
};

/*
 * Middleware to verify the user has access permissions of some document.
 * For valid tokens, an `uid` object is added to the response.locals object.
 * The `uid` object is the uid of the owner of the document being accessed.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - Invoke the next middleware or route.
 */
const validateUidPermissions = (req, res, next) => {
  let uid = res.locals.auth.id;
  if (!uid) {
    res.locals.err = authErrors.missingTokenError;
    next();
    return;
  }
  // TODO(NilsG-S): Why reference req.query when the uid is known to be in res.locals?
  // I'm pretty sure this won't ever do anything...
  if (req.query.uid) {
    if (res.locals.auth.role === 'admin') {
      uid = req.query.uid;
    } else if (req.query.uid !== uid) {
      res.locals.err = authErrors.unauthorizedError;
      console.log('Unauthorized');
      next(authErrors.unauthorizedError);
      return;
    }
  }
  res.locals.uid = uid;
  next();
};

module.exports = {
  changePassword,
  changeEmail,
  logout,
  verify,
  validateUidPermissions,
};
