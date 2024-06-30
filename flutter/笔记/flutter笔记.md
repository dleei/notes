## 简介

Flutter 是 Google 推出并开源的移动应用开发框架，主打跨平台、高保真、高性能。开发者可以通过 Dart 语言开发 App，一套代码同时运行在 iOS 和 Android平台。 Flutter 提供了丰富的组件、接口，开发者可以很快地为 Flutter 添加 Native（即原生开发，指基于平台原生语言来开发应用，flutter可以和平台原生语言混合开发） 扩展

## 搭建fluter开发环境

工欲善其事必先利其器

安装flutter

[flutter中文官网](https://docs.flutter.cn/)

使用镜像

由于在国内访问Flutter有时可能会受到限制，Flutter官方为中国开发者搭建了临时镜像，大家可以将如下环境变量添加到到用户环境变量中：

```bash
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

**注意：** 此镜像为临时镜像，并不能保证一直可用，读者可以参考https://flutter.dev/community/china 以获得有关镜像服务器的最新动态

使用vscode开发工具开发

安装插件

flutter

dart



## 获取flutter的SDK

### 使用vscode安装



### 自行下载SDK

1. 去flutter官网下载其最新可用的安装包，下载地址：https://flutter.dev/docs/development/tools/sdk/releases 。

   注意，Flutter的渠道版本会不停变动，请以Flutter官网为准。另外，在中国大陆地区，要想正常获取安装包列表或下载安装包，可能需要翻墙，读者也可以去Flutter github项目下去下载安装包，地址：https://github.com/flutter/flutter/releases 。

2. 将安装包zip解压到你想安装Flutter SDK的路径（如：`C:\src\flutter`；注意，**不要**将flutter安装到需要一些高权限的路径如`C:\Program Files\`）。

3. 在Flutter安装目录的`flutter`文件下找到`flutter_console.bat`，双击运行并启动**flutter命令行**，接下来，你就可以在Flutter命令行运行flutter命令了

#### 更新环境变量

如果你想在Windows系统自带命令行运行flutter命令，需要添加以下环境变量到用户PATH：

- 在开始菜单的搜索功能键入“env”，然后选择 编辑系统环境变量
- 在“用户变量”下检查是否有名为“Path”的条目:
  - 如果该条目存在， 追加 flutter\bin的全路径，使用 ; 作为分隔符.
  - 如果该条目不存在，创建一个新用户变量 Path ，然后将 `flutter\bin` 的全路径作为它的值.

<span style="color: red">**重启Windows以应用此更改**</span>