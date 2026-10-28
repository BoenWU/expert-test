# 测试验证报告

**结论：通过**

必测 AC-1 与可选 AC-2 全部通过。在 feature_vb 环境（应用 kdtest_meta_cover，表单 kdtest_pur_request）以手工唯一编码 PURQA20261023001 完成采购申请单录入、保存、重开回读、提交、审核全流程：保存后状态为“暂存”（苍穹标准单据保存态文案），提交后为“已提交”，审核后为“已审核”，审核后录入数据不变。未发现业务缺陷。

## 测试范围与环境

- 目标：核验本次业务需求
- 应用：元数据修改测试
- 测试数据：本次任务专用测试记录

## 实际测试结果

| 业务操作 | 预期结果 | 实际结果 | 结论 | 证据 |
| --- | --- | --- | --- | --- |
| 新建采购申请单，手工录入唯一单据编号 PURQA20261023001 及表头信息（申请日期默认当天 2026-10-23、申请人张三、申请组织测试采购部、备注验收测试-采购申请），录入分录行（物料编码 WL-QA-001、物料名称测试物料-笔记本电脑、计量单位经 F7 引用选择“个”、数量 5、期望到货日期 2026-10-30），执行保存，并从列表按唯一单据编号重新打开该单据核对。 | 保存成功，重新打开该单据可回读已录入信息。 | 保存成功：保存操作网络请求（f=kdtest_pur_request&amp;ac=save）返回 Cosmic-Status=1；列表出现该记录（PURQA20261023001 / 暂存 / 2026-10-23 / 张三 / 测试采购部 / 验收测试-采购申请）。重开同一记录后表头与分录全部字段回读一致：单据编号 PURQA20261023001、申请日期 2026-10-23、申请人张三、申请组织测试采购部、备注验收测试-采购申请；明细行物料编码 WL-QA-001、物料名称测试物料-笔记本电脑、计量单位个、数量 5、期望到货日期 2026-10-30。 | 通过 | ["保存请求 POST /form/batchInvokeAction.do?appId=kdtest_meta_cover&amp;f=kdtest_pur_request&amp;ac=save 返回 200，Cosmic-Status: 1","列表页查询显示共 1 条记录，行数据与录入表头一致，单据状态“暂存”","重开详情页各字段读回值与录入值逐一核对一致（表头 5 项 + 分录 5 项）"] |
| 对已保存的采购申请单（PURQA20261023001）依次执行提交、审核操作，并观察单据状态与数据。 | 单据可完成提交进入待审核状态，审核后进入已审核状态且录入数据不变。 | 提交后页面提示“提交成功。”，单据状态由“暂存”变为“已提交”；执行审核后单据状态变为“已审核”；审核后核对表头（单据编号、申请日期、申请人、申请组织、备注）与分录（物料编码、物料名称、计量单位、数量、期望到货日期）全部与录入值一致，数据不变。 | 通过 | ["提交操作返回“提交成功。”提示，工具栏出现审核按钮，状态字段读回“已提交”","审核后状态字段读回“已审核”，审核人字段已填写","审核后页面文本核对：PURQA20261023001、2026-10-23、张三、测试采购部、验收测试-采购申请、WL-QA-001、测试物料-笔记本电脑、个、5、2026-10-30 均存在"] |

## 问题与未验证范围

本次范围内未发现问题，无未执行检查；结论仅覆盖上述实际测试。

