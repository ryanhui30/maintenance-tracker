"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const apiBaseUrl = "/api"; // Adjust this if needed.

export default function DatabasePage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState(null);

  // Fetch users and roles
  const fetchUsersAndRoles = async () => {
    try {
      const usersResponse = await axios.get(`${apiBaseUrl}/users`);
      const rolesResponse = await axios.get(`${apiBaseUrl}/roles`);
      setUsers(usersResponse.data);
      setRoles(rolesResponse.data);
    } catch (error) {
      console.error("Error fetching users and roles:", error.message);
      alert("Failed to load data. Please try again later.");
    }
  };

  // Add user
  const addUser = async () => {
    try {
      await axios.post(`${apiBaseUrl}/users`, { email, name });
      setEmail("");
      setName("");
      fetchUsersAndRoles(); // Refresh user list
    } catch (err) {
      console.error(err);
      setError("Error adding user.");
    }
  };

  // Add role
  const addRole = async () => {
    try {
      await axios.post(`${apiBaseUrl}/roles`, { name: roleName });
      setRoleName("");
      fetchUsersAndRoles(); // Refresh role list
    } catch (err) {
      console.error(err);
      setError("Error adding role.");
    }
  };

  // Assign role to user
  const assignRole = async () => {
    try {
      await axios.post(`${apiBaseUrl}/assign-role`, { role: selectedRole, userId: name });
      setSelectedRole("");
      setName("");
      fetchUsersAndRoles(); // Refresh users and roles
    } catch (err) {
      console.error(err);
      setError("Error assigning role.");
    }
  };

  useEffect(() => {
    fetchUsersAndRoles();
  }, []);

  const formFieldClass = "border p-2 rounded w-full mb-2";
  const buttonClass = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2 w-full";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User and Role Management</h1>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex space-x-12">
        {/* User Information Section */}
        <div className="space-y-4 w-1/2">
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
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={formFieldClass}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={formFieldClass}
            />
            <button onClick={addUser} className={buttonClass}>
              Add User
            </button>
          </div>
        </div>

        {/* Role Assignment Section */}
        <div className="space-y-4 w-1/2">
          <h2 className="text-lg font-semibold mb-2">Assign Role to User</h2>
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {roles.length === 0 ? (
                <tr>
                  <td className="border border-gray-300 p-2" colSpan={2}>
                    No roles available
                  </td>
                </tr>
              ) : (
                roles.map((role) => (
                  <tr key={role.id}>
                    <td className="border border-gray-300 p-2">{role.name}</td>
                    <td className="border border-gray-300 p-2">{role.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={formFieldClass}
            />
            <input
              type="text"
              placeholder="Role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className={formFieldClass}
            />
            <button onClick={assignRole} className={buttonClass}>
              Assign Role
            </button>
          </div>
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
