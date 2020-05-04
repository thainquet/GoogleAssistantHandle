"use strict";

const {
  dialogflow,
  SimpleResponse,
  SignIn,
  BasicCard,
  Image,
  Suggestions,
} = require("actions-on-google");
const functions = require("firebase-functions");
const fetch = require("node-fetch");
const crypto = require("crypto");

const PUBLICKEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtmJ5ebgT7ieQq+0qyRb4
08SkD7DmRjiJX9BhbJuPerDSc/+rxmsXAfZfKJAGkv5YCSyIf2z4cptsygwQkE75
+lggyE38zerXZWKVmiVqol3guSc2n52wuQA0hMCmmk7H0aBnLDGiaG60m5Zqy4IY
NBCc2oAhOPtKJ2oSBLo4pn26jdTwzaWCSsxV6+H43mZkooTWOHUg5hEhWl2JpJmq
lkfGWSrcN1auviI8pxtuvEQNzRtrAHcwbOJcGrCEyUk8gb67wv1KgHbgCklwtWtw
kWcUVYmrvnzKzLrGL/rs0kxrq52EBlsbisKA3hBkIQYOfflKJ1FNuk0f14Hpv+Vl
ZwIDAQAB
-----END PUBLIC KEY-----`;

const app = dialogflow({
  clientId:
    "596655066542-3rl4j8of2gt610roab8dg4vo1b8h189r.apps.googleusercontent.com",
  debug: true,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

const getData = (URL, bodyRequest) => {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyRequest,
  });
};

app.intent("Default Welcome Intent", (conv) => {
  // Do things
  const payload = conv.user.profile.payload;
  if (payload) {
    console.log(conv.user.profile.token); // jw token
    conv.ask("Welcome, maxflow user");
  } else {
    conv.ask(`You have not signed in yet. Call "sign in" to sign in`);
    conv.ask(new Suggestions("sign in"));
  }
});

// Intent that starts the account linking flow.
app.intent("Start Sign-in", (conv) => {
  const payload = conv.user.profile.payload;
  if (payload) {
    conv.ask(`You signed in as ${payload.name}!`);
  } else {
    conv.ask(new SignIn("To get your account details"));
  }
});

// app.intent("Show Me", (conv) => {
//   const payload = conv.user.profile.payload;
//   let { email, name, picture } = payload;
//   conv.ask(
//     new SimpleResponse({
//       speech: "This is your detail information",
//       text: "This is your detail information",
//     })
//   );
//   conv.ask(
//     new BasicCard({
//       text: `Email: ${email}\nName: ${name}`,
//       title: `Your Infomation`,
//       image: new Image({
//         url: picture,
//         alt: "Image alternate text",
//       }),
//       display: "CROPPED",
//     })
//   );
// });

app.intent("Run Workflow", (conv, { workflowName }) => {
  const payload = conv.user.profile.payload;
  if (payload) {
    const email = payload.email;
    const code = crypto
      .publicEncrypt(PUBLICKEY, Buffer.from(email))
      .toString("base64");
    return fetch("https://maxflow.app/api/virtual-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        workflow_name: workflowName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        conv.ask("Success!");
      })
      .catch((error) => {
        console.error("Error:", error);
        conv.ask("Something went wrong!!");
      });
  } else {
    conv.ask(new SignIn("To get your account details"));
  }
});

app.intent("Default Fallback Intent", (conv) => {
  conv.ask(
    "Sorry, I don't know what you've just said. Please speak that again!"
  );
});

app.intent("Get Workflow List", (conv) => {
  const payload = conv.user.profile.payload;
  if (payload) {
    const email = payload.email;
    const code = crypto
      .publicEncrypt(PUBLICKEY, Buffer.from(email))
      .toString("base64");
    console.log("my code: " + code);
    return fetch("https://maxflow.app/api/virtual-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let list = data.data;
        let mesg = "";
        list.forEach((i) => (mesg += i + ","));
        conv.ask(mesg.substring(0, mesg.length - 1));
      })
      .catch((error) => {
        console.error("Error:", error);
        conv.ask("Something went wrong!!");
      });
  } else {
    conv.ask(new SignIn("To get your account details"));
  }
});

app.intent("Get Workflow Status", (conv, { workflowName }) => {
  const payload = conv.user.profile.payload;
  if (payload) {
    const email = payload.email;
    const code = crypto
      .publicEncrypt(PUBLICKEY, Buffer.from(email))
      .toString("base64");
    console.log("my code: " + code);
    return fetch("https://maxflow.app/api/virtual-assistant/wf_complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        workflow_name: workflowName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        conv.ask("ok");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    conv.ask(new SignIn("To get your account details"));
  }
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
