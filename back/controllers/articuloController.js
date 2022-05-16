const prisma = require('../utils/prisma')

exports.getArticulos = async (req, res) => {

    const { facturaId, filter, name, valorTotal, ivaTotal } = req.query

    if (filter) {
        const articulos = await prisma.articulo.findMany({
            where: {
                nombre: {
                    contains: name,
                    mode: 'insensitive',
                },
                valorTotal: {
                    lte: parseFloat(valorTotal) ? parseFloat(valorTotal) : 10000000000000000,
                },
                ivaTotal: {
                    lte: parseFloat(ivaTotal) ? parseFloat(ivaTotal) : 10000000000000000,
                },
            }
        }) 
        return res.status(200).json({ articulos: articulos })
    }

    if (!facturaId || facturaId === "" || facturaId === "undefined" ) {
        return res.status(400).json({
            message: 'No facturaId sent'
        })
    }

    const articulos = await prisma.articulo.findMany({
        where: {
            facturaId
        }
    })

    res.status(200).json({ articulos });
}

exports.updateArticulo = async (req, res) => {

    const { facturaId, id, nombre, valor, cantidad, iva } = req.body

    const articulo = await prisma.articulo.update({
        where: {
            id
        },
        data: {
            nombre,
            valor,
            cantidad,
            iva,
        }
    })
    //refresh invoice 
    await prisma.factura.update({
        where: {
            id: facturaId
        }
        ,
        data: {
            updatedAt: new Date()
        }
    })

    res.status(200).json({ articulo: articulo })
}

exports.deleteArticulo = async (req, res) => {

    const { itemId, userId, invoiceId } = req.query

    if (!itemId || itemId === "" || itemId === "undefined" || !userId || userId === "" || userId === "undefined") {
        return res.status(400).json({
            message: 'No facturaId or userId sent'
        })
    }

    //check if user is owner of factura
    const factura = await prisma.factura.findUnique({
        where: {
            id: invoiceId
        }
    })

    if (factura.userId !== userId) {
        return res.status(401).json({
            message: 'User not authorized'
        })
    }

    const articulo = await prisma.articulo.delete({
        where: {
            id:itemId
        }
    })

    const facturaUpdate = await prisma.factura.update({
        where: {
            id: invoiceId
        },
        data: {
            items: {
                decrement: articulo.cantidad
            },
            ivaTotal: {
                decrement: articulo.ivaTotal
            },
            totalValue: {
                decrement: articulo.precioFinal
            },
        }
    })


    res.status(200).json({ facturaUpdate });
}
