import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import StartEndIcon from "./../../assets/flow-icons/start-end.svg?react";

const handleStyle = { left: 10 };

function StartEndNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <div className="">
        <StartEndIcon className="" />
        <div>
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
          />
          <div className="text-sm">Name: {data.name}</div>
          <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={handleStyle}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={isConnectable}
          />
        </div>
      </div>
    </>
  );
}

export default StartEndNode;
