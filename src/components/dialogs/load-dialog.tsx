import { useState } from "react";

import Modal from "../modal";
import Button from "../button";

type Props = {
  displayDialog: boolean;
  onClose: () => void;
};

const LoadDialog = ({ displayDialog, onClose }: Props) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    // if (file) {
    //   let reader = new FileReader();
    //   reader.onload = function () {
    //     if (reader.result) {
    //       const data = JSON.parse(reader.result.toString());
    //       context.appStateDispatch({
    //         type: AppReducerActionTypes.SET_SCENARIO_DATA,
    //         payload: data,
    //       });
    //       context.appStateDispatch({
    //         type: AppReducerActionTypes.SWITCH_PAGE,
    //         payload: PAGES.JSON_VIEWER,
    //       });
    //       context.appStateDispatch({
    //         type: AppReducerActionTypes.ADD_ACTIVE_MENU_ITEM,
    //         payload: [MENU_ITEMS.EDIT, MENU_ITEMS.DATA],
    //       });
    //     }
    //   };
    //   reader.onerror = function () {
    //     console.error(reader.error);
    //   };
    //   reader.readAsText(file);
    // }
    onClose();
  };

  if (displayDialog) {
    return (
      <Modal
        title={"Load"}
        controls={
          <div className="sm:flex sm:flex-row-reverse sm:px-6">
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleUpload}>Upload</Button>
          </div>
        }
        onClose={onClose}
      >
        {" "}
        <>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                className="text-base font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                Load Scenario File
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Select a scenario file to load.
                </p>
                <input
                  type="file"
                  className="mt-4"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </>
      </Modal>
    );
  } else {
    return null;
  }
};

export default LoadDialog;
