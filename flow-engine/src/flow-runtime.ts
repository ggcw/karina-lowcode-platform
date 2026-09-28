// flow-runtime.ts 主运行引擎：基于契约 DSL 的流程解析与执行
import type { FlowSchema } from "../../contract/dsl-types";
import { createFlowInstance, stepInstance, type FlowInstance } from "./instance";

// 启动一条流程
export function startFlow(dsl: FlowSchema): FlowInstance {
    return createFlowInstance(dsl);
}

// 推进流程一步（可传入上下文用于 exclusive_gateway 分支判断）
export function runStep(
    instance: FlowInstance,
    dsl: FlowSchema,
    context: Record<string, unknown> = {}
): FlowInstance {
    return stepInstance(instance, dsl, context);
}