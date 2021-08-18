"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const next_1 = tslib_1.__importDefault(require("next"));
const index_1 = tslib_1.__importDefault(require("./routes/index"));
// import adminRoute from "./routes/admin";
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
const port = parseInt(process.env.PORT, 10) || 3000;
const IS_DEV = process.env.NODE_ENV == 'development';
const app = next_1.default({ dev: IS_DEV });
const handle = app.getRequestHandler();
const indexRoute = index_1.default(app);
logger_1.default.info(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
app.prepare().then(() => {
    const server = express_1.default();
    //   server.use('/birds', indexRoute);
    //   server.use("/api",apiRoute);
    server.get(`/slbhealthcheck.html`, (req, res) => {
        logger_1.default.info(`App is running! environment:${process.env.NODE_ENV || "unknown"}`);
        res.send(`App is running! environment:${process.env.NODE_ENV || "unknown"}`);
    });
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, () => {
        logger_1.default.info(`> Ready on http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map