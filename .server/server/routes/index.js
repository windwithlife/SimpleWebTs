"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const InitRouter = app => {
    const router = express_1.default.Router();
    router.get('/test', function (req, res, next) {
        app.render(req, res, "/test", {});
    });
    return router;
};
exports.default = InitRouter;
//# sourceMappingURL=index.js.map