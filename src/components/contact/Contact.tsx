import data from "../../../public/assets/data.json";
import "./contact.css";
import { useEffect, useState } from "react";

import { isUserWithinRadius, getGeolocation } from "../location/Location";

export const Contact = () => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [locationFetched, setLocationFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const { latitude, longitude } = await getGeolocation();

        const filteredLocations = await Promise.all(
          data.map(async (locationData) => {
            const isWithin = await isUserWithinRadius(
              locationData.geoLocation,
              latitude,
              longitude
            );
            if (isWithin) {
              return locationData;
            }
            return null;
          })
        );
        setFilteredData(filteredLocations.filter((item) => item !== null));
        setLocationFetched(true);
      } catch (err) {
        setError(
          "Error fetching location data. Please make sure you have given permission for location access."
        );
        console.error(err);
      }
    };

    if (navigator.geolocation) {
      fetchLocationData();
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <section id="portfolio">
      <h3>Sehri Distribution Near You</h3>
      <h2>Locations</h2>
      <div className="container portfolio__container">
        {error && <p className="error">{error}</p>}

        {filteredData.length > 0
          ? filteredData.map(
              ({ id, name, description, image, location, source }, i) => (
                <article key={id} className="portfolio__item">
                  <div className="portfolio__item-image">
                    <img
                      src={`/assets/${image}`}
                      alt={name}
                      key={i}
                      id="card__image"
                    />
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
              )
            )
          : !error && (
              <p>
                {locationFetched
                  ? "No locations found within your radius."
                  : "Fetching Location please wait...."}
              </p>
            )}
      </div>
    </section>
  );
};
