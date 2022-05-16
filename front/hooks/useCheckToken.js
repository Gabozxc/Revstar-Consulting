import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CheckToken } from "../components/actionsMap";

const useCheckToken = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckToken());
  }, [dispatch]);

};

export default useCheckToken;
