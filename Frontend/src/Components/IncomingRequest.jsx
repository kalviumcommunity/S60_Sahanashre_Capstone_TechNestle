import { useState, useEffect } from 'react';
import axios from 'axios';
import getCookie from "../Utils/GetCookie";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import { BACKEND_SERVER } from '../Utils/constants';
import { ColorRing } from 'react-loader-spinner'; 

const IncomingRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${BACKEND_SERVER}/users/${getCookie("username")}/incoming-requests`, {
          headers: {
            Authorization: `Bearer ${getCookie('access_token')}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          navigate("/login");
        }
        console.error('Error fetching incoming requests:', error);
      }
      finally{
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
      if (error.response.status === 401 || error.response.status === 403) {
        navigate("/login");
      }
      console.error('Error updating request status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-12 mt-20">
        <h1 className="text-xl font-bold mb-4">Incoming Requests</h1>
        {requests.length === 0 ? (
          <div className="flex text-lg justify-center items-center">
          <p>No incoming requests found...</p>
          </div>
        ) : (
        <ul className="grid grid-cols-2 gap-4">
          {requests.map(request => (
            <li key={request._id} className="border-2 border-white bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform hover:border-blue-800">
              <p className="text-lg font-medium">From: {request.from}</p>
              <p className="text-base text-gray-700">Request Details: {request.mailBody}</p>
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
        )}
      </div>
    </div>
  );
};

export default IncomingRequestsPage;
