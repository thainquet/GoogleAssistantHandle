// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const axios = require('axios');
const {
  dialogflow,
  SignIn
} = require("actions-on-google");

axios.get('https://simple-server-for-dummydata.herokuapp.com/')
.then(res => res.json())
.then(res => console.log(res));

const app = dialogflow({
  clientId: '596655066542-3rl4j8of2gt610roab8dg4vo1b8h189r.apps.googleusercontent.com'
});

app.intent("Sign in", conv => {
  conv.ask(new SignIn("To personalize"));
});


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response, app) => {
  console.log(app)
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  
  
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  function runWorkflow(agent) {
    const param = request.body.queryResult.parameters.workflowName;
    agent.add(`You chose ${param}, right?`);
    // agent.add(new Card({
    //     title: `Title: this is a card title`,
    //     imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
    //     text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //     buttonText: 'This is a button',
    //     buttonUrl: 'https://assistant.google.com/'
    //   })
    // );
  }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  function googleAssistantHandler(agent) {
    
//  agent.intent('ask_for_sign_in_detail', (conv) => {
//   conv.ask(new SignIn());
// });
    let conv = agent.conv(); // Get Actions on Google library conv instance
    conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    agent.add(conv); // Add Actions on Google library responses to your agent's response
  }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Run Workflow', runWorkflow);
  // intentMap.set('your intent name here', yourFunctionHandler);
  intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
