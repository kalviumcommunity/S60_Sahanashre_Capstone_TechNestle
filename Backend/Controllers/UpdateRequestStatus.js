const RequestModel = require('../Model/RequestDetails');

const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await RequestModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    return res.status(200).json(request);
  } catch (error) {
    console.error('Error updating request status:', error.message);
    return res.status(500).json({ message: 'Error updating request status' });
  }
};

module.exports = updateRequestStatus;