import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import "./RepositoryDetail.css";

const RepositoryDetail = ({ person }) => {
  const { username, repoName } = useParams();
  const [repository, setRepository] = useState(null);

  console.log(person);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${username}/`);
        setRepository(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRepository();
  }, [username, repoName]);

  return (
    <div>
      {repository && (
        <div className="repository-detail">
          <h2>{repository.name}</h2>
          <p>{repository.description}</p>
          <p>Language: {repository.language}</p>
          <p>Stars: {repository.stargazers_count}</p>
          <p>Created At: {new Date(repository.created_at).toLocaleDateString()}</p>
          <a href={repository.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      )}
    </div>
  );
};

export default RepositoryDetail;


