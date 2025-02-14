import data from "../../../public/assets/data.json";
import "./contact.css";
import { useEffect, useState } from "react";

import { isUserWithinRadius, getGeolocation } from "../location/Location";
import Dropdown from "../dropdown/Dropdown";
import { Data } from "./data.type";

export const Contact = () => {
  const [radius, setRadius] = useState(2);
  const [filteredData, setFilteredData] = useState<[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [locationFetched, setLocationFetched] = useState<boolean>(false);
  const onChange = (value: string) => {
    // INFO : Pesky logic to parse int value
    // from dropdown labels
    setRadius(parseInt(value.split("")[0]));
    console.log(value); // TODO : Set this value as radius
  };
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const { latitude, longitude } = await getGeolocation();

        const filteredLocations = await Promise.all(
          data.map(async (locationData) => {
            const isWithin = isUserWithinRadius(
              locationData.geoLocation,
              latitude,
              longitude,
              radius
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
        // INFO : Settings all data as filteredData to
        // display all distribution points if user location is not fetched
        setFilteredData(data);
        setError(
          "Error fetching location data. Showing all available locations."
        );
        console.error(err);
      }
    };

    if (navigator.geolocation) {
      fetchLocationData();
    } else {
      setError("Geolocation is not supported by your browser. Showing all available locations.");
    }
  }, [radius]);

  return (
    <section id="portfolio">
      <h3>Sehri Distribution Near You</h3>
      <h2>Locations</h2>
      {
        error &&
        <div className="container error">
          <h3>{error}</h3>
        </div>
      }
      {
        // INFO : Radius dropdown will not make sense
        // if user location is not known, thus hiding if error
        !error &&
        <div className="container">
          <h4>Select maximum distance</h4>
          <Dropdown options={['2 Km', '5 Km', '7 Km']} onChange={onChange} />
        </div>
      }
      <div className="container portfolio__container">
        {filteredData.length > 0
          ? filteredData.map(
            (
              { id, name, description, image, location, source }: Data, i: number) => (
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
            <div className="portfolio__item">
              {locationFetched
                ? "No locations found within your radius."
                : "Fetching Location please wait...."}
            </div>
          )}
      </div>
    </section >
  );
};
