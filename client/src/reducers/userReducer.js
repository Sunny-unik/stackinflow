export function user(state = null, action) {
  const switchUser = {
    LOGIN_USER: action.payload,
    UPDATE_USER: action.payload,
    LOGOUT_USER: null
  };

  return switchUser.hasOwnProperty(action.type)
    ? switchUser[action.type]
    : state;
}
