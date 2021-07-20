---
title: window版 Terminal
date: 2021-07-17
tags:
 - 工具
categories:
 - 工具
sidebar: false
---
## 下载 windows Terminal 工具
   win10 在 Microsoft Store 应用商店里下载此工具。会有硬件的要求，看下载时的提示。
   最新版本的配置要简单很多，都是可视化配置

**下载完windows Terminal 后的初始界面是这个样的“傻大蓝”。**并没有像官方演示的那么美观（所以得自己捯饬捯饬好看的样子）<br />![](/1594371043402-54cbf8f0-6c5e-47a5-8afd-8720f7618ca7.webp)<br />**第一步安装相关的模块和PowerLine主题**
```
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
复制代码
```
如果你使用管理员权限打开PowerShell并且想把oh-my-posh安装到所有用户，则输入
```
Install-Module posh-git
Install-Module oh-my-posh
复制代码
```
安装完成后，输入
```
Import-Module posh-git
Import-Module oh-my-posh
Set-Theme PowerLine
复制代码
```
如果出现以下报错
```
无法加载文件 C:\Users\Hong\Documents\WindowsPowerShell\Microsoft.PowerShell
_profile.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 http://go.micros
oft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 3
复制代码
```
以管理员身份再次运行Windows Terminal 并输入以下命令。（没有报错请忽略）
```
Set-ExecutionPolicy RemoteSigned
复制代码
```
但是这次使用Import-Module的指令，再次启动PowerShell就会发现没有效果，这是因为这些指令仅限于本次会话的PowerShell有效，因此，若要使这一效果在每次启动的时候都有效，那就要将其添加到启动脚本中。打开`~\Documents\WindowsPowerShell`新建文本文档，命名为`Microsoft.PowerShell_profile.ps1`（记得开拓展名显示），输入以下内容，保存。"~":表示当前用户的根目录
```
Import-Module posh-git
Import-Module oh-my-posh
Set-Theme PowerLine
复制代码
```
这样，在每次PoweShell打开的时候都会加载自定义的文件并启用PowerLine主题。<br />![image.png](/1594371162555-42756772-e089-48d1-b63f-a88c03ab34d4.png)<br />看起来有乱码。这是因为没设置支持图标的字体而已。<br />**第二步注册字体**<br />这里使用的是更纱等距黑体，即`Sarasa Term SC` 这个名称配置windows Terminal 字体时要用到（记得有这回事）要不然小图标还是乱码。这款字体是开源字体，可以美观地显示中文，而且是等宽字体，也就说在终端中不会出现排版错误，这款字体你可以在[这里下载](https://github.com/be5invis/Sarasa-Gothic/releases)。<br />![image.png](/1594371186507-7e581eb4-6a0d-4df7-ade4-ac3679f9b1bc.png)<br />下载完后并解压安装当然你也可以使用你喜欢的等宽字体（最好是等宽，但不强制）<br />![image.png](/1594371209733-6ba96910-64c7-48e2-8591-995ccb4f7a7a.png)<br />**第三步改造终端的配置文件**Windows Terminal的配置文件储存在`~\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\profiles.json`这个json文件中，在代码编辑器中打开并编辑（比如VS Code）。<br />![image.png](/1594371231016-067afb56-48e7-4484-8a17-18feb470616e.png)<br />接下来就新增一些配置进去来美化界面。这是我的配置贴出来参考
```
// To view the default settings, hold "alt" while clicking on the "Settings" button.
// For documentation on these settings, see: https://aka.ms/terminal-documentation
{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "defaultProfile": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",  //打开windows Terminal 时默认程序
    "profiles":
    {
        "defaults":  //list下的所有终端默认配置
        {
            // Put settings here that you want to apply to all profiles
        },
        "list":
        [
            {
                // Make changes here to the powershell.exe profile
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",  //唯一的guid 不要改
                "name": "Windows PowerShell",                      
                "commandline": "powershell.exe",
                "hidden": false,
                //以下是新增加的配置项
                "closeOnExit" : true,
                "colorScheme" : "Ubuntu",     //颜色主题名称,就是schemes下面的每个实例的 name 值
                "cursorColor" : "#ffffff",           //光标颜色
                "cursorShape" : "filledBox",         //光标类型  可选 bar empytBox filledBox vintage
                "fontFace" : "Sarasa Term SC",       //字体名称  安装字体时的字体名称
                "fontSize" : 12,                     //字体大小
                "historySize" : 8001,
                "icon" : "D:\\image\\phone.jpg",     //程序的小图标，也就是在标题栏和新建中显示的图标地址
                "backgroundImage": "D:\\image\\bga.jpg",  //配置背景图片地址
                "acrylicOpacity" : 0.75,             //不透明度，值越大，背景就越浓，否则就越淡
                "backgroundImageOpacity": 0.25,      //背景图片的透明度
                "padding" : "0, 0, 0, 0",
                "snapOnInput" : true,
                "startingDirectory" : "%USERPROFILE%",
                "useAcrylic" : true,        //是否开启毛玻璃特效，值为false的时候就没有毛玻璃特效
                "tabTitle" : "chessYu"   //标签名称
            },
            {
                // Make changes here to the cmd.exe profile
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "name": "cmd",
                "commandline": "cmd.exe",
                "hidden": false
            },
            {
                "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
                "hidden": false,
                "name": "Azure Cloud Shell",
                "source": "Windows.Terminal.Azure"
            }
        ]
    },
    // Add custom color schemes to this array
    "schemes": [    //配置颜色主题的集合
        {
            "name": "Ubuntu",
            "black": "#2e3436",
            "red": "#cc0000",
            "green": "#4e9a06",
            "yellow": "#c4a000",
            "blue": "#3465a4",
            "purple": "#75507b",
            "cyan": "#06989a",
            "white": "#d3d7cf",
            "brightBlack": "#555753",
            "brightRed": "#ef2929",
            "brightGreen": "#8ae234",
            "brightYellow": "#fce94f",
            "brightBlue": "#729fcf",
            "brightPurple": "#ad7fa8",
            "brightCyan": "#34e2e2",
            "brightWhite": "#eeeeec",
            "background": "#300a24",
            "foreground": "#eeeeec"
        },
        {
            "name": "AdventureTime",
            "black": "#050404",
            "red": "#bd0013",
            "green": "#4ab118",
            "yellow": "#e7741e",
            "blue": "#0f4ac6",
            "purple": "#665993",
            "cyan": "#70a598",
            "white": "#f8dcc0",
            "brightBlack": "#4e7cbf",
            "brightRed": "#fc5f5a",
            "brightGreen": "#9eff6e",
            "brightYellow": "#efc11a",
            "brightBlue": "#1997c6",
            "brightPurple": "#9b5953",
            "brightCyan": "#c8faf4",
            "brightWhite": "#f6f5fb",
            "background": "#1f1d45",
            "foreground": "#f8dcc0"
          }
    ],                                              
    // Add any keybinding overrides to this array.
    // To unbind a default keybinding, set the command to "unbound"
    "keybindings": []                                            //配置终端的快捷键
}
复制代码
```
**第四步就是选颜色主题**<br />我这个配置文件内置了几个颜色主题，并且都是亮色的，很不符合一些人的胃口，这时候我们就需要在[mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)这个仓库中寻找自己喜欢的颜色主题，这里颜色主题有足足两百多个，选完自己喜欢的，就可以到仓库的[windowsterminal文件夹](https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/windowsterminal)里面下载适用于Windows Terminal的格式。选好之后，粘贴到schemes这个数组里，然后在想应用的配置文件里的`colorScheme`设置为你新粘贴的主题的名字。保存后Windows Terminal 是实时更新的，看看最终的配置效果。<br />![](/1594371043529-66544f9c-4ce7-4ab0-b196-9125aa88d62f.webp)<br />**结束语**<br />当时我安装字体时有点费劲，总是小图标乱码，后来发现是下载字体的安装包不对。最好是按我上面的字体安装步骤来，就没什么问题。<br />

#### 第五步（新增）实现图形颜色渐变
![image.png](/1594371287387-4b47c7a6-ce6d-41d6-8a8f-dd5ac97731f0.png)<br />进入~\Documents\WindowsPowerShell目录，编辑配置文件 Microsoft.PowerShell_profile.ps1
```markdown
 // Microsoft.PowerShell_profile.ps1
 
Import-Module posh-git
Import-Module oh-my-posh
Set-Theme PowerLine


node C:\Users\dell\Documents\WindowsPowerShell\comst.js   //已node环境跑 comst.js 文件
 
```
需要安装相关npm依赖包;
```markdown
const Printer = require('@darkobits/lolcatjs');

let img1 = `
             ____________________________________________________
            /                   假装是MAC                         \\
           |    _____________________________________________     |
           |   |                                             |    |
           |   |  C:\> git add .                              |    |
           |   |       git commit -m 'first commit'          |    |
           |   |       git push origin master_               |    |
           |   |                                             |    |
           |   |                                             |    |
           |   |                                             |    |
           |   |                                             |    |
           |   |_____________________________________________|    |
           |                                                      |
            \_____________________________________________________/
                   \\_______________________________________/
                _______________________________________________
             _-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- \`-_
          _-'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-.-.\`-_
       _-'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-\`__\`. .-.-.-.\`-_
    _-'.-.-.-.-. .-----.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-----. .-.-.-.-.\`-_
 _-'.-.-.-.-.-. .---.-. .-----------------------------. .-.---. .---.-.-.-.\`-_
:-----------------------------------------------------------------------------:
\`---._.-----------------------------------------------------------------._.---'
	             ☄ ❄ chessyu_vip@163.com ❅ ☼  \n
`;

let img = `
 ,--^----------,--------,-----,-------^--,
 | |||||||||   \`--------'     |          O
 \`+---------------------------^----------|
   \`\\_,-------, _________________________|
     / XXXXXX /\`|     /
    / XXXXXX / \`\\    /
   / XXXXXX /\\______(
  / XXXXXX /
 / XXXXXX /
(________(      ☄ ❄ chessyu_vip@163.com ❅ ☼  
 \`------'
`

let img3 = `
                   YAao,
                    Y8888b,
                  ,oA8888888b,
            ,aaad8888888888888888bo,
         ,d888888888888888888888888888b,
       ,888888888888888888888888888888888b,
      d8888888888888888888888888888888888888,
     d888888888888888888888888888888888888888b
    d888888P'                    'Y888888888888,
    88888P'                    Ybaaaa8888888888l
   a8888'                      'Y8888P' 'V888888
 d8888888a                                'Y8888
AY/'' '\\Y8b                                 ''Y8b
Y'      'YP     ☄ ❄ chessyu_vip@163.com ❅ ☼      ~~
         ''
`
let img4 = `
                                          .::::::'.::::::.
 .::::.                                 ..:::;''::::::'.::::.
 :::::::.                            .::::;'   .::'.:;::::'.:;
 :::'':::                         .:::;'      .::::''   ':::::
 ::'  '::.                       .:;'       .::::'       ':::;
 ::    '::.                    .::;'       .:::;'         '::.
 ::     '::.                  .::;'      .::::'            ':;
 ::.     '::.  :  :          .:;'       .::;:'             :::
 '::.     '::   :  :        .:;'      .::;:::.             ::;
  :::.     ::.  : .:       .::;      .::;::::::::.       .::;'
  ::::.    '::.  :::.     .:;'      .::'       '::::::::::::'
  :::::.    '::. ':::   .:;'      .:::::.         ':::::::.
  :: '':::.   '::: :::   .:;'      .::'  ':::.            '::.
  ::   ':::.   ':::::. .:;'     .::'       '::.           '::.
 .::      '::.   :::.:::'..  .::'           '::.         .::;
 :::.    .::::::':::::::::::::::.            '::.       .::;'
 '::::::::'    :::::::::::.    '::::::::.    .::::. .:::::;'
         .:::::::'::.:::::::::.        '::::::::::::;'
     .::::'.::::: ::: ::::.  '::::::.
     ::' .::' ::  '::  :: ':::.       ':::.
     :: .::'  ::   :'  '::  '::::::.    '::
     ::.::'  .::        ::  ::'::'':::::;;'
      ':::   ::'        '::.:: '':::.'::;'
       '::. .::          ::::.   '::;'
        ':::::'          ':::::::;'
`

const transformed = Printer.default.fromString(img);


console.log(transformed)










```
[更多ASCII 图标点击这里](https://tool.lu/asciipainting/index.html?q=Skulls%20and%20so%20on%3AGuns&type=0&page=1)<br />

