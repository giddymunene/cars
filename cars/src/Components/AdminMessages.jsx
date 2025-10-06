import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // 🚫 Redirect non-admins
  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const approveMessage = async (id) => {
    await API.put(`/messages/${id}/approve`);
    fetchMessages();
  };

  const rejectMessage = async (id) => {
    await API.put(`/messages/${id}/reject`);
    fetchMessages();
  };

  const deleteMessage = async (id, messageText) => {
    const confirmDelete = window.confirm(
      `⚠️ Are you sure you want to delete this message?\n\n"${messageText}"`
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/messages/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">📩 User Messages</h2>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg._id}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-start"
            >
              <div>
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <p className="text-sm text-gray-500">
                  Sent on {new Date(msg.createdAt).toLocaleString()}
                </p>
                <p className="mt-1">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      msg.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : msg.status === "rejected"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {msg.status}
                  </span>
                </p>
              </div>

              {/* Action buttons */}
              <div className="space-x-2">
                {msg.status === "pending" && (
                  <>
                    <button
                      onClick={() => approveMessage(msg._id)}
                      className="btn btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectMessage(msg._id)}
                      className="btn btn-danger"
                    >
                      Reject
                    </button>
                  </>
                )}
                {msg.status === "approved" && (
                  <button
                    onClick={() => deleteMessage(msg._id, msg.message)}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminMessages;