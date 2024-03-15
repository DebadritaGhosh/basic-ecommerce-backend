import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { ProductSchema } from "../schemas/products";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {

    // ProductSchema.parse(req.body);

    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    });

    res.json(product);

}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.tags.join(',')
        }
        const updatedProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: product
        });

        res.json(updatedProduct);


    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const deletedProduct = await prismaClient.product.delete({
            where: {
                id: +req.params.id

            }
        })

        res.json(deletedProduct);

    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const listProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await prismaClient.product.count();
        let skip: any = req.query.skip;
        const products = await prismaClient.product.findMany({
            skip: +skip || 0,
            take: 5
        });
        res.json({
            count, data: products
        })
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)

    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        })

        res.json(product);

    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
}
