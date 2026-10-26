# 元数据修改测试 — 开发实现交付摘要

<!-- generated-development-summary:v1 -->

在 kdtest_meta_cover 应用下完成采购入库单单据创建：表头与入库明细分录字段、物料必填及计量单位带出、入库日期与业务员默认值、金额=数量×单价计算规则均已写入并通过回读验证。

## 实现与检查

| 本次范围 | 实现证据 |
| --- | --- |
| 在应用 kdtest_meta_cover 下新建采购入库单单据（表头与分录）；按标准苍穹单据平台规则采用手工单据编码，生命周期为保存→提交→审核。 | 采购入库单表单已创建（表头 + 入库明细分录），单据编号为模板预置的手工录入字段，生命周期为保存→提交→审核<br>批次写入与回读验证 19/19 项通过，覆盖根实体、分录实体与全部新增字段的存在性 |
| 表头建议字段：入库日期、供应商、收货仓库、采购组织、业务员、备注。 | 表头字段回读：入库日期（日期）、供应商（平台供应商基础资料）、收货仓库（平台仓库基础资料）、采购组织（平台组织）、业务员（平台用户）、备注（文本）<br>入库日期默认取当天、业务员默认取当前登录人：属性写入并独立回读验证 2/2 项 |
| 分录建议字段：物料、入库数量、计量单位、单价、金额、行备注。 | 分录字段回读：物料（平台物料基础资料，必填）、计量单位（平台计量单位基础资料）、入库数量（必填）、单价、金额、行备注<br>物料选择后带出计量单位（物料基本计量单位→计量单位）通过批次验证；金额=入库数量×单价 计算规则写入并验证 2 个触发字段 |

## 未完成及未验证范围

- 收货仓库引用平台标准仓库基础资料（供应链基础资料）：平台同时存在 SRM 云下同名仓库资料，按需求“仓库主数据”语义选择标准仓库基础资料。
- 保存、提交、审核的实际运行行为尚未在浏览器中验证，属质量阶段验收范围。
- 卡片收口返回的源码同步请求已在后台启动，排队或运行中不代表源码已同步完成。
配置回读仅证明对应配置已写入。保存、持久化、提交、审核等运行态行为须由质量阶段按实际观察验收。

## 测试环境交接

```json
{
  "schemaVersion": "cosmic-test-environment/v1",
  "baseUrl": "https://feature.kingdee.com:1026/feature_vb",
  "accountId": "2453077976581943296",
  "source": "app-build verified target",
  "application": {
    "appRoot": "C:\\Users\\kingdee\\lingeebuild-beta\\workspaces\\ac41cddea909249846a509ac77a4c536\\测试项目-03\\.lingee-task-worktrees\\wi-t1000373\\app\\kdtest_meta_cover",
    "appCode": "kdtest_meta_cover",
    "appName": "元数据修改测试",
    "appId": "6+J/4QH1NGVT"
  },
  "forms": [
    {
      "formNumber": "kdtest_purchas_receipt",
      "formName": "采购入库单",
      "previewUrl": "https://feature.kingdee.com:1026/feature_vb/?formId=kdtest_purchas_receipt&aiv=209b02b7",
      "listUrl": "https://feature.kingdee.com:1026/feature_vb/?formId=bos_list&type=list&billFormId=kdtest_purchas_receipt&aiv=57d5fa20"
    }
  ],
  "requirementsBaseline": {
    "path": "requirements.md",
    "sha256": "sha256:f1ea286b138682afaba42fdc2ca0d286ab01ac9943ab7bc3ffb169ee3e1e309f",
    "revision": 1,
    "itemHashes": {
      "REQ-001": "sha256:87289bded2034bcf39088684dce36f09488558465f4b40e3fcb569aadafe80b5",
      "EXP-001": "sha256:09f7ca70926d06794f0c00990c81988bca1376241192db26fe83eb29511ed08c",
      "EXP-002": "sha256:f991ca6d38821ab37d88bf3545c406a0231b1f5785c6cdb0ddc6fc9817ce1b9c"
    },
    "sourceContentHash": "sha256:69a824214d03b4d388d02a938824ecf0db85d242ad1281d26ba04358471a2ab6"
  },
  "deliveryScope": {
    "completed": [
      {
        "itemId": "REQ-001",
        "evidence": [
          "采购入库单表单已创建（表头 + 入库明细分录），单据编号为模板预置的手工录入字段，生命周期为保存→提交→审核",
          "批次写入与回读验证 19/19 项通过，覆盖根实体、分录实体与全部新增字段的存在性"
        ]
      },
      {
        "itemId": "EXP-001",
        "evidence": [
          "表头字段回读：入库日期（日期）、供应商（平台供应商基础资料）、收货仓库（平台仓库基础资料）、采购组织（平台组织）、业务员（平台用户）、备注（文本）",
          "入库日期默认取当天、业务员默认取当前登录人：属性写入并独立回读验证 2/2 项"
        ]
      },
      {
        "itemId": "EXP-002",
        "evidence": [
          "分录字段回读：物料（平台物料基础资料，必填）、计量单位（平台计量单位基础资料）、入库数量（必填）、单价、金额、行备注",
          "物料选择后带出计量单位（物料基本计量单位→计量单位）通过批次验证；金额=入库数量×单价 计算规则写入并验证 2 个触发字段"
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
- 在应用 kdtest_meta_cover 下新建采购入库单单据（表头与分录）；按标准苍穹单据平台规则采用手工单据编码，生命周期为保存→提交→审核。
- 表头建议字段：入库日期、供应商、收货仓库、采购组织、业务员、备注。
- 分录建议字段：物料、入库数量、计量单位、单价、金额、行备注。
<!-- cosmic-scope-view:end -->

