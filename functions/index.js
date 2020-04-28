'use strict';

const { dialogflow, SimpleResponse, SignIn, BasicCard, Image, Suggestions } = require('actions-on-google');
const functions = require('firebase-functions');
const axios = require('axios');

const app = dialogflow({
  clientId: '596655066542-3rl4j8of2gt610roab8dg4vo1b8h189r.apps.googleusercontent.com',
  debug: true
});
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
app.intent('Default Welcome Intent', (conv) => {
  // Do things
  const payload = conv.user.profile.payload;
  if (payload) {
    console.log(conv.user.profile.token); // jw token
  	conv.ask('Welcome, maxflow user');
  } else {
   	conv.ask(`You have not signed in yet. Call "sign in" to sign in`);
    conv.ask(new Suggestions('sign in')); 
  }
});

// Intent that starts the account linking flow.
app.intent('Start Sign-in', (conv) => {
  const payload = conv.user.profile.payload;
  if (payload) {
  	conv.ask(`You signed in as ${payload.name}!`);
  } else {
    conv.ask(new SignIn('To get your account details'));
  }
});

app.intent("Show Me", conv => {
  const payload = conv.user.profile.payload;
  let { email, name, picture } = payload;
  conv.ask(new SimpleResponse({
    speech: "This is your detail information",
    text: "This is your detail information"
  }));
  conv.ask(new BasicCard({    
    text: `Email: ${email}\nName: ${name}`,
    title: `Your Infomation`,
    image: new Image({
      url: picture,
      alt: 'Image alternate text',
    }),
    display: 'CROPPED',
  })
  );
});

app.intent("Run Workflow", (conv, { workflowName }) => {
  const payload = conv.user.profile.payload;
  let email = payload.email;
  conv.ask(`you choose ${workflowName}`);
  // do sth
});

app.intent("Get Workflow List", conv => {
  const payload = conv.user.profile.payload;
  let email = payload.email;
  axios({
    	 method: 'POST',
         url: 'https://encrypt-maxflow.herokuapp.com/encrypt',
         data: JSON.stringify({
           "email": email            
         })
        }).then(res => {
    let code = res.data;
    axios({
            method: 'POST',
            url: 'https://maxflow.app/api/virtual-assistant',
            data: JSON.stringify({
                "code": code            
            })
          })
    .then(res => console.log(res.data.data));
        });
  conv.ask("note, thai 1");
});

app.intent("Get Workflow Status", conv => {
  const payload = conv.user.profile.payload;
  let email = payload.email;
  conv.ask("success");
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);