import { useState, useEffect } from 'react';
import axios from 'axios';
import getCookie from "../Utils/GetCookie";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import { BACKEND_SERVER } from '../Utils/constants';

const IncomingRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${BACKEND_SERVER}/users/${getCookie("username")}/incoming-requests`, {
          headers: {
            Authorization: `Bearer ${getCookie('access_token')}`,
          },
        });
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        if(error.response.status==401 || error.response.status==403){
          navigate("/login")
        }
        console.error('Error fetching incoming requests:', error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApproval = async (requestId, status) => {
    try {
      await axios.put(`${BACKEND_SERVER}/requests/${requestId}`, { status }, {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
        },
      });
      setRequests(prevRequests => prevRequests.map(request =>
        request._id === requestId ? { ...request, status } : request
      ));
    } catch (error) {
      if(error.response.status==401 || error.response.status==403){
        navigate("/login")
      }
      console.error('Error updating request status:', error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <Navbar />
    <div className="container mx-auto p-12 mt-20">
      <h1 className="text-xl font-bold mb-4">Incoming Requests</h1>
      <ul className="grid grid-cols-2 gap-4">
        {requests.map(request => (
          <li key={request._id} className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-medium">From: {request.from}</p>
            <p className="text-base text-gray-700">Mail Body: {request.mailBody}</p>
            <p className="text-base text-gray-700 flex items-center">
              Status: 
              <span className={`inline-block px-3 py-1 rounded-full text-base ml-2 mt-2 mb-2 ${request.status === 'approved' ? 'bg-green-800 text-white' : request.status === 'rejected' ? 'bg-red-500 text-white' : request.status === 'pending' ? 'bg-red-500 text-white' : ''} font-semibold`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </p>
            {request.status === 'pending' && (
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleApproval(request._id, 'approved')}
                  className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900 text-base"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(request._id, 'rejected')}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-base"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default IncomingRequestsPage;
