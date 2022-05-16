const InvoiceStatus = ({ invoice }) => {

    const T = invoice.updatedAt.indexOf("T")
    const formatDataCreation = invoice.createdAt.slice(0, T)
    const formatDataUpdate = invoice.updatedAt.substring(0, T)

    return (
        <div className="max-w-[95%] my-2 mx-auto p-2 shadow-gray-300 bg-gray-200 rounded">
            <h2 className="text-lg">Invoice:</h2>
            <div className="flex flex-col my-2">
                <div className="flex flex-row text-center">
                    <div className="flex-1">
                        <h2 className="text-sm">INVOICE NAME:</h2>
                        <h2 className="text-sm">{invoice.title}</h2>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-sm">QUANTITY:</h2>
                        <h2 className="text-sm">{invoice.items}</h2>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-sm">TOTAL VALUE:</h2>
                        <h2 className="text-sm">{invoice.totalValue}</h2>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-sm">VAT</h2>
                        <h2 className="text-sm">{invoice.ivaTotal}</h2>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-sm">PAID</h2>
                        <h2 className="text-sm">{invoice.pagado ? "Yes" : "No"}</h2>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-sm">DATE OF CREATION</h2>
                        <h2 className="text-sm">{formatDataCreation}</h2>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-sm">LAST INVOICE UPDATE </h2>
                        <h2 className="text-sm">{formatDataUpdate}</h2>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default InvoiceStatus;