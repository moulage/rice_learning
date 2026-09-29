# 长安幼小衔接学习课件

一个面向 6 岁儿童的浏览器学习课件，以“长安学习地图 + 创作学习乐园”组织 16 周课程。课件覆盖数学加速、拼音优先、英语字母优先、长安情境创作和周期复习。

## 本地开发

```bash
npm install
npm run dev
```

打开终端输出的本地地址即可使用。

## 校验与构建

```bash
npm run lint
npm run validate:content
npm test
npm run build
```

`npm run validate:content` 会检查 80 节课、知识点绑定、审核状态和课程结构。

## 数据与隐私

学习进度保存在当前浏览器的 IndexedDB 中，并留有本地 localStorage 恢复副本。课件不建立云端账号，不上传儿童身份信息、学习行为或跟读录音。家长可在家长中心导出、导入、删除录音或重置进度。

## 部署

推送到 `main` 分支后，GitHub Actions 会执行类型检查、内容校验、测试和生产构建，并部署到 GitHub Pages。部署完成后，任意电脑都可以通过仓库 Pages 设置显示的 HTTPS 地址访问。
