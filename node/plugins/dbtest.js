const mysql=require('mysql')
var pool = mysql.createPool({    
    host:      "localhost",  
    user:      "root",   
    password:  "123456",    
    database:  "webgis" ,   
    port:      3306  ,
    connectionLimit: 60,
});

module.exports=function (sql) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err,conn){
            if(err){
                reject(err);
            }else{
                conn.query(sql,function(err,rows,fields){
                    //释放连接
                    conn.release();
                    //传递Promise回调对象
                    resolve({"err":err,
                            "rows":rows,
                            "fields":fields});
                });
            }
        });
    });
};