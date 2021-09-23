const fs = require('fs');
/**
 * 在指定的json文件中，修改某一个targetObj 文件中的对象键名的数组键值，增加一项
 * @param {*} fileName 要修改的文件路径
 * @param {*} target 目标
 * @param {*} targetObj 文件中的对象键名
 * @param {*} params 要增加的对象
 */
const writeJson = (fileName,target,targetObj,params)=> {

    fs.readFile(fileName,function(err,data){
        if(err){
            return console.error(err);
        }
        let person = data.toString();
        person = JSON.parse(person);
        let targetData = person[targetObj];
        for(let key of targetData) {
            if(key.root == target) {
                key.pages.push(params)
            }
        }
        var str = JSON.stringify(person);
        fs.writeFile(fileName,str,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
    })
}

module.exports = {
    writeJson
}
