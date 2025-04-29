const express=require('express');
const router=express.Router();
const messageController=require('../controllers/messageControllers');
console.log("fetching messages at message route")
router.get('/messages',messageController.getMessage);
module.exports=router;