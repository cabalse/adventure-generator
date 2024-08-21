import { useState } from "react";
import Modal from "./../modal";
import Button from "./../button";
import Input from "./../input";

type SubmitData = {
  locationName: string;
};

type Props = {
  onAdd: (submitData: SubmitData) => void;
  onClose: () => void;
};

const AddLocationDialog = ({ onAdd, onClose }: Props) => {
  const [locationName, setLocationName] = useState("");

  return (
    <Modal
      title="Add Location"
      controls={<Button onClick={() => onAdd({ locationName })}>Add</Button>}
      onClose={onClose}
    >
      <div>
        <Input placeHolder="Location Name" onChange={setLocationName} />
      </div>
    </Modal>
  );
};

export default AddLocationDialog;
