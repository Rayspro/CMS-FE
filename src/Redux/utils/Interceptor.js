axios.interceptors.response.use(response => {
    return response;
}, err => {
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest ){
            
            originalReq._retry = true;

            let res = fetch('http://localhost:8080/api/v1/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Device': 'device',
                    'Token': localStorage.getItem("token")
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    refresh_token: localStorage.getItem("refresh_token")
                }),
            }).then(res => res.json()).then(res => {
                console.log(res);
                this.setSession({token: res.token, refresh_token: res.refresh});
                originalReq.headers['Token'] = res.token;
                originalReq.headers['Device'] = "device";
                return axios(originalReq);
            });
            resolve(res);
        }
        return Promise.reject(err);
    });
});