import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RepositoryDetail from "../RepositoryDetailFollower/FollowerRepository"
// import "./Followers.css";

const Followers = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/followers`);
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
      <div className="followers-wrapper">
        {followers.map(follower => (
          <div className="follower-card" key={follower.id}>
            <img src={follower.avatar_url} alt={follower.login} />
            <Link to={`/${follower.login}`}>
              <h3>{follower.login}</h3>
              <RepositoryDetail detail={follower.login}/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;
