# Plasma Rewards Tracker for Loon

用于抓取 Plasma One 奖励接口：

`https://pay-tasks.prod.plasma-one.tech/api/v1/user/rewards/primaryCashBack`

## 功能

- 读取响应 JSON，不修改原响应。
- 记录累计奖励、累计邀请、累计返现。
- 记录本月合计、本月邀请、本月返现。
- 记录 `Accruing`、目标结算日期金额、`Paid`。
- 计算与上一次抓取相比的金额增量。
- 本地保留最近 100 次发生变化的快照。
- 默认只有数据变化时通知，也可以改成每次请求通知或关闭通知。
- 可在本机通知中显示主邀请码的已使用/剩余数量。
- 插件内提供“查看 Plasma 奖励”手动脚本入口。

## 隐私说明

- 仓库中不包含任何用户的真实奖励金额、邀请码、用户 ID、Token、Cookie、Authorization 或完整 API 响应。
- 脚本不会把抓取到的数据发送到第三方服务器。
- 抓取结果仅使用 Loon 的 `$persistentStore` 保存在设备本地，并通过 `$notification` 在设备本地显示。

## 文件

- `Plasma_Rewards_Tracker.plugin`：Loon 插件入口
- `plasma_rewards.js`：抓取和统计脚本

## 安装

在 Loon 中通过插件 URL 导入 `Plasma_Rewards_Tracker.plugin`。

插件已经包含：

- `primaryCashBack` 的 `http-response` 规则
- `requires-body=true`
- `pay-tasks.prod.plasma-one.tech` MITM hostname

启用后，需要保证 Loon 的 MITM 证书正常生效，脚本才能读取 HTTPS 响应 Body。

## 通知模式

插件参数 `notify`：

- `change`：只有数据变化时通知（默认）
- `always`：每次请求都通知
- `off`：只记录，不通知

通知中的金额、结算日期和邀请码均来自你设备当次抓到的响应，不会写入本仓库。
