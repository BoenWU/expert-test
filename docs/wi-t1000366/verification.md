# 测试验证报告

**结论：通过**

在 kdtest_meta_cover 应用中实际执行采购申请单全流程验收：手工单据编号 PRQA10260366 新建、保存、按编号重新打开核对、提交、审核全部成功，表头与两行分录数据重开后完全一致。

## 测试范围与环境

- 目标：核验本次业务需求
- 应用：元数据修改测试
- 测试数据：本次任务专用测试记录

## 实际测试结果

| 业务操作 | 预期结果 | 实际结果 | 结论 | 证据 |
| --- | --- | --- | --- | --- |
| 在 kdtest_meta_cover 中新建采购申请单，手工填写单据编号 PRQA10260366 及表头、分录信息后保存，再从列表按编号重新打开核对 | 保存成功；重开后单据编号与录入内容一致 | 保存请求成功（batchInvokeAction ac=save 返回 200）；列表中出现该单据（1 条），重新打开后单据编号 PRQA10260366、申请日期 2026-10-26、申请人 吴博文、申请部门 环宇国际集团有限公司、申请理由 采购申请单验收测试、备注 验收测试备注，与录入完全一致 | 通过 | 保存后列表快照显示单据 PRQA10260366（状态暂存）；重开后表单快照回读全部字段值一致 |
| 对已保存的采购申请单执行提交 | 提交成功，单据进入已提交状态 | 点击提交后单据状态由暂存变为已提交，工具栏出现审核按钮 | 通过 | 提交后读取单据状态字段显示已提交 |
| 对已提交的采购申请单执行审核 | 审核成功，单据进入已审核状态 | 页面提示“审核成功。”，单据状态变为已审核，审核人记录为 吴博文 | 通过 | 审核操作后页面消息“审核成功。”；状态字段读取为已审核；审核人字段读取为 吴博文 |
| 录入建议表头字段（申请日期、申请人、申请部门、申请理由、备注）并保存后重开回读 | 各字段值与录入一致 | 申请日期默认当天 2026-10-26、申请人默认当前登录人 吴博文，申请理由与备注手工录入；保存重开后 5 个表头字段值全部一致 | 通过 | 重开后表单快照：申请日期 2026-10-26、申请人 吴博文、申请部门 环宇国际集团有限公司、申请理由 采购申请单验收测试、备注 验收测试备注 |
| 分录新增 2 行，录入物料、申请数量、计量单位、期望到货日期、行备注并保存后重开回读 | 行数与各行字段值与录入一致 | 两行明细保存重开后完全一致：行1 测试使用物料（F7 选择的已审核物料）、数量 10.0、单位 打（物料自动带出）、期望到货日期 2026-11-05、行备注 验收测试行1；行2 鼠标、数量 5、单位 个（自动带出）、期望到货日期 2026-11-10、行备注 验收测试行2 | 通过 | F7 物料列表显示所选物料均为已审核可用；重开后分录快照回读两行数据一致 |

## 问题与未验证范围

本次范围内未发现问题，无未执行检查；结论仅覆盖上述实际测试。

