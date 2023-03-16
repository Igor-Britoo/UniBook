import { ContainerCheckbox, Check, } from "../styles/Checkbox";
import { Label } from "../styles/styles";

export const Checkbox = (props) => {
  return(
    <>
      <ContainerCheckbox>
          <Check type={"checkbox"}/>
          <Label fontSize="md" fontWeight="500" >{props.name}</Label>
      </ContainerCheckbox>
    </>
  );
}