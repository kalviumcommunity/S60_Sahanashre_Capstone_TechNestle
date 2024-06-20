const register = require('../Model/Register');
const RequestModel = require('../Model/RequestDetails');
const sendMail = require('../Utils/Mail');

const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const learningRequest = await RequestModel.findByIdAndUpdate(id, { status },{new:true});
    if (!learningRequest) {
      return res.status(404).json({ message: 'Learning request not found' });
    }
    
    const requester = await register.findOne({ username: learningRequest.from });
    if (!requester) {
      return res.status(404).json({ message: 'Requester not found' });
    }

    const receiver = await register.findOne({ username: learningRequest.to });
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    let subject;
    let text;

    if (status === 'approved') {
      subject = "Learning Request Accepted";
      text = `Your learning request to TechNestle has been accepted by ${receiver.username}. Kindly contact ${receiver.email} for further details.`;
    } else if (status === 'rejected') {
      subject = "Learning Request Rejected";
      text = `Your learning request to TechNeslte has been rejected by ${receiver.username}.`;
    } else {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await sendMail({
      from: "sahusasdi@gmail.com",
      to: requester.email,
      subject: subject,
      text: text
    });

    return res.status(200).json(learningRequest);
  } catch (error) {
    console.error('Error updating request status:', error.message);
    return res.status(500).json({ message: 'Error updating request status' });
  }
};

module.exports = updateRequestStatus;
