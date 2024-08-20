import { Handle, Position } from "@xyflow/react";

type Props = {
  data: { label: string };
  isConnectable: boolean;
};

function LocationNode({ data, isConnectable }: Props) {
  return (
    <div className="border border-slate-400 bg-white rounded p-3">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="text-sm">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default LocationNode;
