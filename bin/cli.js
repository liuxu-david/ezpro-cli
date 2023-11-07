#!/usr/bin/env node
const PKG = require("../package.json");
const { program } = require("commander");
const actions = require("./actions");

// 读取版本号
program.option("-v, --version", "版本号").version(PKG.version);

// 通用模块init
program
  .command("init [templateName]")
  .description("nest拓展程序初始化")
  .action(actions.initExtension);

// 通用模块列表list

// 创建通用模块create

program.parse(process.argv);
