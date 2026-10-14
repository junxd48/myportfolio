/**************************************************/
/* This page contains the Professional biography, */
/* profile image, and résumé link.                */
/**************************************************/

// function represents the content displayed on the About page
function About() {
  return (
    // Main section. The classes are used to apply the styles from CSS.
    <section className="about-page">
      <div className="about-container">

        <div className="profile-section">
          <img
            src="/images/profile.jpg"
            alt="Professional profile"
            className="profile-image"
          />
        </div>

        <div className="about-content">
          <p className="section-label">ABOUT ME</p>

          <h1>IT & Software Professional</h1>

          <p>
            I am a IT Systems Analyst with extensive experience
            supporting Retails technology environments, infrastructure,
            networking, payment systems, and software applications.
          </p>

          <p>
            My professional background includes systems support, network
            technologies, application troubleshooting, database technologies,
            and software development. I enjoy solving technical problems and
            finding practical technology solutions that improve reliability,
            efficiency, and the user experience.
          </p>

          <p>
            I am also continuing to expand my knowledge in modern software
            development, cloud technologies, networking, and cybersecurity.
          </p>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button"
          >
            View My Résumé
          </a>
        </div>

      </div>
    </section>
  );
}

// Exports so it can be imported and used by other files
export default About;