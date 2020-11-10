import proxy from "koa-proxies";

export default {
  port: 8000,
  watch: true,
  nodeResolve: true,
  preserveSymlinks: true,
  dedupe: true,
  appIndex: "./index.html",
};
