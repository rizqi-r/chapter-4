const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getTransaction(req, res, next) {
    try {
        const users = await prisma.transaction.findMany();
        return res.status(200).json({
            status: 200,
            message: "OK",
            data: users
        });
    } catch (error) {
        next(error);
    }
}

async function getSpecificTransaction(req, res, next) {
    try {
        const params = Number(req.params.id);
        const users = await prisma.transaction.findUnique({
            where: {
                id: params
            },
            include: {
                destination_account_transaction: true,
                source_account_transaction: true
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

async function createTransaction(req, res, next) {
    const body = req.body;
    try {
        if (!body.source || !body.destination || !body.amount) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
        }

        if (body.source == body.destination) {
            return res.status(400).json({
                status: 400,
                message: "ID pengirim dan ID penerima tidak boleh sama"
            });
        }

        const sourceBalance = await prisma.bank_Account.findUnique({
            where: {
                id: Number(body.source)
            }
        });

        const destinationBalance = await prisma.bank_Account.findUnique({
            where: {
                id: Number(body.destination)
            }
        });

        if (sourceBalance - Number(body.amount) < 0) {
            return res.status(400).json({
                status: 400,
                message: "Saldo Tidak Cukup"
            });
        }

        const newTransaction = await prisma.transaction.create({
            data: {
                amount: Number(body.amount),
                source_account_id: Number(body.source),
                destination_account_id: Number(body.destination)
            }
        }).then(async () => {
            await prisma.bank_Account.update({
                data: {
                    balance: sourceBalance.balance - Number(body.amount)
                },
                where: {
                    id: Number(body.source)
                }
            }).then(async () => {
                await prisma.bank_Account.update({
                    data: {
                        balance: destinationBalance.balance + Number(body.amount)
                    },
                    where: {
                        id: Number(body.destination)
                    }
                });
            });
        });

        return res.status(201).json({
            status: 201,
            message: "Created",
            data: newTransaction
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTransaction,
    getSpecificTransaction,
    createTransaction
};
