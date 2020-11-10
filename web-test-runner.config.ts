// eslint-disable-next-line
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: ["test/**/*.test.js"],
  preserveSymlinks: true,
  nodeResolve: true,
  testsFinishTimeout: 50000,
  browsers: [playwrightLauncher({ product: "chromium" })],
  coverage: true,
  browserLogs: true,
  testRunnerHtml: (testRunnerImport: any) => `
    <html>
      <body>
        <script type="module">
          window.process = { env: { NODE_ENV: 'production' } };
        </script>
        <script type="module">
          import '${testRunnerImport}';
        </script>
      </body>
    </html>
  `,
};
