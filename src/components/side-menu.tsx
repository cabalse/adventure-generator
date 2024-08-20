import Button from "./button";

type Props = {
  onLocationAdd: () => void;
  onGenerateAdventure: () => void;
};

const SideMenu = ({ onLocationAdd, onGenerateAdventure }: Props) => {
  return (
    <div className="flex flex-col grow-1 shink-0 flex-nowrap justify-start p-2 border-2 border-slate-300">
      <div className="text-1 font-medium mb-2 pb-2 text-nowrap border-b-2 border-slate-300">
        Adventure Generator
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={onLocationAdd}>Preferences</Button>
        <Button onClick={onLocationAdd}>Add Node</Button>
        <Button onClick={onGenerateAdventure}>Generate Adventure</Button>
      </div>
    </div>
  );
};

export default SideMenu;
