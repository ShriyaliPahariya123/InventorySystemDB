var express = require('express');
var router = express.Router();
var pool=require('./pool')


router.post('/checkadminlogin',function(req,res,next){
    console.log(req.body)
    pool.query('select *  from admin where adminId=? and adminPassword=?',[req.body.adminId,req.body.adminPassword],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
          if(result.length==0)
        return res.status(200).json({RESULT:false})
        else
        return res.status(200).json({RESULT:result})
        
      }
    })
  })

  router.post('/counttrainer',function(req,res,next){
    console.log(req.body)
    pool.query('select *  from trainer',function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:result.length});
        
      }
    })
  })
  router.post('/countproduct',function(req,res,next){
    console.log(req.body)
    pool.query('select *  from product',function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:result.length});
        
      }
    })
  })

  router.post('/notification',function(req,res,next){
    console.log(req.body)
    pool.query('select *  from fileupload where verify="NOT"',[req.body.verify],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:result.length});
        
      }
    })
  })


  router.post('/message',function(req,res,next){
    console.log(req.body)
    pool.query('select *  from contactus where verify="NOT"',[req.body.verify],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:result.length});
        
      }
    })
  })

  module.exports = router;
  