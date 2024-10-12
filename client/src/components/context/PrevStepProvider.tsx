import {useState}        from "react";
import {PrevStepContext} from "./StepContext";

export const PrevStepProvider = ({...props}) => {
    const [prevDisabled, setPrevDisabled] = useState(true);
    return <PrevStepContext.Provider value={{prevDisabled, setPrevDisabled}} {...props} />
}
