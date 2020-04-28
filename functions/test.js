const https = require('https');
const http = require('http');
const axios = require('axios');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios({
        method: 'POST',
        url: 'https://encrypt-maxflow.herokuapp.com/encrypt',
        data: JSON.stringify({
        "email": 'thainq00@gmail.com'            
        })
   })
.then(res => {
                // console.log(res.data.code)
                let code = res.data.code;
                axios({
                        method: 'POST',
                        url: 'https://maxflow.app/api/virtual-assistant',
                        data: JSON.stringify({
                            "code": code            
                        }),
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false
                        }),
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false
                        })
                    })
                .then(res => console.log(res.data))
                // .catch(err => console.log("error"));
   });