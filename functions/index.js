'use strict';

const { dialogflow, SignIn } = require('actions-on-google');
const functions = require('firebase-functions');
const { Suggestion, BasicCard, Image } = require('dialogflow-fulfillment');

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
  let email = payload.email;
  conv.ask(`your email: ${email}`);
});

app.intent("Run Workflow", conv => {
  const payload = conv.user.profile.payload;
  let email = payload.email;
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