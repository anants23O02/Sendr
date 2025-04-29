const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getMessage = async function (req, res) {
  try {
    const messages = await prisma.message.findMany({
      where: { senderId: 1 },
    });

    // Convert BigInt fields to strings
    const safeMessages = JSON.parse(
      JSON.stringify(messages, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );

    res.json(safeMessages); // ✅ Send safe JSON
    console.log(messages);
  } catch (err) {
    console.error("Error fetching data", err);
    res.status(500).json({ error: "Error fetching data" });
  }
};

  

