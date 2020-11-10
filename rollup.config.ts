import merge from "deepmerge";
import { createSpaConfig } from "@open-wc/building-rollup";

const baseConfig = createSpaConfig({
  outputDir: "build",
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  input: "./index.html",
  onwarn(warning: any) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === "THIS_IS_UNDEFINED") {
      return;
    }

    // console.warn everything else
    console.warn(warning.message);
  },
});
