const RequestModel = require("../Model/RequestDetails");

const IncomingRequest = async (req, res) => {
    const { profilename } = req.params;
    try {
        const data = await RequestModel.find({ to: profilename });
        return res.status(200).json(data);
    }
    catch (error) {
        console.error('Error in IncomingRequest:', error.message);
        return res.status(500).json({ message: "Error in finding IncomingRequest" });
    }
};

module.exports = IncomingRequest;
