'use strict';

const {dialogflow, SignIn} = require('actions-on-google');
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Suggestion} = require('dialogflow-fulfillment');


const agent = new WebhookClient({request: request, response: response});
const app = dialogflow({
  clientId: '596655066542-3rl4j8of2gt610roab8dg4vo1b8h189r.apps.googleusercontent.com',
  debug: true
});
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
app.intent('Default Welcome Intent', (conv) => {
  // Do things
  conv.ask('Welcome, maxflow user');
  conv.ask("Not signed in yet.");
  conv.ask(new Suggestion("want to sign in"));
});

app.intent('Sign in', (conv, params, signin) => {
  conv.ask(new SignIn());
  if (signin.status !== 'OK') {
    return conv.ask('You need to sign in before using the app.');
  }
  const access = conv.user.access.token;
  console.log("access token", access);
  // possibly do something with access token
  return conv.ask('Great! Thanks for signing in.');
});

exports.dialogflowFirebaseFulfillment  = functions.https.onRequest(app);