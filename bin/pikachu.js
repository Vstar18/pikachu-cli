#!/usr/bin/env node
const figlet = require('figlet');
const Printer = require('@darkobits/lolcatjs');
const versionStr = figlet.textSync('Hello Pikachu!')
const transformed = Printer.fromString(versionStr)
const shell = require("shelljs");
const inquirer = require('inquirer');
console.log(transformed);
const { program } = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const fs = require('fs');
const {
	writeJson
} = require('./util');

program.option('-c, --create<type>', '','');

const dictionary = {
    create(env) {
        inquirer
        .prompt([
        {
            type:'text',
            message:'请输入组件名称,示例pi-map',
            name:'componentName'
        }
        ])
        .then(answers => {
            //创建pikachu目录下components下的组件文件
            const _pwd = shell.pwd().stdout;
            const projectPath = `${_pwd}/src/pikachu/components/${answers.componentName}`;
            const filename = `${projectPath}/template.vue`;
            const componentsName = `${projectPath}/${answers.componentName}.vue`;
            shell.rm('-rf',projectPath);
            shell.mkdir(projectPath);
            const template = 'direct:git@github.com:Vstar18/pikachu-template.git';
            download(template,projectPath,{clone:true},function (err) {
                console.log(err,'err🍎')
                if(err) {
                    console.log(`${chalk.red('服务器出错了，下载失败！')}`)
                }else{
                    // fs.rename(finallName, componentsName, function(err) {
                    //     if (!err) {
                    //         console.log(filename + '替换成功');
                    //     }
                    // })
                }
                fs.rename(filename, componentsName, function(err) {
                    if (!err) {
                        console.log(filename + '创建成功');
                    }
                })
            })
            //修改pages.json文件
            let newJsonData = {
                
            }
            writeJson(`${_pwd}/src/pages.json`)
            //创建pages目录下的componentsA/B/C对应重量级的文件
            //修改pages目录下的example下的componets.config.ts
        })
        .catch(error => {
            console.log(`${chalk.red(error)}`)
        });
    }
}

program
  .usage('[cmd]<options>')
  .arguments('<cmd>[env]')
  .action(function (cmd,env) {
    console.log(cmd,env)
    const handler = dictionary[cmd];
    if(handler) {
      handler(env);
    }else {
      console.log(`${chalk.blue(cmd)} 🍎 ${chalk.red('暂未支持')}`)
    }
  })
program.parse(process.argv);

