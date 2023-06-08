/** @format */

export function init() {
  const App = {
    data() {
      return {
        input: "你好",
        msglist: [],
        inputHistort: [],
        axiosInstance: axios.create({
          baseURL: "http://127.0.0.1:5067",
          // baseURL: "http://106.14.121.85:5067",
          //   timeout: 6000,
          headers: { "Content-Type": "application/json" },
        }),
        container: document.querySelector(".container"),
      };
    },
    methods: {
      async sendMsg() {
        if (!this.input) return;
        this.inputHistort.push(this.input);
        this.msglist.push({ to: "right", msg: this.input, role: "user" });
        this.input = "";
        const inputHistort = this.msglist.map(({ role, msg: content }) => {
          return {
            role,
            content,
          };
        });
        const res = await this.axiosInstance.get("/gpt", { params: { content: JSON.stringify(inputHistort) } });
        if (res.status !== 200) return;
        // console.log(res);
        this.msglist.push({ to: "left", msg: res.data.content, role: "assistant" });
        this.$nextTick(() => {
          this.container.scrollTop = this.container.scrollHeight;
        });
      },
    },
  };
  const app = Vue.createApp(App);
  app.use(ElementPlus);
  app.mount("#app");
}
