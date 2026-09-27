// dsl-types.ts 定义数据类型
export interface FlowNode {
    id: string;
    type: "start" | "user_task" | "end";
    name: string;
    nextNodeId?: string;
}

export interface FlowDsl {
    flowId: string;
    flowName: string;
    nodes: FlowNode[];
}

export interface FlowInstance {
    instanceId: string;
    flowId: string;
    currentNodeId: string | null;
    status: "running" | "finished";
}