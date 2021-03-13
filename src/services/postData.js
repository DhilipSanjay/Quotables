export function PostData(url, userData){
    let baseURL = "http://localhost/Quotables/src/api/";

    return new Promise((resolve, reject) => {
        return fetch(baseURL + url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        });
    });

}