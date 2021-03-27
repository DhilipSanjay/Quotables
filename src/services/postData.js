function PostData(url, token, userData){
    let baseURL = "http://localhost/Quotables/backend/api/";
    return new Promise((resolve, reject) => {
        return fetch(baseURL + url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
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

export default PostData;