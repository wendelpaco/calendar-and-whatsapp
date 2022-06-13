import { App } from './app';

// function auto-run() 
(() => {
  const app = new App().express;
  app.listen(app.get('port'))
  console.log(`⚡️ Server listening on ${process.env.SCHEMA}://${process.env.HOST_NAME}:${process.env.PORT} ⚡️`);
})()
