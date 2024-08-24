为什么要用`PE`？

官方`ISO`镜像虽然简单，方便，步骤少，但是对应的功能也是最少的，除了装系统给磁盘格式化分区之外，什么功能都没有 

而且三种格式化的方式也比较僵硬`NTFS`和`exFAT`在某些主板上不能启动，`FAT32`不支持32G的单个硬盘分区，且不允许存放单个体积大于4G的文件

所以就衍生出来了另外一种使用PE便携式操作系统进行辅助安装

什么是`PE`:question:

我们的操作系统是安装到磁盘内的，磁盘是存储数据的一种介质

我们的U盘同样时存储数据的一种介质

同样的道理，那我们同样也可以把系统装进U盘里

但是由于目前大部分U盘性能实在是弱鸡，你把完整版的系统装进U盘，就算能成功开启也是卡的不行，所以有些人就把操作系统精简掉，只保留一些基本的运行环境和一些驱动，整理出来一个简化版的操作系统，这个操作西铜1就可以非常流畅的运行在U盘里，这种被装在U盘里面的简化版的操作系统就被叫做便携式操作系统 ，简称`PE`(`Preinstallation Environment`),又被称为预安装环境

既然是操作系统我们也是可以进行很多软件的运行的，你可以运行很多系统的检测工具，此外你还可以直接访问电脑的磁盘，在主系统不能正常开机的情况下，你还可以进行系统文件的修复或者重要数据的拷贝，这些都是官方`ISO`无法提供给你的

此外由于`PE`本身是可以直接读取`ISO`安装文件的，那所有的系统安装包，你都不需要解压，你可以整理在一个文件夹里放好，这样U盘里的文件就不会显得很乱了，拿来当普通的U盘都是毫无问题的，而且你还可以在U盘内放入不同的操作系统，win10，win11，依据不同的情况自行选择安装 

科普完了，下面正片开始 :star2:

推荐使用[rufus](https://rufus.ie/zh/)，[ventoy](https://www.ventoy.net/cn/index.html)或是[微PE](https://www.wepe.com.cn/)

下面以`微PE`举例 :expressionless:

打开`微PE`的官网，选择下载自己电脑对应的工具包

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%BE%AEPE%E5%AE%98%E7%BD%91.png" style="zoom:50%;" />

和之前一样，本地电脑下载完工具包之后，插入U盘，在电脑上打开工具包，在右下角选择把`PE`安装进U盘内

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/打开工具包.png" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%AE%89%E8%A3%85%E8%BF%9BU%E7%9B%98.png" style="zoom:50%;" />

注意查看待写入U盘是否为你插入的U盘 :eyes:

U盘卷标就是修改U盘的名称

`PE`壁纸可依据个人喜好自行选择

同时勾选包含`Dos`工具箱和个性化盘符图标

个性化盘符图标就是我们可以自定义`USB`驱动器或硬盘分区在“我的电脑”中显示的图标

而`Dos`工具箱是一组运行在`DOS`环境下的系统工具和软件，这些工具可以在没有图形用户界面的情况下执行系统维护和修复任务

> 制作PE会将U盘内数据全部清空，内有重要数据请提前拷贝！！！

点击开始制作就会自动进行PE的安装了，这里大概会花费3~10分钟，依据U盘性能不同，看你U盘读写速度有多快了，耐心等待一下

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%BC%80%E5%A7%8B%E5%88%B6%E4%BD%9C%E5%90%AF%E5%8A%A8%E7%9B%98.png" style="zoom:50%;" />

安装完成

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/PE%E6%88%90%E5%8A%9F%E5%AE%89%E8%A3%85%E8%BF%9BU%E7%9B%98.png" style="zoom:50%;" />

打开U盘你会发现，U盘被分为了两个分区，一个EFI分区一个微`PE`工具箱

`EFI`为`PE`系统本身存在的分区，不要动它

微`PE`工具箱是我们安装`PE`系统时给我们的U盘重命名为了微`PE`工具箱，可以拿来当普通U盘来使用

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/PE%E5%B7%A5%E5%85%B7%E7%AE%B1.png" style="zoom:50%;" />

> 有时EFI分区会被自动隐藏，只有一个空白分区，为正常现象

下面下载win10的安装包，可以和前一篇的官方ISO镜像安装的教程一样去微软官网下载或者是去[MSDN](https://next.itellyou.cn/)下载微软官方的`ISO`镜像文件，而且版本和更新补丁包非常的详细

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/MSDN.png" style="zoom:50%;" />

将下载好的`iso`镜像文件拖进u盘内 

接下来就是把U盘插入待安装系统的电脑上，开机不断点按`delete`键进入`bios`模式，调整U盘为第一启动项（具体流程请查看官方ISO镜像安装教程）

成功进入微PE系统主界面

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%BE%AEPE%E6%A1%8C%E9%9D%A2.png)

既然使用了PE系统就不要再使用微软官方的蹩脚的命令行切换分区了

点击diskgenius，又被称为分区精灵

这个空闲的未被分区的硬盘就是我们的电脑的512G固态硬盘，下面对它进行分区操作

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%88%86%E5%8C%BA%E7%B2%BE%E7%81%B5%EF%BC%8C%E5%9B%BE%E5%BD%A2%E5%8C%96%E7%A3%81%E7%9B%98%E5%88%86%E5%8C%BA.png" style="zoom:50%;" />

> 分区前注意查看分区表类型
>
> UEFI ---->  GPT
>
> legacy ----> MBR

:floppy_disk: 切换磁盘分区格式 

右键需要更改分区的磁盘点击切换为GUID格式

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%88%87%E6%8D%A2GUID%E6%A0%BC%E5%BC%8F.png)

保存更改

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E4%BF%9D%E5%AD%98%E6%9B%B4%E6%94%B9.png)

更改完毕

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E6%9B%B4%E6%94%B9%E5%AE%8C%E6%AF%95.png)

legacy引导模式同理

引导模式和磁盘分区对应上以后，开始磁盘分区

右键需要分区的磁盘，点击快速分区

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%BC%80%E5%A7%8B%E7%A3%81%E7%9B%98%E5%88%86%E5%8C%BA.png" alt="分区" style="zoom:50%;" />

自行选择分区个数以及盘符名称，我们的系统盘C盘建议100~120G之间

> 请务必勾选对齐到此扇区的整数倍
>
> 为固态硬盘的4K对齐，未勾选会损失固态硬盘的性能，降低u盘的使用寿命

分区完成 

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%88%86%E5%8C%BA%E5%AE%8C%E6%88%90.png" style="zoom:50%;" />

分区完成后，打开U盘内的系统镜像右键装载，之后的流程和官方ISO镜像安装一样这里就不再过多赘述

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%8F%B3%E9%94%AE%E8%A3%85%E8%BD%BD.png" style="zoom:50%;" />

如需安装其他系统可在该位置存放别的系统镜像文件

电脑系统安装教程施工完毕，完结撒花  :white_flower::white_flower::white_flower:



