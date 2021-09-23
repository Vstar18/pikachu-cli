#!/usr/bin/env node
const figlet = require('figlet');
const Printer = require('@darkobits/lolcatjs');
const versionStr = figlet.textSync('Yeah Pikachu!')
const transformed = Printer.fromString(versionStr)
const shell = require("shelljs");
const inquirer = require('inquirer');
console.log(transformed);
const { program } = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const fs = require('fs');
const { writeJson } = require('./utils');
const { templateUrl, componentsTemplateUrl } = require('./config');


program.option('-c, --create<type>', '','');

const dictionary = {
    create(env) {
        inquirer
        .prompt([
            {
                type:'text',
                message:'请输入组件名称,示例pi-map',
                name:'componentName'
            },
            {
                type:'list',
                message:'请选择组件所属级别,示例：轻量级组件',
                name:'componentLevel',
                choices: [
                    { name: '基础组件',value: 'pages/componentsA'},
                    { name: '轻量级组件', value: 'pages/componentsB'},
                    { name: '重量级组件', value: 'pages/componentsC' },
                ]
            },
            {
                type:'text',
                message:'请输入组件页面标题名称,示例:地图',
                name:'componentBarTitle'
            },
            {
                type:'text',
                message:'请输入组件库演示用组件名称,示例:map',
                name:'componentExampleName'
            },
        ])
        .then(answers => {
            //创建pikachu目录下components下的组件文件
            const _pwd = shell.pwd().stdout;
            const projectPath = `${_pwd}/src/pikachu/components/${answers.componentName}`;
            const filename = `${projectPath}/index.vue`;
            const componentsName = `${projectPath}/${answers.componentName}.vue`;
            shell.rm('-rf',projectPath);
            shell.mkdir(projectPath);
            const template = `direct:${templateUrl}`;
            download(template,projectPath,{clone:true},function (err) {
                if(err) {
                    // console.log(`${chalk.red('服务器出错了，下载失败！')}`)
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
            writeJson(`${_pwd}/src/pages.json`,answers.componentLevel,'subPackages',{
                "path": `${answers.componentName}/index`,
                "style": {
                    "navigationBarTitleText": `${answers.componentBarTitle}`
                }
            })
            //创建pages目录下的componentsA/B/C对应重量级的文件
            const componentsPath = `${_pwd}/src/${answers.componentLevel}/${answers.componentExampleName}`;
            shell.rm('-rf',componentsPath);
            shell.mkdir(componentsPath);
            const componentsTemplate = `direct:${componentsTemplateUrl}`;
            download(componentsTemplate,componentsPath,{clone:true},function (err) {
                if(err) {
                    // console.log(`${chalk.red('服务器出错了，下载失败！')}`)
                }else{

                }
            })
            //修改pages目录下的example下的components.json
            writeJson(`${_pwd}/src/pages/example/components.json`,answers.componentLevel,'list',{
                "path": `/${answers.componentLevel}/${answers.componentExampleName}/index`,
                "title": `${answers.componentBarTitle}`
            })
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

