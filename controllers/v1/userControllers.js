const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUser(req, res, next) {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({
            status: 200,
            message: "OK",
            data: users
        });
    } catch (error) {
        next(error);
    }
}

async function getSpecificUser(req, res, next) {
    try {
        const params = Number(req.params.id);
        const users = await prisma.user.findUnique({
            where: {
                id: params
            },
            include: {
                profile: true
            }
        });

        if (users) {
            return res.status(200).json({
                status: 200,
                message: "OK",
                data: users
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "Not Found"
            });
        }
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    const body = req.body;
    try {
        if (!body.name || !body.email || !body.password || !body.address) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
        }

        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                profile: {
                    create: {
                        identity_type: "KTP",
                        identity_number: Math.floor(
                            1000000 + Math.random() * 9000000
                        ),
                        address: body.address
                    }
                }
            }
        });

        return res.status(201).json({
            status: 201,
            message: "Created",
            data: newUser
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUser,
    getSpecificUser,
    createUser
};