<!-- structured-report:v1
{"decision":"pass","summary":{"objective":"Verify the current business requirements","changedBehavior":"在 kdtest_meta_cover 应用中实际执行采购申请单全流程验收：手工单据编号 PRQA10260366 新建、保存、按编号重新打开核对、提交、审核全部成功，表头与两行分录数据重开后完全一致。","nonGoals":[],"riskLabels":[]},"environment":{"name":"元数据修改测试","version":"Not recorded","dataProfile":"Task-owned test records","configuration":"{\"baseUrl\":\"https://feature.kingdee.com:1026/feature_vb\",\"appCode\":\"kdtest_meta_cover\"}"},"verification":[{"checkId":"AC-01","type":"E2E/UI","status":"passed","evidence":"保存后列表快照显示单据 PRQA10260366（状态暂存）；重开后表单快照回读全部字段值一致","plan":[{"requirementId":"AC-01","kind":"interaction","action":"在 kdtest_meta_cover 中新建采购申请单，手工填写单据编号 PRQA10260366 及表头、分录信息后保存，再从列表按编号重新打开核对","expected":"保存成功；重开后单据编号与录入内容一致"}],"observation":{"method":"browser","actor":"expert","reference":"保存后列表快照显示单据 PRQA10260366（状态暂存）；重开后表单快照回读全部字段值一致"},"assertions":[{"requirementId":"AC-01","kind":"interaction","action":"在 kdtest_meta_cover 中新建采购申请单，手工填写单据编号 PRQA10260366 及表头、分录信息后保存，再从列表按编号重新打开核对","expected":"保存成功；重开后单据编号与录入内容一致","actual":"保存请求成功（batchInvokeAction ac=save 返回 200）；列表中出现该单据（1 条），重新打开后单据编号 PRQA10260366、申请日期 2026-10-26、申请人 吴博文、申请部门 环宇国际集团有限公司、申请理由 采购申请单验收测试、备注 验收测试备注，与录入完全一致","status":"passed"}]},{"checkId":"AC-02","type":"E2E/UI","status":"passed","evidence":"提交后读取单据状态字段显示已提交","plan":[{"requirementId":"AC-02","kind":"interaction","action":"对已保存的采购申请单执行提交","expected":"提交成功，单据进入已提交状态"}],"observation":{"method":"browser","actor":"expert","reference":"提交后读取单据状态字段显示已提交"},"assertions":[{"requirementId":"AC-02","kind":"interaction","action":"对已保存的采购申请单执行提交","expected":"提交成功，单据进入已提交状态","actual":"点击提交后单据状态由暂存变为已提交，工具栏出现审核按钮","status":"passed"}]},{"checkId":"AC-03","type":"E2E/UI","status":"passed","evidence":"审核操作后页面消息“审核成功。”；状态字段读取为已审核；审核人字段读取为 吴博文","plan":[{"requirementId":"AC-03","kind":"interaction","action":"对已提交的采购申请单执行审核","expected":"审核成功，单据进入已审核状态"}],"observation":{"method":"browser","actor":"expert","reference":"审核操作后页面消息“审核成功。”；状态字段读取为已审核；审核人字段读取为 吴博文"},"assertions":[{"requirementId":"AC-03","kind":"interaction","action":"对已提交的采购申请单执行审核","expected":"审核成功，单据进入已审核状态","actual":"页面提示“审核成功。”，单据状态变为已审核，审核人记录为 吴博文","status":"passed"}]},{"checkId":"AC-04","type":"E2E/UI","status":"passed","evidence":"重开后表单快照：申请日期 2026-10-26、申请人 吴博文、申请部门 环宇国际集团有限公司、申请理由 采购申请单验收测试、备注 验收测试备注","plan":[{"requirementId":"AC-04","kind":"interaction","action":"录入建议表头字段（申请日期、申请人、申请部门、申请理由、备注）并保存后重开回读","expected":"各字段值与录入一致"}],"observation":{"method":"browser","actor":"expert","reference":"重开后表单快照：申请日期 2026-10-26、申请人 吴博文、申请部门 环宇国际集团有限公司、申请理由 采购申请单验收测试、备注 验收测试备注"},"assertions":[{"requirementId":"AC-04","kind":"interaction","action":"录入建议表头字段（申请日期、申请人、申请部门、申请理由、备注）并保存后重开回读","expected":"各字段值与录入一致","actual":"申请日期默认当天 2026-10-26、申请人默认当前登录人 吴博文，申请理由与备注手工录入；保存重开后 5 个表头字段值全部一致","status":"passed"}]},{"checkId":"AC-05","type":"E2E/UI","status":"passed","evidence":"F7 物料列表显示所选物料均为已审核可用；重开后分录快照回读两行数据一致","plan":[{"requirementId":"AC-05","kind":"interaction","action":"分录新增 2 行，录入物料、申请数量、计量单位、期望到货日期、行备注并保存后重开回读","expected":"行数与各行字段值与录入一致"}],"observation":{"method":"browser","actor":"expert","reference":"F7 物料列表显示所选物料均为已审核可用；重开后分录快照回读两行数据一致"},"assertions":[{"requirementId":"AC-05","kind":"interaction","action":"分录新增 2 行，录入物料、申请数量、计量单位、期望到货日期、行备注并保存后重开回读","expected":"行数与各行字段值与录入一致","actual":"两行明细保存重开后完全一致：行1 测试使用物料（F7 选择的已审核物料）、数量 10.0、单位 打（物料自动带出）、期望到货日期 2026-11-05、行备注 验收测试行1；行2 鼠标、数量 5、单位 个（自动带出）、期望到货日期 2026-11-10、行备注 验收测试行2","status":"passed"}]}],"coverage":{"acceptance":"Current business acceptance scope","riskLabels":[],"mandatoryAcceptance":[{"id":"AC-01","source":"用户请求原文（wi-t1000366，2026-10-26）：创建一张采购申请单——在 kdtest_meta_cover 下新建一张采购申请单","surface":"user-interface","evidenceKinds":["interaction"],"status":"met","checkIds":["AC-01"]},{"id":"AC-02","source":"用户请求原文（wi-t1000366，2026-10-26）：创建一张采购申请单——在 kdtest_meta_cover 下新建一张采购申请单","surface":"user-interface","evidenceKinds":["interaction"],"status":"met","checkIds":["AC-02"]},{"id":"AC-03","source":"用户请求原文（wi-t1000366，2026-10-26）：创建一张采购申请单——在 kdtest_meta_cover 下新建一张采购申请单","surface":"user-interface","evidenceKinds":["interaction"],"status":"met","checkIds":["AC-03"]}]},"defects":[],"skippedChecks":[],"residualRisks":[],"baselineUpdates":[]}
-->
