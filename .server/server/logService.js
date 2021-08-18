"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const serve_handler_1 = tslib_1.__importDefault(require("serve-handler"));
const http = tslib_1.__importStar(require("http"));
const deploy_config_json_1 = tslib_1.__importDefault(require("../deploy.config.json"));
const logCategoryPath = deploy_config_json_1.default.production.pm2_log_path_prefix;
const server = http.createServer((request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/vercel/serve-handler#options
    return serve_handler_1.default(request, response, {
        public: logCategoryPath
    });
});
server.listen(3002, () => {
    console.log('Running at http://localhost:3002');
});
//# sourceMappingURL=logService.js.map