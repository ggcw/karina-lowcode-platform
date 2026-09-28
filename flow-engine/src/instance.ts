// instance.ts 流程实例运行逻辑
import type { FlowSchema, FlowNode } from "../../contract/dsl-types";

// 运行实例状态（引擎私有，契约中不定义）
export interface FlowInstance {
    instanceId: string;
    flowKey: string;
    currentNodeId: string | null;
    status: "running" | "finished";
}

export function createFlowInstance(dsl: FlowSchema): FlowInstance {
    const startNode = dsl.nodes.find(n => n.type === "start");
    if (!startNode) throw new Error("流程必须包含start起始节点");
    return {
        instanceId: `inst_${Date.now()}`,
        flowKey: dsl.key,
        currentNodeId: startNode.id,
        status: "running"
    };
}

// 推进一步，可传入上下文供 exclusive_gateway 分支判断
export function stepInstance(
    instance: FlowInstance,
    dsl: FlowSchema,
    context: Record<string, unknown> = {}
): FlowInstance {
    if (instance.status === "finished") return instance;
    const currentNode = dsl.nodes.find(n => n.id === instance.currentNodeId);
    if (!currentNode) throw new Error("找不到当前节点");
    if (currentNode.type === "end") {
        return { ...instance, status: "finished" };
    }
    const nextId = resolveNextId(currentNode, context);
    return { ...instance, currentNodeId: nextId ?? null };
}

// 解析下一节点：exclusive_gateway 按 branches 命中，其他按 next 流转
function resolveNextId(node: FlowNode, context: Record<string, unknown>): string | undefined {
    if (node.type === "exclusive_gateway") {
        const hit = (node.branches ?? []).find(b => {
            if (b.else === true) return true;            // else 兜底分支
            if (b.if) return evaluate(b.if, context);    // 条件分支
            return false;
        });
        return hit?.to;
    }
    return node.next;
}

// 条件求值：只支持 字段 比较运算符 常量，避免执行任意代码
function evaluate(condition: string, context: Record<string, unknown>): boolean {
    const m = condition.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
    if (!m) return false;
    const [, key, op, rawValue] = m;
    const actual = context[key];
    let expected: unknown = rawValue;
    if (/^[0-9.]+$/.test(rawValue)) {
        expected = Number(rawValue);
    } else if (
        (rawValue.startsWith("'") && rawValue.endsWith("'")) ||
        (rawValue.startsWith('"') && rawValue.endsWith('"'))
    ) {
        expected = rawValue.slice(1, -1);
    }
    switch (op) {
        case "==": return actual == expected;
        case "!=": return actual != expected;
        case ">=": return Number(actual) >= Number(expected);
        case "<=": return Number(actual) <= Number(expected);
        case ">": return Number(actual) > Number(expected);
        case "<": return Number(actual) < Number(expected);
        default: return false;
    }
}