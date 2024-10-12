import {useState}        from "react";
import {NextStepContext} from "./StepContext";

export const NextStepProvider = ({...props}) => {
    const [nextDisabled, setNextDisabled] = useState(true);
    return <NextStepContext.Provider value={{nextDisabled, setNextDisabled}} {...props} />
}
