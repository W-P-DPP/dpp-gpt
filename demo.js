/** @format */

const axios = require("axios");

const HttpsProxyAgent = require("https-proxy-agent");
const proxyUrl = "http://127.0.0.1:10809";
const agent = new HttpsProxyAgent.HttpsProxyAgent(proxyUrl);

// const SocksProxyAgent = require("socks-proxy-agent");
// const sockProxyUrl = "socks5://127.0.0.1:10808";
// const sockProxy = new SocksProxyAgent.SocksProxyAgent(sockProxyUrl);

const apiKey = "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"; // 将YOUR_API_KEY替换为您的OpenAI API密钥
const apiUrl = "https://api.openai.com/v1/chat/completions";

const axiosInstance = axios.create({
  httpsAgent: agent,
  // httpsAgent: sockProxy,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

async function callOpenAPI(prompt) {
  const params = {
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.9,
  };
  try {
    const response = await axiosInstance.post(apiUrl, params);
    console.log(response.data.choices[0]);
    // return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

const prompt = "你好";
callOpenAPI(prompt);
// module.exports = callOpenAPI;
