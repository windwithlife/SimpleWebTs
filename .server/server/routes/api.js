"use strict";
//? this file provide some soa api to others
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
router.get("/test", function (req, res, next) {
    res.json({ name: "fzhange", sex: "man" });
});
router.post("*", async function (req, res, next) {
    res.json({
        test: 11
    });
});
exports.default = router;
//# sourceMappingURL=api.js.map