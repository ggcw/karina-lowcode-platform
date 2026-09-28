// simple-flow.test.ts 完整使用示例
import { startFlow, runStep } from "../src/index";
import type { FlowSchema } from "../../contract/dsl-types";

// 流程定义（契约 v0.1 DSL）：线性流转 + exclusive_gateway 条件分支
const flow: FlowSchema = {
    type: "flow",
    key: "flow_001",
    name: "审批流程示例",
    nodes: [
        { id: "n1", type: "start", name: "开始", next: "n2" },
        { id: "n2", type: "user_task", name: "提交申请", assignee: "申请人", next: "n3" },
        {
            id: "n3", type: "exclusive_gateway", name: "金额判断",
            branches: [
                { if: "amount > 1000", to: "n4" },
                { else: true, to: "n5" }
            ]
        },
        { id: "n4", type: "user_task", name: "高级审批", assignee: "经理", next: "n5" },
        { id: "n5", type: "end", name: "结束" }
    ]
};

// 1. 启动流程实例
const inst = startFlow(flow);
console.log("流程启动，当前节点：", inst.currentNodeId);

// 2. 逐步执行（携带上下文，网关按条件分支）
const inst2 = runStep(inst, flow, { amount: 5000 });
console.log("推进一步，当前节点：", inst2.currentNodeId);

const inst3 = runStep(inst2, flow, { amount: 5000 });
console.log("再推进一步，当前节点：", inst3.currentNodeId);

const inst4 = runStep(inst3, flow, { amount: 5000 });
console.log("继续推进，当前节点：", inst4.currentNodeId, "状态：", inst4.status);