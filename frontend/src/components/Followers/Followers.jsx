import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Followers.css"

const Followers = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `/api/users/${username}/followers`
        );
        console.log(response.data)
        setFollowers(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div>
      <h2>{username} Followers</h2>
      <div className="follow-wrapper">
        {followers.map((follower) => (
          <div className="follow-card" key={follower.id}>
            <img src={follower.avatar_url} alt={follower.login} />
            <Link to={`/follower/${follower.login}`}>
              <h3>{follower.login}</h3>
            </Link>
          </div>
        ))}
        
        <Link to="/" className="btn">
            Go to Home
          </Link>
      </div>
    </div>
  );
};

export default Followers;
