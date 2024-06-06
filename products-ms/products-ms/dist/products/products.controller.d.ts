import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    } | "This action adds a new product">;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
