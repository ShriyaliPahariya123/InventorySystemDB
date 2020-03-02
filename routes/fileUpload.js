var express = require('express');
var router = express.Router();
var pool = require('./pool')
var fileUpload = require('./fileMulter')

router.post('/addnewrecord',fileUpload.any('fileUpload'),function(req,res,next){
    console.log(req.body)
    console.log(req.files)
  
    pool.query('insert into fileupload(trainerName,schoolName,currentDate,fileUpload,verify) values(?,?,?,?,?)',[req.body.trainerName,req.body.schoolName,req.body.currentDate,req.files[0].filename,'NOT'],function(error,result){
        if(error){
            console.log(error)
            
            return res.status(500).json({RESULT:false})
        }
        else{
            return res.status(200).json({RESULT:true})
        }
    })
});

router.get('/displayall',function(req,res,next){
    console.log(req.body)
    pool.query('select * from fileupload',function(error,result){
        if(error){
            console.log(error)
            return res.status(500).json([])
        }
        else{
            return res.status(200).json(result)
        }
    })
});






router.post('/messageseen',function(req,res,next){
    console.log(req.body)
    pool.query('select *  from contactus where verify="NOT"',[req.body.verify],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:result});
        
      }
    })
  })


  router.post('/editData',function(req,res,next){
    console.log(req.body)
    console.log(req.file)
    pool.query("update fileupload set verify='VERIFY' where userFileId=?",[req.body.userFileId],function(error,result){
        if(error)
        {   console.log(error)
            return res.status(500).json({RESULT:false})
        }
        else{
            console.log(result)
            console.log(result.affectedRows + " record(s) updated");
            return res.status(200).json({RESULT:true})
        }
    })
});



module.exports = router;