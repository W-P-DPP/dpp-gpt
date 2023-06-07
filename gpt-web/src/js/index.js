/** @format */

export function init() {
  const App = {
    data() {
      return {
        input: "你好",
        msglist: [],
        inputHistort: [],
      };
    },
    methods: {
      async sendMsg() {
        if (!this.input) return;
        let container = document.querySelector(".container");
        this.inputHistort.push(this.input);
        this.msglist.push({ to: "right", msg: this.input });
        const axiosInstance = axios.create({
          baseURL: "http://106.14.121.85:5067",
          //   timeout: 6000,
          headers: { "Content-Type": "application/json" },
        });
        // console.log(axiosInstance);
        const res = await axiosInstance.get("/gpt", { params: { content: this.inputHistort.join("\n") } });
        this.input = "";
        if (res.status !== 200) return;
        // console.log(res);
        this.msglist.push({ to: "left", msg: res.data.content });
        this.$nextTick(() => {
          container.scrollTop = container.scrollHeight;
        });
      },
    },
  };
  const app = Vue.createApp(App);
  app.use(ElementPlus);
  app.mount("#app");
}
