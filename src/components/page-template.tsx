import { ReducerActionTypes } from "../appcontext/appstatereducer";
import useAppContext from "../appcontext/useappcontext";
import dialogs from "../constants/dialogs";
import SideMenu from "./side-menu";

type Props = {
  children: React.ReactNode;
};

const PageTemplate = ({ children }: Props) => {
  const { appState, appStateDispatch } = useAppContext();

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-row w-full h-full">
        <SideMenu
          onLocationAdd={() => console.log("Add Location")}
          onGenerateAdventure={() => console.log("Generate Adventure")}
          onLoad={() =>
            appStateDispatch({
              type: ReducerActionTypes.DISPLAY_DIALOG,
              payload: dialogs.LOAD,
            })
          }
          onSave={() => console.log("Save")}
        />
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default PageTemplate;
