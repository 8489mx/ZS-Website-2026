// Links into the Z Systems cloud app. The marketing site has no auth of its own:
// sign-in and trial signup both happen on the app subdomain.
const APP_ORIGIN = "https://app.zsystemai.com";

export const APP_LOGIN_URL = `${APP_ORIGIN}/login`;
export const APP_TRIAL_URL = `${APP_ORIGIN}/trial`;
