# Polyhedra Network 文档

## 技术框架

项目由 [Docusaurus](https://docusaurus.io/) 驱动，这是一个方便快捷的基于 `Node` 的框架。

`docs` 文件夹是项目的主体部分，层级关系代表了目录关系。其中，`_category_.json` 文件标注顺序和显示名称，否则会按照字典序默认（也可以在 `***.md` 文件内部实现）；`index.md` 文件是该目录本身的文档，没有该文件则默认目录文档不存在；其余 `***.md` 文件为每一篇文档的内容。

`docusaurus.config.ts` 文件里包含了首页的信息，如标题、按钮等等。

其余文件参照 `typescript` 项目即可，没有显著区别。

## 本地部署

对于不了解的步骤可以一律询问 `ChatGPT`。

1. 注册 `github` 账号，并确保你有权限浏览这个项目。

2. 在本地安装 `git`，具体教程根据不同操作系统有区别。如果在命令行里输入 `git` 出现了各种命令的说明，则安装成功。

3. 使用 `git clone https://github.com/PolyhedraZK/PolyhedraDocs` 把项目拉到本地，这个过程会需要你输入 `github` 的账号密码。如果不允许使用非 `ssh` 的方式拉取项目，则你需要在本地配置 `ssh key`，将公钥导出并存在 `github` 账号里，再用 `git clone git@github.com:PolyhedraZK/PolyhedraDocs.git` 把项目拉到本地，此时你就不再需要输入账号密码了。如果你需要对多个账号使用 `ssh` 拉取项目，可以考虑给每一个 `ssh key` 取一个别名，比如用下面的指令 `git clone git@github.com-myaccount1:PolyhedraZK/PolyhedraDocs.git`。

4. 在本地安装 `node`, `npm`, `yarn` 三个工具，尽量要较新的版本。推荐使用 `nvm` 工具安装，对于管理 `node` 版本非常好用。安装教程也取决于操作系统，安装成功后，可在命令行里分别输入这些词检测命令是否能够识别。

5. 进入项目文件夹，此时跟 `README.md` 文件同目录。第一次运行前（以及每次增加了新的第三方库，但在本项目中应该很少发生）需要输入 `yarn install` 安装所需的所有库，然后只需要输入 `yarn start` 即可启动服务。稍作等待，系统会自动打开浏览器进入该页面，之后就能自行浏览。

## 如何修改

1. 通过 `git`：在拉取项目之后，用 `git branch <branch-name>` 创建自己的分支，然后进行增删改查，通过 `git add <file-name>` 添加需要更新的文件或文件夹，再 `git commit -m "commit reason"` 和 `git push` 提交。此时可以在 `github` 上看到自己分支的更新记录，然后提一个 `pull request` 到主分支（或其他正在运行的分支，根据你的需要），等待合并。

2. 不通过 `git`：在 `github` 上直接创建自己的分支，然后在线编辑文件，或者上传本地文件，提交。之后仍然是提一个 `pull request` 到主分支（或其他正在运行的分支，根据你的需要），等待合并。

但无论哪种，最好都要在本地运行一下保证不会报错。

另外，提交前，最好用 `yarn prettier --write ./` 这个指令美化一下代码，保证风格统一。