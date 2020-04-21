'use strict';

const { dialogflow, SignIn } = require('actions-on-google');
const functions = require('firebase-functions');
const { SimpleResponse, BasicCard, Image } = require('dialogflow-fulfillment');

const app = dialogflow({
  clientId: '596655066542-3rl4j8of2gt610roab8dg4vo1b8h189r.apps.googleusercontent.com',
  debug: true
});
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
app.intent('Default Welcome Intent', (conv) => {
  // Do things
  conv.ask('Welcome, maxflow user');
});

// Intent that starts the account linking flow.
app.intent('Start Sign-in', (conv) => {
  conv.ask(new SignIn('To get your account details'));
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
  conv.ask("note, thai 1");
});

app.intent("Get Workflow Status", conv => {
  const payload = conv.user.profile.payload;
  let email = payload.email;
  conv.ask("success");
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);