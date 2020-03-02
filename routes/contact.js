var express = require('express');
var router = express.Router();
var pool = require('./pool')


router.post('/addnewrecord',function(req,res,next){
    console.log(req.body)
    
    pool.query('insert into contactus(trainerName,email,mobileNumber,feedback,verify) values(?,?,?,?,?)',[req.body.trainerName,req.body.email,req.body.mobileNumber,req.body.feedback,'NOT'],function(error,result){
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
    pool.query('select * from contactus',function(error,result){
        if(error){
            console.log(error)
            return res.status(500).json([])
        }
        else{
            return res.status(200).json(result)
        }
    })
});



router.post('/deleteRecord',function(req,res,next){
   console.log(req.body)
   pool.query('delete from contactus where feedbackId=?',[req.body.feedbackId],function(error,result){
       if(error){
           console.log(error)
           return res.status(500).json({RESULT:false})
       }
       else{
           return res.status(200).json({RESULT:true})
       }
   })
});

router.post('/editData',function(req,res,next){
    console.log(req.body)
    console.log(req.file)
    pool.query("update contactus set verify='VERIFY' where feedbackId=?",[req.body.feedbackId],function(error,result){
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

router.post('/noti',function(req,res,next){
    console.log(req.body)
    pool.query("select * from contactus where feedbackId=? AND verify=?",[req.body.feedbackId,'NOT'],function(error,result){
      if(error){
        console.log(error)
        console.log(result);
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:result});
        
      }
    })
  })
module.exports = router;