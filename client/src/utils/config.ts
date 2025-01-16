import { getLocalStorage, localStorageNames } from "./storageUtils";

export const API_BASE_URL = "/api";
export const API_MAIN_URL = `${API_BASE_URL}/v1/design`;

export const AUTHORIZATION_HEADER = {
  headers: {
    Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
  },
};
