import generateKey from "../tools/generateKey";
import Button from "./Button";

interface ButtonSelectOption {
  label: string;
  value: string;
}

interface Props {
  value: string;
  options: ButtonSelectOption[];
  onInput: (value: string) => void;
}

const ButtonSelect = ({ value, options, onInput }: Props) => {
  return (
    <div className="flex ">
      {options.map((option) => (
        <Button
          key={generateKey(option.label)}
          variant="secondary"
          className={`${
            value === option.value && "!border-2 border-PRIMARY_COLOR"
          }  mr-1 rounded border-0 py-1 px-2 uppercase text-black`}
          onClick={() => onInput(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonSelect;
