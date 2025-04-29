const express =require('express');
const router=express.Router();
const twilioController=require('../controllers/twilioController');
console.log("at twillio Routes");
router.get('/message',twilioController.createMessage);
router.post('/status-callback', twilioController.handleStatusCallback);


module.exports=router;