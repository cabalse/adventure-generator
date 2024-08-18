import Button from "./button";

type Props = {
  onLocationAdd: () => void;
};

const SideMenu = ({ onLocationAdd }: Props) => {
  return (
    <div className="flex flex-col grow-1 shink-0 flex-nowrap justify-start p-1 border-2 border-slate-300">
      <div className="text-1 font-medium m-1 text-nowrap">
        Adventure Generator
      </div>
      <Button onClick={onLocationAdd}>Add Location</Button>
    </div>
  );
};

export default SideMenu;
