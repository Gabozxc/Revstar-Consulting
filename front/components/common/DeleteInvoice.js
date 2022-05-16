import { useDispatch } from "react-redux";

import {DeleteInvoice} from "../../components/actionsMap"

const Deleteinvoice = ({invoiceId, userId}) => {

    const dispatch = useDispatch();

    return (
    <div className='max-w-[95%] my-2 mx-auto p-2 '>
        <button className='bg-red-500 p-2 rounded text-white' onClick={ async () => {
            await dispatch(DeleteInvoice({id:invoiceId, userId:userId}));
        }}>Delete Invoice</button>
    </div>
    );

}

export default Deleteinvoice;