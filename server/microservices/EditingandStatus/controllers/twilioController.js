const twilio = require('twilio');
const client = twilio('AC8e39dfd04e154ae0512fffa5ef0bff3d', '0f366bc8cd5dd52f6985b4f202e97726');

exports.createMessage = async function (req, res) {
  try {
    // const { to, body } = req.body;
   console.log("her1")
    const message = await client.messages.create({
      body: 'Hello from Twilio!',
      from: '+13203993463',
      to: '+919621572155',
      statusCallback:'https://91c8-2401-4900-8845-8b2c-14d6-a2f5-202c-a40f.ngrok-free.app/twillio/status-callback'
    });

    console.log('✅ Message SID:', message.sid);
    console.log('📦 Status:', message.status);

    res.json({
      sid: message.sid,
      status: message.status,
      to: message.to,
      body: message.body
    });

  } catch (err) {
    console.error('❌ Error sending message:', err);
    res.status(500).json({ error: 'Failed to send message', details: err.message });
  }
};
exports.handleStatusCallback = async function (req, res) {
  console.log(req.body)
  const { sid, MessageStatus } = req.body;

  const statusMap = {
    queued: 2,
    sending: 2,
    sent: 3,
    delivered: 4,
    failed: 5,
    undelivered: 5,
  };

  const statusId = statusMap[MessageStatus] || 1; // fallback to Scheduled
  console.log(MessageStatus,"status of messaage");

  };
  
