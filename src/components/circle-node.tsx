import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

const handleStyle = { left: 10 };

function CircleNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <div className="w-36 h-36 bg-red-600 rounded-full">
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

export default CircleNode;
