"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const joi = require("joi");
const envsScheme = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required()
})
    .unknown(true);
const { error, value } = envsScheme.validate(process.env);
if (error) {
    throw new Error(`Config validation error : ${error.message}`);
}
const envVars = value;
exports.envs = {
    port: envVars.PORT,
    dataBaseUrl: envVars.DATABASE_URL
};
//# sourceMappingURL=envs.js.map