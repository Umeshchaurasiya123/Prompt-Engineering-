import dotenv from "dotenv";
dotenv.config({
  path: "../.env", // Adjust path as needed
});

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.APIkeyVenonOrg,
  // baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function zeroShortPrompting() {
  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
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
        content: "tell me about panmasala and its benefits also gutka ",
      },
    ],
  });

  console.log(response.choices[0].message.content);
  console.log(`Raw response:`, response.choices[0].message);
  console.log(`Response object:`, response);  
}
  
zeroShortPrompting();

/*
import OpenAI from "openai";

const openai = new OpenAI({
  
  apiKey: process.env.APIkeyVenonOrg,
});

const response = openai.responses.create({
  model: "gpt-5-nano",
  input: "write a poem in hindi on nature and its beauty in 400 lines",
  store: true,
});

response.then((result) => console.log(result.output_text));


*/
