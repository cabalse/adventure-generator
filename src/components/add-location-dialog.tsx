import { useState } from "react";
import Modal from "./modal";
import Button from "./button";
import Input from "./input";

type Props = {
  onAdd: () => void;
  onClose: () => void;
};

const AddLocationDialog = ({ onAdd, onClose }: Props) => {
  const [locationName, setLocationName] = useState("");

  return (
    <Modal
      title="Add Location"
      controls={<Button onClick={onAdd}>Add</Button>}
      onClose={onClose}
    >
      <div>
        <Input placeHolder="Location Name" onChange={setLocationName} />
        <Input placeHolder="Another prop" onChange={setLocationName} />
      </div>
    </Modal>
  );
};

export default AddLocationDialog;
