const prisma = require('../utils/prisma')

exports.newInvoice = async (req, res) => {

    let { title, articulos, userId, pagado } = req.body

    if (!userId) {
        return res.status(400).json({
            message: 'UserId is required'
        })
    }

    if (pagado == 'true') {
        pagado = true
    } else {
        pagado = false
    }

    const items = articulos.reduce((acc, articulo) => acc + parseInt(articulo.cantidad), 0)
    const ivaTotal = articulos.reduce((acc, articulo) => acc + parseFloat(articulo.ivaTotal), 0)
    const totalValue = articulos.reduce((acc, articulo) => acc + parseFloat(articulo.precioFinal), 0)

    const newInvoice = await prisma.factura.create({
        data: {
            title,
            pagado,
            userId: userId,
            items,
            ivaTotal,
            totalValue,
            articulo: {
                create: articulos
            }
        }
    })
    res.status(200).json({ factura: newInvoice });
}

exports.updateInvoice = async (req, res) => {

    let { title, articulos, pagado, userId } = req.body
    const { id } = req.query

    if (pagado == 'true' || pagado != 'false') {
        pagado = true
    } else {
        pagado = false
    }

    const checkInvoice = await prisma.factura.findUnique({
        where: {
            id
        },
    })

    if (!checkInvoice || checkInvoice.userId !== userId) {
        return res.status(404).json({
            message: 'Invoice not found'
        })
    }

    if (articulos.length > 0) {
        const items = articulos.reduce((acc, articulo) => acc + parseInt(articulo.cantidad), 0)
        const ivaTotal = articulos.reduce((acc, articulo) => acc + parseFloat(articulo.ivaTotal), 0)
        const totalValue = articulos.reduce((acc, articulo) => acc + parseFloat(articulo.precioFinal), 0)
        const invoice = await prisma.factura.update({
            where: {
                id
            },
            data: {
                title,
                pagado: pagado,
                items: {
                    increment: items
                },
                ivaTotal: {
                    increment: ivaTotal
                },
                totalValue: {
                    increment: totalValue
                },
                articulo: {
                    create: articulos
                }
            }
        })
        return res.status(200).json({ factura: invoice });
    }

    const invoice = await prisma.factura.update({
        where: {
            id
        },
        data: {
            title,
            pagado: pagado,
        }
    })

    return res.status(200).json({ factura: invoice });
}

exports.deleteInvoice = async (req, res) => {

    const { id, userId } = req.query

    const checkInvoice = await prisma.factura.findUnique({
        where: {
            id
        },
    })

    if (!checkInvoice || checkInvoice.userId !== userId) {
        return res.status(404).json({
            message: 'Invoice not found'
        })
    }

    const invoice = await prisma.factura.delete({
        where: {
            id
        }
    })
    res.status(200).json({ factura: invoice });
}

exports.getInvoices = async (req, res) => {

    let { filter, invoiceId, invoiceTitle, invoiceValue, invoiceVat, invoiceItems, invoicePaid } = req.query

    if (filter) {
        if (invoiceId) {
            console.log(invoiceId)
            const invoice = await prisma.factura.findMany({
                where: {
                    id: invoiceId
                }
            })
            return res.status(200).json({ invoices: invoice })
        }
        const invoice = await prisma.factura.findMany({
            where: {
                pagado: String(invoicePaid) === "true" ? true : false,
                title: {
                    contains: invoiceTitle,
                    mode: 'insensitive',
                },
                items: {
                    lte: Number(invoiceItems) ? Number(invoiceItems) : 10000000000000000,
                },
                totalValue: {
                    lte: parseFloat(invoiceValue) ? parseFloat(invoiceValue) : 10000000000000000,
                },
                ivaTotal: {
                    lte: parseFloat(invoiceVat) ? parseFloat(invoiceVat) : 10000000000000000,
                },
                NOT: {
                    pagado: String(invoicePaid) === "true" ? false : true,
                },
            },
        })
        return res.status(200).json({ invoices: invoice })
    }

    const allInvoices = await prisma.factura.findMany()
    res.status(200).json({ invoices: allInvoices });
}