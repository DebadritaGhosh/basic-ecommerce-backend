import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { AddressesSchema } from "../schemas/users";
import { prismaClient } from "..";
import { Address, User } from "@prisma/client";
import { BadRequestException } from "../exceptions/bad-request";

export const addAddress = async (req: any, res: Response, next: NextFunction) => {

    AddressesSchema.parse(req.body)

    let user: User;
    try {
        user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: req.user.id
            }
        })

    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)

    }


    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    });

    res.json(address);
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {

    try {
        await prismaClient.address.delete({
            where: {
                id: +req.params.id
            }
        });

        res.json({ success: true });
    } catch (error) {
        throw new NotFoundException("Address not found", ErrorCode.ADDRESS_NOT_FOUND)

    }

}

export const listAddress = async (req: any, res: Response, next: NextFunction) => {

    const addresses = await prismaClient.address.findMany({
        where: {
            userId: req.user.id
        }
    });

    res.json(addresses);

}

export const updateUser = async (req: any, res: Response, next: NextFunction) => {

    const data = req.body
    let shippingAddress: Address;
    let billingAddress: Address

    if (data.defaultShippingAddress) {
        try {
            shippingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: data.defaultShippingAddress
                }
            })
        } catch (error) {
            throw new NotFoundException("Address not found", ErrorCode.ADDRESS_NOT_FOUND);
        }
        if (shippingAddress.userId !== req.user.id) {
            throw new BadRequestException("Address does not belong to user", ErrorCode.ADDRESS_DOES_NOT_BELONG);
        }
    }

    if (data.defaultBillingAddress) {
        try {
            billingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: data.defaultBillingAddress
                }
            })

        } catch (error) {
            throw new NotFoundException("Address not found", ErrorCode.ADDRESS_NOT_FOUND);
        }
        if (billingAddress.userId !== req.user.id) {
            throw new BadRequestException("Address does not belong to user", ErrorCode.ADDRESS_DOES_NOT_BELONG);
        }
    }


    const updatedUser = await prismaClient.user.update({
        where: {
            id: req.user.id
        },
        data: data
    })

    res.json(updatedUser);
}


export const listUsers = async (req: any, res: Response, next: NextFunction) => {
    const users = await prismaClient.user.findMany({
        skip: req.query.skip || 0,
        take: 5
    });

    res.json(users);
}


export const getUserById = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include: {
                addresses: true
            }
        })
        res.json(user);
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);

    }
}


export const changeUserRole = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await prismaClient.user.update({
            where: {
                id: +req.params.id
            },
            data: {
                role: req.body.role
            }
        })
        res.json(user);
    } catch (error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);

    }
}