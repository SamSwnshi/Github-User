import axios from "axios";
import { useState, useEffect } from "react";
import RepositoryList from "../RepositoryList/RepositoryList";
import "./UserForm.css";
import { Link } from "react-router-dom";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [fetching, setFetching] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data if username is set and not already fetched
        if (username && (!userData || userData.login !== username)) {
          const userResponse = await axios.get(`/api/users/${username}`);
          setUserData(userResponse.data);
        }

        // Fetch repositories if username is set and repositories are not already fetched
        if (username && repositories.length === 0 && !fetching) {
          setFetching(true); // Start fetching indicator

          // Delay fetching repositories 
          setTimeout(async () => {
            const reposResponse = await axios.get(`/api/users/${username}/repos`);
            setRepositories(reposResponse.data);
            setFetching(false); // Reset fetching indicator
          }, 10000); // Delay of 3 seconds (adjust as necessary)
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [username, userData, repositories.length, fetching]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/users/${username}/save`);
      const userResponse = await axios.get(`/api/users/${username}`);
      setUserData(userResponse.data);
    } catch (error) {
      console.log(error.message);
    }
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
                View Followers
              </Link>
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
