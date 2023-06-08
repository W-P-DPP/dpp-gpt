/** @format */

const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_KEY",
});

const HttpsProxyAgent = require("https-proxy-agent");
const proxyUrl = "http://127.0.0.1:10809";
const agent = new HttpsProxyAgent.HttpsProxyAgent(proxyUrl);
const apiKey = "YOUR_OPENAI_KEY"; // 将YOUR_API_KEY替换为您的OpenAI API密钥

const axiosInstance = axios.create({
  httpsAgent: agent,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

const openai = new OpenAIApi(configuration, undefined, axiosInstance);

async function getOpenAiApi() {
  try {
    // 调用 OpenAI API 进行聊天
    const response = await openai.ChatCompletion.create({
      model: "gpt-3.5-turbo",
      messages: chatInput.messages,
    });

    // 提取模型生成的回复
    const reply = response.data.choices[0].message.content;
    console.log("Assistant:", reply);
  } catch (error) {
    console.error("Error:", error);
  }
}

getOpenAiApi();
