import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./detail.css";

const RepositoryDetail = () => {
  const { username, repoName } = useParams();
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        console.log(response.data);
        setRepository(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRepository();
  }, [username, repoName]);

  return (
    <div className="main-container">
      <Link to="/" >
        Go to Home
      </Link>
      {repository && (
        <div className="repository-detail">
          <div>
            <img
              src={repository.avatar_url}
              alt={repository.name}
              className="repository-image"
            />
          </div>
          <div>
            <h2>{repository.name}</h2>
            <p>Location: {repository.location}</p>
            <p>Following: {repository.following}</p>
            <p>Followers: {repository.followers}</p>
            <p>
              Created At: {new Date(repository.created_at).toLocaleDateString()}
            </p>
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositoryDetail;
