# 拖拽式低代码平台

一个面向表单与审批流程的拖拽式低代码平台：可视化搭建表单和流程，以自研 DSL / JSON Schema 统一描述，自动生成前端代码，并通过状态机驱动的类 BPMN 流程引擎执行审批流程。

## 项目简介

本平台让不熟悉编程的用户也能通过拖拽快速搭建业务表单和审批流程。用户从组件库拖入字段或流程节点，在画布上编排，系统把结果保存为 DSL，后端负责校验、持久化与代码生成，流程引擎支持条件分支、会签等规则。

示例场景采用「通用申请审批」，可覆盖请假、报销、采购等多种业务。

## 功能特性

- 可视化拖拽画布与组件库
- 表单设计器与流程设计器
- 自研 DSL 与 JSON Schema 数据契约
- DSL 校验、持久化与导入导出
- 前端代码生成
- 类 BPMN 流程引擎，支持条件分支、会签与调试

## 技术栈

- 前端：React、dnd-kit、Monaco Editor
- 数据契约：自研 DSL、JSON Schema、TypeScript
- 后端：Node.js
- 流程引擎：状态机（类 BPMN）
- 存储：SQLite

## 目录结构

```
.
├── docs/          # 契约文档、需求文档、团队章程
├── contract/      # DSL 契约：schema、类型、示例、校验脚本
├── frontend/      # 前端设计器
├── backend/       # Node.js 后端
├── flow-engine/   # 流程引擎
└── README.md
```

## 团队分工

| 姓名 | 角色 |
| --- | --- |
| 王仁杰 | 组长 / 架构与 DSL 契约 |
| 杨灿 | 拖拽引擎 |
| 吕飞诚 | 表单设计器 |
| 郭帅良 | 后端与代码生成 |
| 王程昱 | 流程引擎 |

## 数据契约

契约文档见 `docs/契约文档 v0.1.docx`，核心文件：

- `contract/dsl.schema.json`：JSON Schema 校验规则
- `contract/dsl-types.ts`：TypeScript 类型定义
- `contract/example-form.json`：表单示例
- `contract/example-flow.json`：流程示例

## 本地运行

1. 安装 Node.js（LTS）
2. 安装依赖：`npm install`
3. 校验示例 DSL：`node validate.mjs`

前端和后端的启动方式待各模块完成后补充。

## License

课程项目，暂不开源。
