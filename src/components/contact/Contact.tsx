import data from "../../../public/assets/data.json";
import "./contact.css";
import { useEffect, useState } from "react";
import {isUserWithinRadius} from "../location/Location";

export const Contact = () => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const filteredLocations = await Promise.all(
          data.map(async (locationData) => {
            const isWithin = await isUserWithinRadius(locationData.geoLocation);
            if (isWithin) {
              return locationData; 
            }
            return null;
          })
        );

        
        setFilteredData(filteredLocations.filter((item) => item !== null));
      } catch (err) {
        setError("Error fetching location data.");
        console.error(err);
      }
    };

    fetchLocationData();
  }, []);

  return (
    <section id="portfolio">
      <h3>Sehri Distribution Near You</h3>
      <h2>Locations</h2>
      <div className="container portfolio__container">
        {error && <p className="error">{error}</p>}

        {filteredData.length > 0 ? (
          filteredData.map(({ id, name, description, image, location, source }, i) => (
            <article key={id} className="portfolio__item">
              <div className="portfolio__item-image">
                <img src={`/assets/${image}`} alt={name} key={i} id="card__image" />
              </div>
              <h3>{name}</h3>
              <h5>{description}</h5>
              <div className="portfolio__item-buttons">
                <a
                  href={location}
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
          ))
        ) : (
          <p>No locations found within your radius.</p>
        )}
      </div>
    </section>
  );
};
