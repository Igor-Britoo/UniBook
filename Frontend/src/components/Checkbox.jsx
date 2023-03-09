import { ContainerCheckbox,
  Check,
  LabelCheck,} from "../styles/Checkbox";

export const Checkbox = (props) => {
  return(
    <>
      <ContainerCheckbox>
          <Check type={"checkbox"}/>
          <LabelCheck>{props.name}</LabelCheck>
        </ContainerCheckbox>
    </>
  );
}