export function parseJSON(response) {
     return response.json()
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return response
    } else {
        var error = new Error(response.statusText)
        console.log(response)
        error.response = response
        throw error
    }
}
