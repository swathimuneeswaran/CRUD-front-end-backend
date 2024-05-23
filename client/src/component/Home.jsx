import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getuser");
      setUsers(res.data.users);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const del = await axios.delete(
        `http://localhost:5000/api/deleteuser/${id}`
      );
      console.log(del);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, updatedName, updatedEmail) => {
    try {
      const update = await axios.put(
        `http://localhost:5000/api/updateuser/${id}`,
        {
          name: updatedName,
          email: updatedEmail,
        }
      );
      console.log(update);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      handleUpdate(editId, name, email);
      setEditId(null);
    } else {
      axios
        .post("http://localhost:5000/api/userpost", { name, email })
        .then((response) => {
          console.log(response);
          console.log("posted to server");
          fetchUser();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setName("");
    setEmail("");
  };

  const handleEditClick = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user._id);
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          {editId ? "Update" : "Submit"}
        </button>
      </div>

      <div className="container" style={{ marginTop: "100px" }}>
        <table >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
