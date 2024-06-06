import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from "@prisma/client";
import { PaginitationDto } from 'src/common';
import { NotFoundError } from 'rxjs';
@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductService')
  async onModuleInit() {
    await this.$connect();
    this.logger.log('database conected')
  }
  create(createProductDto: CreateProductDto) {

    return this.product.create({
      data: createProductDto
    })
    return 'This action adds a new product';
  }

  async findAll(paginationDto: PaginitationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.product.count();
    const lastPages = Math.ceil(totalPages / limit)
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
    }
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: { id }
    });
    if (!product) {
      throw new NotFoundException(`Product whit #${id} not found`)
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.product.update({
      where: { id },
      data: updateProductDto
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.product.delete({
      where: {id}
    })
  }
}
