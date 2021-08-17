import express from "express";
import {Request,Response,Application} from "express";
import next from 'next'
import bodyParser from "body-parser";
import initRouteWrapper from "./routes/index";
import apiRoute from "./routes/api"
// import adminRoute from "./routes/admin";
import logger from "./utils/logger";



const port = parseInt(process.env.PORT, 10) || 3000;
const IS_DEV = process.env.NODE_ENV == 'development';
const app = next({ dev:IS_DEV });
const handle = app.getRequestHandler();

const indexRoute = initRouteWrapper(app);

logger.info(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)

app.prepare().then(() => {
  const server:Application = express();
//   server.use('/birds', indexRoute);
//   server.use("/api",apiRoute);

  server.get(`/slbhealthcheck.html`, (req:Request, res:Response) => {
    logger.info(`App is running! environment:${process.env.NODE_ENV || "unknown"}`);
    res.send(`App is running! environment:${process.env.NODE_ENV || "unknown"}`)
  })

  server.all('*', (req:Request, res:Response) => {
    return handle(req, res);
  })

  server.listen(port, () => {
    logger.info(`> Ready on http://localhost:${port}`);
  })
})
