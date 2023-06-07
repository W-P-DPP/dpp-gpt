/** @format */
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

// const HttpsProxyAgent = require("https-proxy-agent");
// const proxyUrl = "http://127.0.0.1:10809";
// const agent = new HttpsProxyAgent.HttpsProxyAgent(proxyUrl);

const SocksProxyAgent = require("socks-proxy-agent");
const sockProxyUrl = "socks5://127.0.0.1:10808";
const sockProxy = new SocksProxyAgent.SocksProxyAgent(sockProxyUrl);

const apiKey = "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"; // 将YOUR_API_KEY替换为您的OpenAI API密钥
const axiosInstance = axios.create({
  //   httpsAgent: agent,
  httpsAgent: sockProxy,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration, undefined, axiosInstance);

module.exports = async function getOpenai(inputHistort) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: inputHistort,
        },
      ],
    });
    // console.log(completion.data.choices[0].message);
    return completion.data;
  } catch (error) {
    console.log(error);
  }
};
