import { store } from "../store";

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method: any) {
  return (url : any, body?: any) => {
    const requestOptions = {
      method,
      headers: {} as any,
    } as any;
    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body  = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

// helper functions

function handleResponse(response: any) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
