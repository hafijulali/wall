import data from "../../../public/assets/data.json";
import "./contact.css";

export const Contact = () => {
  return (
    <section id="portfolio">
      <h3>Sehri Distribution Near You</h3>
      <h2>Locations</h2>
      <div className="container portfolio__container">
        {Array.from(data).map(
          ({ id, name, description, image, demo, source }, i) => {
            return (
              <article key={id} className="portfolio__item">
                <div className="portfolio__item-image">
                  <img src={`/assets/${image}`} alt={name} key={i} id="card__image" />
                </div>
                <h3>{name}</h3>
                <h5>{description}</h5>
                <div className="portfolio__item-buttons">

                  <a
                    href={demo}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Location
                  </a>

                  <a
                    href={source}
                    className="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact
                  </a>
                </div>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
};

