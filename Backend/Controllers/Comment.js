const CommentSchema = require("../Model/Feedback");

const comment = async (req, res) => {
  try {
    const comment = new CommentSchema(req.body);
    const savedFeedback = await comment.save();
    res.status(201).send(savedFeedback);
  } catch (err) {
    res.status(500).send("Error in saving the comment");
  }
};

const findComment = async (req, res) => {
  const { username } = req.params;
  try {
    const comments = await CommentSchema.find({ commentedTo:username });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

module.exports = { comment, findComment };