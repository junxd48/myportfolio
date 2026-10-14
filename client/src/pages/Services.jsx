/*************************************************/
/* This page contains the list of offered        */
/* Services which are stored in a constant array */
/*************************************************/

const services = [
  {
    title: "Web Development",
    description:
      "Development of responsive and user-friendly web applications using modern front-end technologies and structured development practices.",
  },
  {
    title: "Software Development",
    description:
      "Design and development of software solutions with an emphasis on maintainability, problem solving, and practical business requirements.",
  },
  {
    title: "IT Systems & Technical Support",
    description:
      "Technical analysis, troubleshooting, systems support, and issue resolution for IT infrastructure and business applications.",
  },
  {
    title: "Networking & Infrastructure",
    description:
      "Support and analysis of network infrastructure, including switches, routers, wireless technologies, connectivity, and enterprise IT environments.",
  },
  {
    title: "Systems & Application Analysis",
    description:
      "Analysis of business and technical requirements, application troubleshooting, process improvement, and documentation.",
  },
  {
    title: "Database & API Development",
    description:
      "Development and support of database-driven applications and REST APIs using appropriate programming and database technologies.",
  },
];

function Services() {
  return (
    <section className="services-page">
      <div className="page-header">
        <p className="section-label">WHAT I DO</p>

        <h1>Services</h1>

        <p>
          I provide technology-focused services drawing on experience in
          software development, systems analysis, networking, infrastructure,
          and technical support.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-icon">
              {service.title.charAt(0)}
            </div>

            <h2>{service.title}</h2>

            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// Exports so it can be imported and used by other files
export default Services;