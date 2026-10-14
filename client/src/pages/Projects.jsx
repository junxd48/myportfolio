/******************************************/
/* This page contains the Projects sample */
/* which are returned from MongoDB        */
/******************************************/

import { useEffect, useState } from "react";

function Projects() {
  // Store the projects returned by the Express API.
  const [projects, setProjects] = useState([]);

  // Track whether the API request is still running.
  const [loading, setLoading] = useState(true);

  // Store an error message if the request fails.
  const [error, setError] = useState("");

  // Fetch projects when the component first loads.
  useEffect(() => {
    // Abort the request if the component unmounts.
    const controller = new AbortController();

    async function fetchProjects() {
      try {
        // Request project records from the Express backend.
        const response = await fetch("/api/projects", {
          signal: controller.signal,
        });

        // Throw an error if the server returns an unsuccessful status.
        if (!response.ok) {
          throw new Error("Unable to retrieve projects.");
        }

        // Convert the JSON response into a JavaScript array.
        const data = await response.json();

        // Store the returned projects in React state.
        setProjects(data);
      } catch (err) {
        // Ignore requests cancelled when the component unmounts.
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        // Avoid updating state after cancellation.
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    // Cancel the request when the component unmounts.
    return () => controller.abort();
  }, []);

  return (
    <section className="projects-page">
      <div className="page-header">
        <p className="section-label">MY WORK</p>
        <h1>Projects</h1>
        <p>
          A selection of academic and professional projects demonstrating
          my experience with software development, systems analysis, and
          enterprise technology.
        </p>
      </div>

      {/* Display a message while waiting for the API response. */}
      {loading && <p>Loading projects...</p>}

      {/* Display an error if the API request fails. */}
      {error && <p role="alert">{error}</p>}

      {/* Display a message if the database contains no projects. */}
      {!loading && !error && projects.length === 0 && (
        <p>No projects available.</p>
      )}

      {/* Display projects returned by MongoDB. */}
      {!loading && !error && projects.length > 0 && (
        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project._id}>
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />

              <div className="project-content">
                <h2>{project.title}</h2>

                <p>{project.description}</p>

                <p>
                  <strong>Role:</strong> {project.role}
                </p>

                <p>
                  <strong>Outcome:</strong> {project.outcome}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;