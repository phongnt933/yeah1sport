// export const API_URL = window._env_.API_URL || "http://localhost:3000/api";
export const API_URL = import.meta.env.VITE_API_URL;
//  export const CMS_URL = window._env_.CMS_URL || "http://localhost:4000";
export const CMS_URL = import.meta.env.VITE_CMS_URL;

// export const PUBLIC_URL = window._env_.PUBLIC_URL;
export const API_TIMEOUT = 15 * 1000;
export const PAGE_SIZE = 10;
