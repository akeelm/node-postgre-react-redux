import fetch from 'isomorphic-fetch';

export function parseJSON(response) {
   return response.json();
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function api_fetch(url, body = undefined, method = 'get') {
  return fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  });
}
