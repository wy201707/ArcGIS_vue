var express = require('express');
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块

var router = express.Router();


router.get('/getAll', async (req, res)=> {

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
    console.log(req.query)
	/**
     * 前端可以直接访问，为什么要用后端！！！！后端负责自动生成json文件（目前是用matlab实现数据转换的，好家伙
     * 真·前后端分离·系统），或许数据处理就用matlab，但是后端在处理切片的时候可以发挥作用
     */
   /*  //读取json文件
    // file='D:\\code\\GIS\\js-api\\vue-jspapi\\dataProcess\\JSONData\\ResData2021-09-12-00-10.json'
    //var file = path.join(__dirname, 'data/test.json'); //文件路径，__dirname为当前运行js文件的目录
    file=path.join(__dirname,'./../data/JSONData2/2021-09-12/'+req.query.jsonName+'.json');
    // console.log(file)
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send({
                state:'error',
                msg:'文件读取失败'
            });
        } else {
            // console.log(data)
            // geoJSONData={
            //     "type": "FeatureCollection",
            //     "features": data
            // }
            res.send({
                state:'success',
                JSONData:data
                // JSONData:geoJSONData
            });
        }
    }); */
    axios
    .get('http://localhost:3001/mapdata/get', {
        params: {
            jsonName: 'ResData2021-09-12-00-10',
            // jsonName: 'test01',
        },
    })
    .then(function (response) {
        console.log('response.data', response.data.JSONData);

        if (response.data.state === 'success') {
            _self.$message({
                message: '读取json成功',
                type: 'success',
            });
            const blob = new Blob([JSON.stringify(response.data.JSONData)], {
                type: 'application/json',
            });

            // URL reference to the blob
            const url = URL.createObjectURL(blob);
            const geojsonLayer = new GeoJSONLayer({ url: url });
            view.map.add(geojsonLayer);
            geojsonLayer.on('update-end', function (e) {
                view.map.setExtent(e.target.extent.expand(1.2));
            });
        } else {
            console.log(response.data.msg);
        }
    })
    .catch(function (error) {
        console.log(error);
        _self.$message({
            message: '读取json失败',
            type: 'warning',
        });
        csl;
    });
       /*
    file='http://localhost:80/vuegis/static/data/ResData2021-09-12-00-10.json'
    try{
        $.ajax({
            url:file,
        // url: './../../dataProcess/JSONData/ResData2021-09-01-00-10.json',
        // url:'http://localhost:80/vuegis/static/data/'+req.query.jsonName+'.json',
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                        geoJSONData={
                            "type": "FeatureCollection",
                            "features": result
                        }
                        res.send({
                            state:'success',
                            JSONData:geoJSONData
                        });
                },
        });
    }catch(error){
        console.log('后台success,data',result)
        res.send({
            status:'fail',
            msg:'query fail'
        })
        console.log(err.message)
    } */
     
   
});


router.post('/insert',function(req,res){
    console.log(req.body)
    var name=req.body.name
    var psd=req.body.psd
    var phone=req.body.phone
    var email=req.body.email

    sql=`insert into user (name,password,phone,email) values ("${name}","${psd}","${phone}","${email}")`
    console.log(sql)
    //!完善：
    //1.之后还要检查号码和email数据
    //2.主键是什么禁止重复---phone
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