# 元数据修改测试 — 开发实现交付摘要

<!-- generated-development-summary:v1 -->

已在 kdtest_meta_cover 应用下创建采购申请单：表头含申请日期（默认当天）、申请人、申请组织、备注，明细含物料编码、物料名称、计量单位、数量、期望到货日期；单据编号按标准单据手工编码并设为必填，保存时执行必填检查并校验数量大于 0，按标准单据保存→提交→审核流转。全部元数据写入均已回读验证。

## 实现与检查

| 本次范围 | 实现证据 |
| --- | --- |
| 在 kdtest_meta_cover 应用下新建一张采购申请单，业务人员可录入采购需求信息并保存，保存后数据可回读。 | runBatch 写入及回读验证通过 1/1（表单 kdtest_pur_request，formId 64ZAX5Y8QJ1Y，实体与字段共 11 项验证通过）<br>表头自定义字段：申请日期、申请人、申请组织、备注；分录字段：物料编码、物料名称、计量单位、数量、期望到货日期（创建回读验证通过）<br>保存操作必填校验已启用（MustInputValidation enabled，verified=true） |
| 采购申请单按苍穹标准单据规则流转：单据编号手工编码，生命周期为保存→提交→审核。 | 采用标准单据模板（bos_billtpl），预置保存/提交/审核生命周期操作，单据编号为模板预置手工编码<br>保存操作回读 verified=true（operationType=save）；提交操作必填校验模板已启用（already enabled，verified=true） |
| 单据头建议字段：单据编号（文本，必填，手工录入）、申请日期（日期，默认当天）、申请人（文本）、申请组织（文本）、备注（文本）。 | 表头字段申请日期/申请人/申请组织/备注创建并回读验证<br>申请日期默认当天（getToday 设计默认值）、单据编号必填（MustInput）属性设置验证通过（verifiedPropertyCount=2） |
| 单据体（分录）建议字段：物料编码（文本）、物料名称（文本）、数量（数量，大于 0）、计量单位（文本）、期望到货日期（日期）。 | 分录字段物料编码/物料名称/计量单位/数量/期望到货日期创建并回读验证<br>保存时数量大于 0 校验写入并验证（ConditionValidation：kdtest_quantity &lt;= 0 阻断，TrueThrow，消息"数量必须大于 0"，verified=true） |

## 未完成及未验证范围

- 单据编号、单据状态由标准单据模板预置（手工编码，未配置自动编号规则）
- 计量单位采用计量单位引用字段以配套数量字段（数量字段平台契约要求计量单位引用），相对需求假设中的文本为最小必要适配，已记录于建模输入假设
- 业务运行行为（录入保存后回读、提交与审核流转）尚未在运行环境执行，运行态验收待质量阶段
- DYM 源码同步以后台任务启动，未等待其完成
配置回读仅证明对应配置已写入。保存、持久化、提交、审核等运行态行为须由质量阶段按实际观察验收。

## 测试环境交接

```json
{
  "schemaVersion": "cosmic-test-environment/v1",
  "baseUrl": "https://feature.kingdee.com:1026/feature_vb",
  "accountId": "2453077976581943296",
  "source": "app-build verified target",
  "application": {
    "appRoot": "C:\\Users\\kingdee\\lingeebuild-beta\\workspaces\\ac41cddea909249846a509ac77a4c536\\测试项目-03\\.lingee-task-worktrees\\wi-t1000362\\app\\kdtest_meta_cover",
    "appCode": "kdtest_meta_cover",
    "appName": "元数据修改测试",
    "appId": "6+J/4QH1NGVT"
  },
  "forms": [
    {
      "formNumber": "kdtest_pur_request",
      "formName": "采购申请单",
      "previewUrl": "https://feature.kingdee.com:1026/feature_vb/?formId=kdtest_pur_request&aiv=a479317a",
      "listUrl": "https://feature.kingdee.com:1026/feature_vb/?formId=bos_list&type=list&billFormId=kdtest_pur_request&aiv=7a521807"
    }
  ],
  "requirementsBaseline": {
    "path": "requirements.md",
    "sha256": "sha256:5376c7bea5a8d192fe414259f061c397cda6b49ee3256c36c53c7ea62cc60ef9",
    "revision": 1,
    "itemHashes": {
      "FR-1": "sha256:b6680644a60b9ed4e7b4a27f2dd28f75dcc519358891f4e751c5c6bc826ae8d7",
      "FR-2": "sha256:714fc005432c9f8dc3cb39bb797a397de89ec7ca7016ed910a84a3e9b49e8e55",
      "H-1": "sha256:4c8d3e21ba2703cc8cba6664f0f3eebdad248b2e390c7eb99f350bf7407ec2a5",
      "H-2": "sha256:8274395f8455bb85b0fea00b75f396d510b1b7d7ad610b14b00bb4af6a889f22"
    },
    "sourceContentHash": "sha256:851a0fffe88ff5bad4180017c6d31a11d638863f9b61c690018e38cae8b5a6c7"
  },
  "deliveryScope": {
    "completed": [
      {
        "itemId": "FR-1",
        "evidence": [
          "runBatch 写入及回读验证通过 1/1（表单 kdtest_pur_request，formId 64ZAX5Y8QJ1Y，实体与字段共 11 项验证通过）",
          "表头自定义字段：申请日期、申请人、申请组织、备注；分录字段：物料编码、物料名称、计量单位、数量、期望到货日期（创建回读验证通过）",
          "保存操作必填校验已启用（MustInputValidation enabled，verified=true）"
        ]
      },
      {
        "itemId": "FR-2",
        "evidence": [
          "采用标准单据模板（bos_billtpl），预置保存/提交/审核生命周期操作，单据编号为模板预置手工编码",
          "保存操作回读 verified=true（operationType=save）；提交操作必填校验模板已启用（already enabled，verified=true）"
        ]
      },
      {
        "itemId": "H-1",
        "evidence": [
          "表头字段申请日期/申请人/申请组织/备注创建并回读验证",
          "申请日期默认当天（getToday 设计默认值）、单据编号必填（MustInput）属性设置验证通过（verifiedPropertyCount=2）"
        ]
      },
      {
        "itemId": "H-2",
        "evidence": [
          "分录字段物料编码/物料名称/计量单位/数量/期望到货日期创建并回读验证",
          "保存时数量大于 0 校验写入并验证（ConditionValidation：kdtest_quantity <= 0 阻断，TrueThrow，消息\"数量必须大于 0\"，verified=true）"
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
- 在 kdtest_meta_cover 应用下新建一张采购申请单，业务人员可录入采购需求信息并保存，保存后数据可回读。
- 采购申请单按苍穹标准单据规则流转：单据编号手工编码，生命周期为保存→提交→审核。
- 单据头建议字段：单据编号（文本，必填，手工录入）、申请日期（日期，默认当天）、申请人（文本）、申请组织（文本）、备注（文本）。
- 单据体（分录）建议字段：物料编码（文本）、物料名称（文本）、数量（数量，大于 0）、计量单位（文本）、期望到货日期（日期）。
<!-- cosmic-scope-view:end -->

