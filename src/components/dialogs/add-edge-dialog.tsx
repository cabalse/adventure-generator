import { useEffect, useState } from "react";
import Modal from "../modal";
import Button from "../button";
import Input from "../input";
import AddEdgeData from "../../types/add-edge-data";

type Props = {
  data: AddEdgeData;
  onAdd: (data: AddEdgeData) => void;
  onClose: () => void;
};

const AddEdgeDialog = ({ data, onAdd, onClose }: Props) => {
  const [addEdgeData, setAddEdgedata] = useState<AddEdgeData>(data);

  useEffect(() => {
    console.log("Data: ", data);
    setAddEdgedata(data);
  }, [data]);

  const handleLabelOnChange = (value: string) => {
    setAddEdgedata((prev) => ({ ...prev, edgeLabel: value }));
  };

  if (data) {
    return (
      <Modal
        title={
          "Add Edge between " +
          addEdgeData.sourceName +
          " and " +
          addEdgeData.targetName
        }
        controls={<Button onClick={() => onAdd(addEdgeData)}>Add</Button>}
        onClose={onClose}
      >
        <div>
          <Input placeHolder="Description" onChange={handleLabelOnChange} />
        </div>
      </Modal>
    );
  } else return null;
};

export default AddEdgeDialog;
