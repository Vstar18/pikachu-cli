const fs = require('fs');

const writeJson = (fileName,target,params)=> {

    fs.readFile(fileName,function(err,data){
        if(err){
            return console.error(err);
        }
        let person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        console.log(person,'personjson对象🍎')
        let targetData = person.subPackages;
        for(let key of targetData) {
            if(key.root == target) {
                key.pages.push(params)//将传来的对象push进数组对象中
            }
        }
        var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile(fileName,str,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
    })
}

const writeJs = (fileName,target,params) => {
    fs.readFile(fileName,{ encoding:'utf-8'}, (err,data) => {
        if(err) {
            return console.error(err)
        }
        console.log(data,'datadata对象🍎🍎🍎🍎🍎')
        let person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        console.log(person,'personjson对象🍎🍎🍎🍎🍎')
        let targetData = person.list;
        for(let i of targetData) {
            if(key.value == target) {
                key.list.push(params)//将传来的对象push进数组对象中
            }
        }
        var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile(fileName,str,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
    })
}
module.exports = {
    writeJson,
    writeJs
}
