var express = require('express');
var router = express.Router();
const query=require('../plugins/db')

router.get('/getAll', async (req, res)=> {
    sql=`select * from user`
    query(sql,(err,result)=>{
        if(!err){
            res.send({
                status:'success',
                data:result
            })
        }else{
            res.send({
                status:'fail',
                msg:'query fail'
            })
            console.log(err.message)
        }
    }) 
   
});
router.get('/get', async (req, res)=> {
    // console.log(req.query)
    sql=`select * from user where name="${req.query.name}"`
    // console.log(sql)
    query(sql,(err,result)=>{
        if(!err){
            console.log(result)
            res.send({
                status:'success',
                data:result
            })
            // console.log(result)
            //mysql返回的是jasn格式数据？
            //反正就是数据展开，不用使用console.log(JSON.parse(JSON.stringify(result))){这个语句可以使输出窗口的对象：[objext]->具体信息}
        }else{
            res.send({
                status:'fail',
                msg:'query fail'
            })
            console.log(err.message)
        }
    }) 
   
});

// http://localhost:3001/

router.post('/insert',function(req,res){
    console.log(req.params.body)
    sql=`insert into user (name,password,phone,email) values ("wytest","wytest","11","email@com")`
    //!完善：
    //1.之后还要检查号码和email数据
    //2.主键是什么禁止重复
    query(sql,(err,result)=>{
        if(!err){
            res.send({
                status:'success',
                data:sql
            })
        }else{
            res.send({
                status:'fail',
                msg:'insert fail'
            })
            console.log(err.message)
        }
    })

})
 
module.exports = router;