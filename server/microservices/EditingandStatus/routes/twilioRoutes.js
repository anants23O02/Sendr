const express =require('express');
const router=express.Router();
const twilioController=require('../controllers/twilioController');
console.log("at twillio Routes");
router.get('/twilio',twilioController.sendMessage);

module.exports=router;