const CommentSchema = require("../Model/Feedback")

const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedComment = await CommentSchema.findByIdAndDelete(id);
            res.status(200).send("Deleted comment successfully");
    } 
    catch (err) {
        res.status(500).send("Error in deleting comment");
    }
};

module.exports = deleteComment;