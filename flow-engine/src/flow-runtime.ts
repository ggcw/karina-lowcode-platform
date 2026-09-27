// flow-runtime.ts 主运行引擎，后续对接AI解析需求生成用例
import {FlowDsl,FlowInstance} from "./dsl-types";
import {createFlowInstance,stepInstance} from "./instance";

// 启动一条流程
export function startFlow(dsl:FlowDsl):FlowInstance{
  return createFlowInstance(dsl);
}

// 推进流程一步
export function runStep(instance:FlowInstance,dsl:FlowDsl):FlowInstance{
  return stepInstance(instance,dsl);
}

// AI简易需求文本解析，把自然语言需求转成DSL（你课题核心：需求自动解析）
export function parseRequirementToDSL(requireText:string):FlowDsl{
  // 简易示例逻辑，后续可以扩充AI调用
  return {
    flowId:"flow_001",
    flowName:"需求生成的流程",
    nodes:[
      {id:"n1",type:"start",name:"开始",nextNodeId:"n2"},
      {id:"n2",type:"user_task",name:"执行需求任务",nextNodeId:"n3"},
      {id:"n3",type:"end",name:"结束"}
    ]
  }
}

// 根据DSL自动生成测试用例，课题第二个核心功能
export function generateTestCase(dsl:FlowDsl):string[]{
  const cases:string[] = [];
  cases.push(`测试用例1：正常走完流程，从开始节点直到结束节点`);
  cases.push(`测试用例2：流程启动后，确认当前节点为起始节点`);
  cases.push(`测试用例3：到达end节点后，流程状态变为finished，不能继续推进`);
  return cases;
}