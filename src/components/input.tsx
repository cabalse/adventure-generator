import { useState } from "react";

type Props = {
  placeHolder: string;
  onChange: (value: string) => void;
  text?: string;
};

const Input = ({ placeHolder, onChange, text = "" }: Props) => {
  const [value, setValue] = useState(text);
  const id = "inputControl_" + placeHolder;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="">
      <div>{placeHolder}</div>
      <input
        type="text"
        className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent p-2"
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
