const https = require('https');
const http = require('http');
const axios = require('axios');
const fetch = require('node-fetch');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

axios({
        method: 'POST',
        url: 'https://encrypt-maxflow.herokuapp.com/encrypt',
        data: JSON.stringify({
        "email": 'thainq00@gmail.com'            
        })
   })
.then(res => {
                console.log(res.data.code)
                let code = res.data.code;
                fetch('https://maxflow.app/api/virtual-assistant', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "code": code
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        let list = data.data;
                  		let mesg = '';
                        list.forEach(i => mesg += i + ',');
                        console.log(mesg.substring(0, mesg.length-1));  
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
   });