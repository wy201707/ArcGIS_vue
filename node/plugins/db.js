const mysql=require('mysql')
var pool = mysql.createPool({    
    host:      "localhost",  
    user:      "root",   
    password:  "123456",    
    database:  "webgis" ,   
    port:      3306  ,
    connectionLimit: 60,
});

var query=function(sql,callback){    
    pool.getConnection(function(err,conn){    
        if(err){    
            console.log('DB-获取数据库连接异常！');
            callback(err,null,null);    
        }else{    
            conn.query(sql,function(qerr,vals,fields){  
                if(qerr){
                    console.log("更新失败",qerr);
                }else{
                    //释放连接    
                    conn.release();    
                    //事件驱动回调    
                    callback(null,vals,fields);  
                }  
                    
            });    
        }    
    });    
};

module.exports=query;  