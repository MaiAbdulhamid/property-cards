import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { propertiesActions } from "../store";
import PropertiesList from "./PropertiesList";


function Properties() {
  const properties = useSelector((state: any) => state.properties.properties);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(propertiesActions.getProperties() as any);
  }, [propertiesActions.getProperties]);
  
  return (
    <>
      <PropertiesList properties={properties}  />
    </>
  );
}

export default Properties;
