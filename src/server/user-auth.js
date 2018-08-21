import store from 'redux/store.js';
import { updateUser, logoutUser } from 'redux/actions/userActions';
import Connection from 'server/core/connection';

// Will default to passing an fake user when not in production

const { NODE_ENV } = process.env;
/**
 * Attempt to login using email and password.
 * @param {String} email - The email address.
 * @param {String} password - The password.
 * @return {Promise<Object, Error>} - Promise that resolves with the user's
 *                                    data or rejects with an error.
 */
export function login(email, password) {
  return new Promise((resolve, reject) => {
    const onSuccess = (res) => {
      store.dispatch(updateUser(res.user));
      resolve(res.user);
    };

    if (NODE_ENV === 'development') {
      import('server/core/utils/users.mock.js')
        .then((mocks) => {
          onSuccess({ user: mocks.default });
        });
    } else {
      new Connection()
        .post()
        .auth()
        .data({ email, password })
        .call(onSuccess, reject);
    }
  });
}

/**
 * Attempt to logout.
 * @return {Promise<undefined, Error>} - Promise that resolves as undefined or
 *                                       rejects with an error.
 */
export function logout() {
  return new Promise((resolve, reject) => {
    const onSuccess = () => {
      store.dispatch(logoutUser());
      resolve();
    };

    new Connection()
      .del()
      .auth()
      .call(onSuccess, reject);
  });
}
