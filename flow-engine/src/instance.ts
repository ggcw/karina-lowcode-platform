// instance.ts 流程实例运行逻辑
import { FlowDsl, FlowInstance, FlowNode } from "./dsl-types";

export function createFlowInstance(dsl: FlowDsl): FlowInstance {
    const startNode = dsl.nodes.find(n => n.type === "start");
    if (!startNode) throw new Error("流程必须包含start起始节点");
    return {
        instanceId: `inst_${Date.now()}`,
        flowId: dsl.flowId,
        currentNodeId: startNode.id,
        status: "running"
    };
}

export function stepInstance(instance: FlowInstance, dsl: FlowDsl): FlowInstance {
    if (instance.status === "finished") return instance;
    const currentNode = dsl.nodes.find(n => n.id === instance.currentNodeId);
    if (!currentNode) throw new Error("找不到当前节点");

    if (currentNode.type === "end") {
        return { ...instance, status: "finished" };
    }

    const nextId = currentNode.nextNodeId;
    return { ...instance, currentNodeId: nextId ?? null };
}