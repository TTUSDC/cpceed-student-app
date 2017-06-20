// import logger from 'logger/logger';
import Connection from 'server/core/connection';
import * as tokenManager from 'server/core/tokenmanager';

/**
 * Creates a new user on the server
 *
 * @param {UserSchema} newUser - The data for the new user
 * @return {Promise<string, Error>} - Promise that resolves with the UID or
 *                                    rejects with the error
 */
export function createUser(newUser) {
  return new Promise((resolve, reject) => {
    new Connection()
        .post()
        .users()
        .data(newUser)
        .call(resolve, reject);
  });
}

/**
 * Deletes a user from the server
 *
 * @param {string} [userUid] - UID of user to be removed, defaults to current
 *                             user's uid
 * @return {Promise<Error>} - Resolves on null, rejects with error
 */
export function deleteUser(userUid) {
  return new Promise((resolve, reject) => {
    const token = tokenManager.getToken();
    const uid = userUid || tokenManager.decode(token).id;
    new Connection()
      .del()
      .users()
      .params({ uid })
      .token()
      .call(resolve, reject);
  });
}

/**
 * Modifies a user on the server
 *
 * @param {Object} data - Data on the user to be updated
 * @param {string} [userUid] - UID of user to be updated, defaults to current
 *                             user's uid
 * @return {Promise<UserSchema, Error>} - Promise that resolves with the
 *                                       modified user or rejects with error
 */
export function modifyUser(data, userUid) {
  return new Promise((resolve, reject) => {
    const token = tokenManager.getToken();
    const uid = userUid || tokenManager.decode(token).id;
    new Connection()
      .put()
      .users()
      .data(data)
      .params({ uid })
      .token()
      .call(resolve, reject);
  });
}

/**
 * Retrieves a user from the server
 *
 * @param {string} [userUid] - UID of user to be updated, defaults to current
 *                             user's uid
 * @return {Promise<userSchema, Error>} - Promise that resolves with the user
 *                                        or rejects with error
 */
export function getUser(userUid) {
  return new Promise((resolve, reject) => {
    const token = tokenManager.getToken();
    const uid = userUid || tokenManager.decode(token).id;
    new Connection()
      .get()
      .users()
      .params({ uid })
      .token()
      .call(resolve, reject);
  });
}
