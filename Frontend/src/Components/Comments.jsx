import { useState, useEffect } from 'react';
import axios from 'axios';
import getCookie from "../Utils/GetCookie";
import { BACKEND_SERVER } from "../Utils/constants";

const Feedback = ({ username }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = getCookie("access_token");
  const loggedInUsername = getCookie("username");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${BACKEND_SERVER}/users/${username}/comment`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [username, token]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_SERVER}/users/${username}/comment`,
        { commenter: loggedInUsername, commentedTo: username, comment: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="mt-4 w-full">
      <h3 className="text-lg font-bold mb-2">Comments</h3>
      <ul className="mb-4">
        {comments.map((comment, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded-lg mb-2">
            {comment.comment}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="flex">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border rounded-lg p-2 flex-grow mr-2"
          placeholder="Add a comment"
        />
        <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Feedback;