import { useState } from "react";
import Modal from "./modal";
import Button from "./button";
import Input from "./input";

type SubmitData = {
  locationName: string;
};

type Props = {
  locationSource: string;
  LocationTarget: string;
  onAdd: (submitData: SubmitData) => void;
  onClose: () => void;
};

const AddEdgeDialog = ({
  locationSource,
  LocationTarget,
  onAdd,
  onClose,
}: Props) => {
  const [locationName, setLocationName] = useState("");

  return (
    <Modal
      title={"Add Edge between " + locationSource + " and " + LocationTarget}
      controls={<Button onClick={() => onAdd({ locationName })}>Add</Button>}
      onClose={onClose}
    >
      <div>
        <Input placeHolder="Description" onChange={setLocationName} />
      </div>
    </Modal>
  );
};

export default AddEdgeDialog;
