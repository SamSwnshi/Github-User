import "./RepositoryList.css";

const RepositoryList = ({ repositories, username }) => {
  return (
    <div className="repository-wrapper">
      <div className="card-container">
        {repositories && Array.isArray(repositories) && repositories.map(repo => (
          <div className="card" key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <div className="card-header">
                <h3>{repo.name}</h3>
              </div>
            </a>
            <div className="card-body">
              <p>Description: {repo.description}</p>
              <p>Language: {repo.language}</p>
              <p>Stars: {repo.stargazers_count}</p>
              <p>Created At: {new Date(repo.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryList;
