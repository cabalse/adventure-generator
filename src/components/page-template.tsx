import SideMenu from "./side-menu";

type Props = {
  children: React.ReactNode;
};

const PageTemplate = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-row w-full h-full">
        <SideMenu
          onLocationAdd={handleMenuAddLocation}
          onGenerateAdventure={handleGenerateAdventure}
          onLoad={handleMenuLoadClick}
          onSave={() => console.log("Save")}
        />
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default PageTemplate;
