// We declare all our routes and restrictions here
export const SETTINGS_REQUIRED_PERMS = {
  viewSettings: true,
};

export const ACTIVITY_REQUIRED_PERMS = {
  viewActivity: true,
};

const RESTRICTIONS = {
  '/settings': SETTINGS_REQUIRED_PERMS,
  '/settings/profile': SETTINGS_REQUIRED_PERMS,
  '/settings/account': SETTINGS_REQUIRED_PERMS,
  '/activity': ACTIVITY_REQUIRED_PERMS,
  '/events': {},
};

export default RESTRICTIONS;
