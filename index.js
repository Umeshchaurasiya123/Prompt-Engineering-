import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.APIKEYGEMMINI,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function basic() {
  const response = await client.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: "Hey, how are you doing and what are you doing?",
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

async function basic2() {
  const response = await client.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: "Hey, how are you doing and what are you doing?",
      },
      {
        role: "assistant",
        content: "Hello! I'm doing well, thank you. I'm here to assist you ",
      },
      {
        role: "user",
        content: "Can you know my name? ",
      },
      {
        role: "assistant",
        content:
          "I don't know your name yet, but if you tell me, I can remember it for our conversation.",
      },
      {
        role: "user",
        content: "My name is umesh",
      },
      {
        role: "assistant",
        content: "Nice to meet you, Umesh! How can I assist you today?",
      },
      {
        role: "user",
        content: "What is my name?",
      },
    ],
  });

  console.log(response.choices[0].message.content);
}


async function zeroShortPrompting() {
  const response = await client.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "system",
        content: `You are an AI assistant expert in coding with Javascript and PanMasala. You only and only know Javascript as coding language.
                  and panmasalay domain experties. 
                  If user asks anything other than Do not ans that question.
                  You are an AI from backbox company which is an PanMasala company transforming people lives throught gutka.`,
      },
      { role: "user", content: "Hey gpt, My name is umesh " },
      {
        role: "assistant",
        content: "Hello umesh! How can I assist you today?",
      },
      { role: "user", content: "What is my name?" },
      {
        role: "assistant",
        content: "Your name is umesh. How can I help you further?",
      },
      {
        role: "user",
        content: "telle me about panmasala and its benefits also gutka ",
      },
    ],
  });

  console.log(response.choices[0].message.content);

}

basic();
basic2();
zeroShortPrompting();

// const response = await client.chat.completions.create({
//   model: "gemini-2.0-flash",
//   messages: [
//     {
//       role: "system",
//       content: `
//                 You're an AI assistant expert in coding with Javascript. You only and only know Javascript as coding language.
//                 If user asks anything other than Javascript coding question, Do not ans that question.
//                 You are an AI from ChaiCode which is an EdTech company transforming modern tech knowledge. Your name is ChaiCode and always ans as if you represent ChaiCode

//                 Examples:
//                 Q: Hey There
//                 A: Hey, Nice to meet you. How can I help you today? Do you want me to show what we are cooking at ChaiCode.

//                 Q: Hey, I want to learn Javascript
//                 A: Sure, Why don't you visit our website ot YouTube at chaicode for more info.

//                 Q: I am bored
//                 A: What about a JS Quiz?

//                 Q: Can you write a code in Python?
//                 A: I can, but I am designed to help in JS
//             `,
//     },
//     { role: "user", content: "Hey gpt, My name is Piyush Garg" },
//     {
//       role: "assistant",
//       content: "Hello Piyush Garg! How can I assist you today?",
//     },
//     { role: "user", content: "What is my name?" },
//     {
//       role: "assistant",
//       content: "Your name is Piyush Garg. How can I help you further?",
//     },
//     {
//       role: "user",
//       content: "Hey, what is my name again?",
//     },
//     {
//       role: "assistant",
//       content: "Your name is Piyush Garg. How can I assist you today?",
//     },
//     {
//       role: "user",
//       content: "lets write factorial code in and javascript",
//     },
//   ],
// });

//console.log(response.choices[0].message.content);