<!-- structured-report:v1
{"decision":"pass","summary":{"objective":"Verify the current business requirements","changedBehavior":"必测 AC-1 与可选 AC-2 全部通过。在 feature_vb 环境（应用 kdtest_meta_cover，表单 kdtest_pur_request）以手工唯一编码 PURQA20261023001 完成采购申请单录入、保存、重开回读、提交、审核全流程：保存后状态为“暂存”（苍穹标准单据保存态文案），提交后为“已提交”，审核后为“已审核”，审核后录入数据不变。未发现业务缺陷。","nonGoals":[],"riskLabels":[]},"environment":{"name":"元数据修改测试","version":"Not recorded","dataProfile":"Task-owned test records","configuration":"{\"baseUrl\":\"https://feature.kingdee.com:1026/feature_vb\",\"appCode\":\"kdtest_meta_cover\"}"},"verification":[{"checkId":"AC-1","type":"E2E/UI","status":"passed","evidence":"[\"保存请求 POST /form/batchInvokeAction.do?appId=kdtest_meta_cover&f=kdtest_pur_request&ac=save 返回 200，Cosmic-Status: 1\",\"列表页查询显示共 1 条记录，行数据与录入表头一致，单据状态“暂存”\",\"重开详情页各字段读回值与录入值逐一核对一致（表头 5 项 + 分录 5 项）\"]","plan":[{"requirementId":"AC-1","kind":"interaction","action":"新建采购申请单，手工录入唯一单据编号 PURQA20261023001 及表头信息（申请日期默认当天 2026-10-23、申请人张三、申请组织测试采购部、备注验收测试-采购申请），录入分录行（物料编码 WL-QA-001、物料名称测试物料-笔记本电脑、计量单位经 F7 引用选择“个”、数量 5、期望到货日期 2026-10-30），执行保存，并从列表按唯一单据编号重新打开该单据核对。","expected":"保存成功，重新打开该单据可回读已录入信息。"}],"observation":{"method":"browser","actor":"expert","reference":"[\"保存请求 POST /form/batchInvokeAction.do?appId=kdtest_meta_cover&f=kdtest_pur_request&ac=save 返回 200，Cosmic-Status: 1\",\"列表页查询显示共 1 条记录，行数据与录入表头一致，单据状态“暂存”\",\"重开详情页各字段读回值与录入值逐一核对一致（表头 5 项 + 分录 5 项）\"]"},"assertions":[{"requirementId":"AC-1","kind":"interaction","action":"新建采购申请单，手工录入唯一单据编号 PURQA20261023001 及表头信息（申请日期默认当天 2026-10-23、申请人张三、申请组织测试采购部、备注验收测试-采购申请），录入分录行（物料编码 WL-QA-001、物料名称测试物料-笔记本电脑、计量单位经 F7 引用选择“个”、数量 5、期望到货日期 2026-10-30），执行保存，并从列表按唯一单据编号重新打开该单据核对。","expected":"保存成功，重新打开该单据可回读已录入信息。","actual":"保存成功：保存操作网络请求（f=kdtest_pur_request&ac=save）返回 Cosmic-Status=1；列表出现该记录（PURQA20261023001 / 暂存 / 2026-10-23 / 张三 / 测试采购部 / 验收测试-采购申请）。重开同一记录后表头与分录全部字段回读一致：单据编号 PURQA20261023001、申请日期 2026-10-23、申请人张三、申请组织测试采购部、备注验收测试-采购申请；明细行物料编码 WL-QA-001、物料名称测试物料-笔记本电脑、计量单位个、数量 5、期望到货日期 2026-10-30。","status":"passed"}]},{"checkId":"AC-2","type":"E2E/UI","status":"passed","evidence":"[\"提交操作返回“提交成功。”提示，工具栏出现审核按钮，状态字段读回“已提交”\",\"审核后状态字段读回“已审核”，审核人字段已填写\",\"审核后页面文本核对：PURQA20261023001、2026-10-23、张三、测试采购部、验收测试-采购申请、WL-QA-001、测试物料-笔记本电脑、个、5、2026-10-30 均存在\"]","plan":[{"requirementId":"AC-2","kind":"interaction","action":"对已保存的采购申请单（PURQA20261023001）依次执行提交、审核操作，并观察单据状态与数据。","expected":"单据可完成提交进入待审核状态，审核后进入已审核状态且录入数据不变。"}],"observation":{"method":"browser","actor":"expert","reference":"[\"提交操作返回“提交成功。”提示，工具栏出现审核按钮，状态字段读回“已提交”\",\"审核后状态字段读回“已审核”，审核人字段已填写\",\"审核后页面文本核对：PURQA20261023001、2026-10-23、张三、测试采购部、验收测试-采购申请、WL-QA-001、测试物料-笔记本电脑、个、5、2026-10-30 均存在\"]"},"assertions":[{"requirementId":"AC-2","kind":"interaction","action":"对已保存的采购申请单（PURQA20261023001）依次执行提交、审核操作，并观察单据状态与数据。","expected":"单据可完成提交进入待审核状态，审核后进入已审核状态且录入数据不变。","actual":"提交后页面提示“提交成功。”，单据状态由“暂存”变为“已提交”；执行审核后单据状态变为“已审核”；审核后核对表头（单据编号、申请日期、申请人、申请组织、备注）与分录（物料编码、物料名称、计量单位、数量、期望到货日期）全部与录入值一致，数据不变。","status":"passed"}]}],"coverage":{"acceptance":"Current business acceptance scope","riskLabels":[],"mandatoryAcceptance":[{"id":"AC-1","source":"用户请求原文（wi-t1000362，2026-10-23）：帮我创建一张采购申请单；在 kdtest_meta_cover 下建一张采购申请单","surface":"user-interface","evidenceKinds":["interaction"],"status":"met","checkIds":["AC-1"]}]},"defects":[],"skippedChecks":[],"residualRisks":[],"baselineUpdates":[]}
-->
