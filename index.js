require('dotenv').config();
const app = require('./src/app');

const port = process.env.webport || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`[A] Listening on port: ${port}`);
  /* eslint-enable no-console */
});
