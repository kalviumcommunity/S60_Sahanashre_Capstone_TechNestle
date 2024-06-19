const RequestModel = require("../Model/RequestDetails");

const OutgoingRequest = async (req, res) => {
    const { profilename } = req.params;
    try {
        const data = await RequestModel.find({ from: profilename });
        return res.status(200).json(data);
    }
    catch (error) {
        console.error('Error in OutgoingRequest:', error.message);
        return res.status(500).json({ message: "Error in finding OutgoingRequest" });
    }
};

module.exports = OutgoingRequest;
