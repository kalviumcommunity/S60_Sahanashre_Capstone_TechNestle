const mongoose = require('mongoose');

const requestDetailsSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    statusUpdatedOn: {
        type: Date,
        default: Date.now
    },
    mailBody: {
        type: String,
        required: true
    }
});

const RequestDetail = mongoose.model('RequestDetail', requestDetailsSchema);

module.exports = RequestDetail;