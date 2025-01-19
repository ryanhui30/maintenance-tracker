"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const apiBaseUrl = "/api"; // Adjust this if needed.

export default function DatabasePage() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const usersResponse = await axios.get(`${apiBaseUrl}/users`);
      setUsers(usersResponse.data);
      setError(null); // Clear any existing error
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setError("Failed to load users. Please try again.");
    }
  };

  // Add user
  const addUser = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and Email cannot be empty.");
      return;
    }

    try {
      console.log("Adding user:", { name, email }); // Log input data for debugging

      const response = await axios.post(`${apiBaseUrl}/users`, { name, email });

      if (response.status === 200) {
        setName("");
        setEmail("");
        fetchUsers(); // Refresh user list
      } else {
        throw new Error(response.data?.error || "Failed to add user.");
      }
    } catch (err) {
      console.error("Error adding user:", err.message);
      setError("Error adding user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Table Layout */}
      <div className="space-y-4">
        {/* Table: User Information */}
        <div>
          <h2 className="text-lg font-semibold mb-2">User Information</h2>
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td className="border border-gray-300 p-2" colSpan={2}>
                    No users available
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="border border-gray-300 p-2">{user.name}</td>
                    <td className="border border-gray-300 p-2">{user.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add User Form */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Add User</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={addUser}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Add Entry
          </button>
        </div>
      </div>

      {/* Go Back Button */}
      <div className="mt-4">
        <a href="/" className="text-blue-500 underline">
          ← Go Back to Home
        </a>
      </div>
    </div>
  );
}
