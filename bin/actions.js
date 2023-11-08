const templates = require("./template");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const ora = require("ora");
const download = require("download-git-repo");

async function initExtension(name) {
  const templateValue = templates.find((item) => item.name === name);
  const templateObj = templateValue ? templateValue.value : undefined;
  // 如果查找到直接下载
  if (templateObj) {
    console.log("开始执行下载啦");
    judgeFile(name, templateObj);
  } else {
    console.log("模板查找失败！");
  }
}

// 判断文件夹是否存在于目录中
async function judgeFile(templateName, downloadUrl) {
  const pathUrl = path.join(process.cwd(), templateName);
  const result = fs.existsSync(pathUrl);
  if (result) {
    // 如果已经存在是否覆盖,如果覆盖移除目录，如果不覆盖退出程序
    const { choice } = await inquirer.prompt({
      type: "confirm",
      name: "choice",
      message: "目录已存在该通用模块，是否覆盖？",
    });
    if (choice) {
      fs.rm(pathUrl, { recursive: true }, (err) => {
        err ? console.log("目录覆盖失败", err) : "";
      });
    } else {
      process.exit(1);
    }
  }
  await downTemplate(downloadUrl, pathUrl);
}

async function downTemplate(url, pathUrl) {
  const loading = ora("开始下载通用模板...");
  loading.start();
  download(url, pathUrl, (err) => {
    if (err) {
      loading.fail("创建通用模块失败！", err);
    } else {
      loading.succeed("创建通用模块成功!");
    }
  });
}

module.exports = {
  initExtension,
};
