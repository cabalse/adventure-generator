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
      <div className="h-[23px] w-[89px]">
        <div className="absolute p-[3px] pl-[5px] z-10">
          <div className="text-sm">Name: {data.name}</div>
        </div>
        <StartEndIcon className="absolute h-[95px] -top-[36px] -left-[3px] z-0" />
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
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
    </>
  );
}

export default StartEndNode;
