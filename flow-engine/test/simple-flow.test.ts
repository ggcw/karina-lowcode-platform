// simple-flow.test.ts 完整使用示例，对应你要的完整实例
import {startFlow,runStep,parseRequirementToDSL,generateTestCase} from "./../src/index";

// 模拟用户输入的软件需求文本
const userReq = "小型项目：用户提交表单，系统审核，审核完成流程结束";

// 1.AI解析需求，自动得到流程DSL
const dsl = parseRequirementToDSL(userReq);
console.log("解析得到的流程定义：",dsl);

// 2.启动流程实例
const inst = startFlow(dsl);
console.log("流程启动，当前节点：",inst.currentNodeId);

// 3.一步步执行流程
const inst2 = runStep(inst,dsl);
console.log("推进一步，当前节点：",inst2.currentNodeId);
const inst3 = runStep(inst2,dsl);
console.log("再推进一步，当前节点：",inst3.currentNodeId);

// 4.自动生成测试用例
const testCases = generateTestCase(dsl);
console.log("自动生成测试用例：");
testCases.forEach((c,idx)=>{
  console.log(`${idx+1}. ${c}`);
})