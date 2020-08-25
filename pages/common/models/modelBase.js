
var axios = require('axios');


function getToken() {
    const isServer = typeof window === 'undefined';
    let access_token = "null";
    if (!isServer) {
        access_token = sessionStorage.getItem("token");
    } else {
        //access_token = 
    }
    console.log('access_token===>' + access_token);
    return access_token;
}





axios.defaults.withCredentials = true;
axios.defaults.headers = {
    "content-type": "application/json",           // 设置传输类型(json,form表单)
    "Authorization": getToken()    // token
}



var get = function (path, params, cb) {
    axios.get(path, { params: params }, {
         headers: { "token": getToken(),"Authorization": getToken()} 
        }).then(function (response) {
        if (response.status == 200) {
            cb(response);
        } else {
            console.log("Error Message:" + response.data);
            cb();
        }

    }).catch(function (error) {
        console.log(error);
        cb();
    });
}
var post = function (path, params, cb) {
    //console.log("params in axios:"+JSON.stringify(params));
    axios.post(path, params, { 
        headers: { "token": getToken(),"Authorization": getToken()} 
    }).then(function (response) {
        cb(response);
    })
        .catch(function (error) {
            console.log(error);
            cb();
        });
}

module.exports = {
    get: get,
    post: post
}