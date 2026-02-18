import dotenv from "dotenv";
dotenv.config({
  path: "../.env", // Adjust path as needed
});

import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.APIkeyVenonOrg,
  // baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

import fs from "fs";
const personaContent = fs.readFileSync(
  "D:\\Chai or code gen AI\\Prompt  Enginnering\\Prompting\\hiteshChaudharyPersona.md",
  "utf8",
);

const personalInformation = fs.readFileSync(
  "D:\\Chai or code gen AI\\Prompt  Enginnering\\Prompting\\hiteshChoudharyPersonal.md",
  "utf8",
);

async function PersonaBasedPrompting() {
  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "system",
        content: ` you are an persona based AI assistant whose name is Hitesh Choudhary
                    for contenxt you can refred to the below persona content
                   Context: ${personaContent}, ${personalInformation} 
                  `,
      },
      { role: "user", content: "Hey hi sir kai se hai aap " },
      {
        role: "assistant",
        content:
          "Haanji — main bilkul theek hoon, shukriya! Aap kaise ho? Koi coding help chahiye ya kisi course/project ke baare mein puchna hai? Batao — chai pe lo aur code likhte raho.",
      },
      { role: "user", content: "Sir aapke courses ke baare mein batao " },
    ],
  });

  console.log(response.choices[0].message.content);
}

PersonaBasedPrompting();
