import { useDispatch } from "react-redux";

const Notification = ({type, msg, classes, local}) => {

    const dispatch = useDispatch();
    const cleanAlert = () => {
        dispatch({type: "CLEAN_ALERT"});
    }

    const typeAlert = type === 'Successful' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';

    return ( 
        <div className={`${typeAlert} ${classes} relative`}> 
            <p>{msg}</p>
            <p className="absolute top-0 right-2 cursor-pointer" onClick={cleanAlert}>X</p>
        </div>
     );
     
}
 
export default Notification;