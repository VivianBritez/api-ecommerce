"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ProductsService = class ProductsService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('ProductService');
    }
    async onModuleInit() {
        await this.$connect();
        this.logger.log('database conected');
    }
    create(createProductDto) {
        return this.product.create({
            data: createProductDto
        });
        return 'This action adds a new product';
    }
    async findAll(paginationDto) {
        const { page, limit } = paginationDto;
        const totalPages = await this.product.count();
        const lastPages = Math.ceil(totalPages / limit);
        return {
            data: await this.product.findMany({
                skip: (page - 1) * limit,
                take: limit
            }),
            meta: {
                total: totalPages,
                page: page,
                lastPage: lastPages
            }
        };
    }
    async findOne(id) {
        const product = await this.product.findFirst({
            where: { id }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product whit #${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        await this.findOne(id);
        return this.product.update({
            where: { id },
            data: updateProductDto
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.product.delete({
            where: { id }
        });
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map