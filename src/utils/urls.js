const BASE_URL = "/api/taskapp/v1";

export const USER_URLS = {
  LOGIN: `${BASE_URL}/user/login`,
  LOGOUT: `${BASE_URL}/user/logout`,
  SIGNUP: `${BASE_URL}/user/register`,
  FORGOT_PASSWORD: `${BASE_URL}/user/reset-password`,
  RESET_PASSWORD: `${BASE_URL}/user/change-password`,
  VALIDATE_AND_RESET_PASSWORD: `${BASE_URL}/user/validate-and-reset`,
  GET_USER: `${BASE_URL}/user/view`,
  UPDATE_USER: `${BASE_URL}/user/update`,
  DELETE_USER: `${BASE_URL}/user/delete`,
  REFRESH_TOKEN: `${BASE_URL}/user/refresh-token`,
  UPDATE_AVATAR: `${BASE_URL}/user/update-avatar`,
};
