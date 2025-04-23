const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getMessage=async function main(req,res) {
    try{
      const messages = await prisma.message.findMany({
        where: {
          senderId: 1,  
        },
        include: {
         
        },
      });
     
      res.json(messages);
      console.log('📨 Messages:', messages[0].message);
    }
    catch(err){
      console.error("error fetching data",err);
      throw new Error("Error",err.message);
    }
  };

  

