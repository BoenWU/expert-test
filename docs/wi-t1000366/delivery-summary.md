# 元数据修改测试 — 开发实现交付摘要

<!-- generated-development-summary:v1 -->

已在应用 kdtest_meta_cover 下新建采购申请单：表头可录申请日期（默认当天）、申请人（默认当前登录人）、申请部门、申请理由与备注，物料明细分录可多行录入物料（必填、选择后带出计量单位）、申请数量（必填）、计量单位、期望到货日期与行备注；单据编号为手工编码，按标准平台规则支持保存、提交、审核流转。元数据写入与回读验证全部通过。

## 实现与检查

| 本次范围 | 实现证据 |
| --- | --- |
| 在应用 kdtest_meta_cover 下新建采购申请单单据（表头与分录）；按标准苍穹单据平台规则采用手工单据编码，生命周期为保存→提交→审核。 | runBatch 写入及回读验证通过（1/1）：表单 kdtest_pur_requisition（采购申请单，formId=657FFCYUN2/R）在应用 kdtest_meta_cover 下创建，结果文件 app\kdtest_meta_cover\_runtime\cosmic-metadata\output\last_result.runBatch.29b21d04.json<br>单据采用标准单据模板 bos_billtpl（预置单据编号为手工编码、单据状态、审核人/审核日期及保存/提交/审核操作），emit 产物 app\kdtest_meta_cover\metadata\_emit\direct_d513b5c7248f\artifact_20261026_064537_kdtest_pur_requisition.json<br>表头与分录结构完整：表头 5 个业务字段 + 物料明细分录 5 个字段，含物料/申请数量必填与物料→计量单位带出 |
| 表头建议字段：申请日期、申请人、申请部门、申请理由、备注。 | 表头字段申请日期（日期）、申请人（人员）、申请部门（组织）、申请理由（文本）、备注（文本）已随初始批次创建并回读验证通过<br>setProperties 默认值写入并回读验证通过（2/2）：申请日期默认当天（getToday）、申请人默认当前登录人（getCurrentUser） |
| 分录建议字段：物料、申请数量、计量单位、期望到货日期、行备注。 | 分录字段物料（基础资料引用 bd_material，必填）、申请数量（数量，必填，联动计量单位）、计量单位（单位，由物料基本单位 baseunit 带出）、期望到货日期（日期）、行备注（文本）已随初始批次创建并回读验证通过 |

## 未完成及未验证范围

- 本轮仅完成元数据实现与配置回读验证；业务运行态验收（新建保存、按编号重开核对、提交、审核的实际执行，AC-01~AC-05）属质量阶段范围，本轮未执行，保留未验证状态。
- 全部需求行为均可由元数据表达，未涉及 Java 插件开发、注册与生效安排。
- 用户未要求发布应用菜单，本轮未配置菜单入口；表单可通过测试环境交接中的表单预览与列表入口访问。
- 源码同步（DYM 导出）已在后台发起，完成情况以同步任务状态为准，不影响本轮已验证的元数据写入。
配置回读仅证明对应配置已写入。保存、持久化、提交、审核等运行态行为须由质量阶段按实际观察验收。

## 测试环境交接

```json
{
  "schemaVersion": "cosmic-test-environment/v1",
  "baseUrl": "https://feature.kingdee.com:1026/feature_vb",
  "accountId": "2453077976581943296",
  "source": "app-build verified target",
  "application": {
    "appRoot": "C:\\Users\\kingdee\\lingeebuild-beta\\workspaces\\ac41cddea909249846a509ac77a4c536\\测试项目-03\\.lingee-task-worktrees\\wi-t1000366\\app\\kdtest_meta_cover",
    "appCode": "kdtest_meta_cover",
    "appName": "元数据修改测试",
    "appId": "6+J/4QH1NGVT"
  },
  "forms": [
    {
      "formNumber": "kdtest_pur_requisition",
      "formName": "采购申请单",
      "previewUrl": "https://feature.kingdee.com:1026/feature_vb/?formId=kdtest_pur_requisition&aiv=9854ba1b",
      "listUrl": "https://feature.kingdee.com:1026/feature_vb/?formId=bos_list&type=list&billFormId=kdtest_pur_requisition&aiv=badda7ce"
    }
  ],
  "requirementsBaseline": {
    "path": "requirements.md",
    "sha256": "sha256:92ae9b3b32d6ee9ce7067665fdb481146b3bb90b3b4c94cd325fcffb0f25c3ce",
    "revision": 1,
    "itemHashes": {
      "REQ-001": "sha256:85c882137d5cc0be8f79af9771a4c9cda702adb00d848842b2434173476d3126",
      "EXP-001": "sha256:fde1d68891a256d460f6f6947fae721a0013a375d2c33bf5dcbe993820b4536a",
      "EXP-002": "sha256:6f4cad656e02dcf1aec3d9eabbd49eb800acd2f7867bda596b20fde1548555e5"
    },
    "sourceContentHash": "sha256:4d09c4f296954187efcf73ddead1fe48ee0570fc28e6aa61036a7e4dcb1c894f"
  },
  "deliveryScope": {
    "completed": [
      {
        "itemId": "REQ-001",
        "evidence": [
          "runBatch 写入及回读验证通过（1/1）：表单 kdtest_pur_requisition（采购申请单，formId=657FFCYUN2/R）在应用 kdtest_meta_cover 下创建，结果文件 app\\kdtest_meta_cover\\_runtime\\cosmic-metadata\\output\\last_result.runBatch.29b21d04.json",
          "单据采用标准单据模板 bos_billtpl（预置单据编号为手工编码、单据状态、审核人/审核日期及保存/提交/审核操作），emit 产物 app\\kdtest_meta_cover\\metadata\\_emit\\direct_d513b5c7248f\\artifact_20261026_064537_kdtest_pur_requisition.json",
          "表头与分录结构完整：表头 5 个业务字段 + 物料明细分录 5 个字段，含物料/申请数量必填与物料→计量单位带出"
        ]
      },
      {
        "itemId": "EXP-001",
        "evidence": [
          "表头字段申请日期（日期）、申请人（人员）、申请部门（组织）、申请理由（文本）、备注（文本）已随初始批次创建并回读验证通过",
          "setProperties 默认值写入并回读验证通过（2/2）：申请日期默认当天（getToday）、申请人默认当前登录人（getCurrentUser）"
        ]
      },
      {
        "itemId": "EXP-002",
        "evidence": [
          "分录字段物料（基础资料引用 bd_material，必填）、申请数量（数量，必填，联动计量单位）、计量单位（单位，由物料基本单位 baseunit 带出）、期望到货日期（日期）、行备注（文本）已随初始批次创建并回读验证通过"
        ]
      }
    ],
    "remaining": []
  }
}
```
<!-- cosmic-scope-view:start -->
## 当前范围说明
本节按当前用户决定和交接记录生成；已取消事项的早期描述仅作历史来源。
已记录实现，实际运行结果仍按验收证据判断：
- 在应用 kdtest_meta_cover 下新建采购申请单单据（表头与分录）；按标准苍穹单据平台规则采用手工单据编码，生命周期为保存→提交→审核。
- 表头建议字段：申请日期、申请人、申请部门、申请理由、备注。
- 分录建议字段：物料、申请数量、计量单位、期望到货日期、行备注。
<!-- cosmic-scope-view:end -->

