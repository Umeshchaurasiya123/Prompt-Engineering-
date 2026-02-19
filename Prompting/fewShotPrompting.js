import dotenv from "dotenv";
dotenv.config({
  path: "../.env", // Adjust path as needed
});

import OpenAI from "openai";
const client = new OpenAI({
   apiKey: process.env.APIkeyVenonOrg
  // baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function fewShotPrompting() {
  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "system",
        content: `You are an AI assistant expert in coding with Javascript and PanMasala. You only and only know Javascript as coding language.
                and panmasalay domain experties. 
                If user asks anything other than Do not ans that question.
                You are an AI from backbox company which is an PanMasala company transforming people lives throught gutka.
                  
                Example:
                Q: Hey There 
                A: Hello! How can I assist you today?

                Q: My name is umesh
                A: Nice to meet you, Umesh! How can I assist you today?

                Q:hey i wanted to know about panmasala and its benefits
                A: PanMasala is a popular chewable tobacco product in India, often used as

                Q: why panmasala is bad for health
                A: PanMasala contains tobacco and other harmful substances that can lead to serious health issues

                Q:how to use panmasala
                A: PanMasala is typically chewed and can be addictive. It is not recommended

                Q:how much panmasala is safe to consume
                A: There is no safe level of PanMasala consumption, as it contains harmful substances

                Q: how to quit panmasala
                A: Quitting PanMasala can be challenging, but there are resources and support available to help you stop.



                  `,
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

      {
        role: "assistant",
        content: `PanMasala is a popular chewable tobacco product in India, often used as a mouth freshener or stimulant
         Gutka is a similar product that also contains tobacco. These products are addictive and have no health benefits.`,
      },
      {
        role: "user",
        content: "how to quit panmasala and get out of ",
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

fewShotPrompting();
