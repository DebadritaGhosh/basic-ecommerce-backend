import { Request, Response } from "express";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { CartItem, Product } from "@prisma/client";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad-request";

export const addItemToCart = async (req: any, res: Response) => {
    let product: Product;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: +req.body.productId
            }
        })
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }

    const cart = await prismaClient.cartItem.create({
        data: {
            userId: req.user.id,
            productId: product.id,
            quantity: req.body.quantity
        }
    });

    res.json(cart);
}

export const deleteItemFromCart = async (req: Request, res: Response) => {
    try {
        await prismaClient.cartItem.delete({
            where: {
                id: +req.params.id
            }
        })
        res.json({
            success: true
        });
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const changeQuantity = async (req: Request, res: Response) => {
    const data = req.body;

    const updatedCart = await prismaClient.cartItem.update({
        where: {
            id: +req.params.id
        },
        data: {
            quantity: data.quantity
        }
    });

    res.json(updatedCart);
}

export const getCart = async (req: any, res: Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    });

    res.json(cart);
}