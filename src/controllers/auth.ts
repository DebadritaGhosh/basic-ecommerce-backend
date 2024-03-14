import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schemas/users";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
        next(new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND));
        throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);

    }

    if (!compareSync(password, user.password)) {
        next(new BadRequestException("Incorrect password", ErrorCode.INCORRECT_PASSWORD));
    }

    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET);

    res.json({ user, token })

}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        SignUpSchema.parse(req.body);
        const { email, password, name } = req.body;

        let user = await prismaClient.user.findFirst({ where: { email } });

        if (user) {
            next(new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS));
        }

        user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        });

        res.json(user);
    } catch (error: any) {
        next(new UnprocessableEntity(error?.issues, "Unprocessable entity", ErrorCode.UNPROCESSABLE_ENTITY));

    }


}