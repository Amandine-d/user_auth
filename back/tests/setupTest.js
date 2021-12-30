const mongoose = require("mongoose");
const server = require("../src/server");

const closeApp = () =>
  new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

afterAll(async () => {
  await closeApp();
  await mongoose.disconnect();
  //FIXME  run yarn test --detectOpenHandles to fix error
  // Jest did not exit one second after the test run has completed.
  // Jest has detected the following 2 open handles potentially keeping Jest from exiting
});
