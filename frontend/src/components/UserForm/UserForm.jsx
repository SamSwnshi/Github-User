import axios from "axios";
import { useState, useEffect } from "react";
import RepositoryList from "../RepositoryList/RepositoryList";
import "./UserForm.css";
import { Link } from "react-router-dom";
import Followers from "../Followers/Followers";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers,serFollowers] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data if username is set and not already fetched
        if (username && (!userData || userData.login !== username)) {
          const userResponse = await axios.get(`https://api.github.com/users/${username}`);
          console.log(userResponse.data)
          setUserData(userResponse.data);
        }

        // Fetch repositories if username is set and repositories are not already fetched
        if (username && repositories.length === 0) {
          const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
          setRepositories(reposResponse.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [username]); // Fetch data when username changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handleSubmit can be left empty for best practices 
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <input
          type="text"
          placeholder="Enter GitHub UserName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button">
          Search
        </button>
      </form>
      {userData && (
        <div>
          <div className="user-wrapper">
            <div>
              <img
                src={userData.avatar_url}
                alt={userData.name}
                className="user-image"
              />
              <h3>{userData.type}</h3>
            </div>
            <div>
              <h2>{userData.name}</h2>
              <h3>Location: {userData.location}</h3>
              <h4>Bio: {userData.bio}</h4>
              <p>Followers: {userData.followers}</p>
              <Link to={`/followers/${username}`}>
              View Followers</Link>
            </div>
          </div>
          <h2>Repositories</h2>
          <RepositoryList repositories={repositories} username={username} />
        </div>
      )}
    </div>
  );
};

export default UserForm;
