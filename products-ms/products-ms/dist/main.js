"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const envs_1 = require("./config/envs");
async function bootstrap() {
    const logger = new common_1.Logger('main');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    await app.listen(envs_1.envs.port);
    logger.log("aplication running on port ", envs_1.envs.port);
}
bootstrap();
//# sourceMappingURL=main.js.map