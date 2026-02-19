import dotenv from "dotenv";
dotenv.config({
  path: "../.env", // Adjust path as needed
});

import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.APIkeyVenonOrg,
  
});

const entropicClient = new OpenAI({
  apiKey: process.env.ToGetherAiApiKey,
  baseURL: "https://api.together.xyz/v1",
});

async function chain_of_thought() {
  const SYSTEM_PROMPT = ` 
    You are an AI assistant who works on START, THINK and OUTPUT format.
    For a given user query first think and breakdown the problem into sub problems.
    You should always keep thinking and thinking before giving the actual output.
    Also, before outputing the final result to user you must check once if everything is correct.

    Rules:
    - Strictly follow the output JSON format
    - Always follow the output in sequence that is START, THINK, EVALUATE and OUTPUT.
    - After evey think, there is going to be an EVALUATE step that is performed manually by someone or you may be and you need to wait for it.
    - Always perform only one step at a time and wait for other step.
    - Alway make sure to do multiple steps of thinking before giving out output.

    Output JSON Format:
    { "step": "START | THINK | EVALUATE | OUTPUT", "content": "string" }

    Example:
    User: Can you solve 3 + 4 * 10 - 4 * 3
    ASSISTANT: { "step": "START", "content": "The user wants me to solve 3 + 4 * 10 - 4 * 3 maths problem" } 
    ASSISTANT: { "step": "THINK", "content": "This is typical math problem where we use BODMAS formula for calculation" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "Lets breakdown the problem step by step" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "As per bodmas, first lets solve all multiplications and divisions" }
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" }  
    ASSISTANT: { "step": "THINK", "content": "So, first we need to solve 4 * 10 that is 40" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "Great, now the equation looks like 3 + 40 - 4 * 3" }
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, let me evaluate the current state of the equation" } 
    ASSISTANT: { "step": "THINK", "content": "Now, I can see one more multiplication to be done that is 4 * 3 = 12" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, let me do calculation again whetejr it is correct or not" } 
    ASSISTANT: { "step": "THINK", "content": "Great, now the equation looks like 3 + 40 - 12" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "As we have done all multiplications lets do the add and subtract" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, let me check the whole calculation again " } 
    ASSISTANT: { "step": "THINK", "content": "so, 3 + 40 = 43" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "new equations look like 43 - 12 which is 31" } 
    ASSISTANT: { "step": "EVALUATE", "content": "let me compute the whole things with my self and evaluate eveything is correct or not" } 
    ASSISTANT: { "step": "THINK", "content": "great, all steps are done and final result is 31" }
    ASSISTANT: { "step": "EVALUATE", "content": "All seem  correct. let me do the whole calculation again to be sure and match the result" }  
    ASSISTANT: { "step": "OUTPUT", "content": "3 + 4 * 10 - 4 * 3 = 31" } 
  `;

  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    // { role: "user", content: "write a code in java script to find the factorial of a number" }, 
    { role: "user", content: "Hey can you solve -3+1+4*12-12+12*1/3+4*123.5" },
  ];

  // Start the chain of thought process

  while (true) {
    const response = await client.chat.completions.create({
      model: "gpt-5-mini",
      messages: messages,
      response_format: { type: "json_object" },
    });
    //Raw content is in string
    const content = response.choices[0].message.content;

    //console.log(`Raw response:`, content);
    const parsedContent = JSON.parse(content);
    console.log(`Parsed response:`, parsedContent);

    messages.push({
      role: "assistant",
      content: JSON.stringify(parsedContent),
    });

    if (parsedContent.step == "START") {
      console.log(`start-->>`, parsedContent.content);

      continue;
    }

    if (parsedContent.step == "THINK") {
      console.log(`think-->`, parsedContent.content);

      continue;
    }
    if (parsedContent.step == "EVALUATE") {
      messages.push({
        role: "assistant",
        content: JSON.stringify(parsedContent),
      });
      console.log(`evaluate-->`, parsedContent.content);

      continue;
    }

    if (parsedContent.step == "OUTPUT") {
      messages.push({
        role: "assistant",
        content: parsedContent.content,
      });
      console.log(`output-->`, parsedContent.content);
      break;
    }
  }
}

chain_of_thought();

async function entropicAsJudge(message) {
  const response = await entropicClient.chat.completions.create({
    // model: "claude-opus-4-1-20250805",
    model: "meta-llama/Llama-3-8b-chat-hf",

    messages: message,
  });
  return JSON.parse(response.choices[0].message.content);
}
