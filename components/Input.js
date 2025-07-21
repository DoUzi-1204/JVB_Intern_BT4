import { useEffect, useRef, useState } from "react";
import FindMeIcon from "./FindMeIcon";
import styles from "../styles/Input.module.css";

export default function Input({
  cityInfo,
  setSearch,
  setCityInfo,
  error,
  setError,
}) {
  const [input, setInput] = useState(cityInfo?.name || "");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    setInput(cityInfo?.name || "");
  }, [cityInfo?.name]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (value.length >= 2) {
        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${value}`
          );
          const data = await res.json();
          setSuggestions(data || []);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setSearch(input);
      setSuggestions([]);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setCityInfo((prev) => ({
          ...prev,
          coords: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          },
        }));
        setSuggestions([]);
      },
      () => {
        setError("Your location could not be determined");
      }
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    setInput(suggestion.name);
    setSuggestions([]);
    inputRef.current.blur();
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="textInput" className={styles.label}>
            Your city
          </label>
          <input
            ref={inputRef}
            type="text"
            id="textInput"
            value={input}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Search city..."
            className={styles.input}
          />
        </form>
        <button
          className={styles.button}
          onClick={handleClick}
          aria-label="Find my location"
        >
          <FindMeIcon width={24} height={24} />
        </button>
      </section>

      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((s) => (
            <li key={s.id} onClick={() => handleSuggestionClick(s)}>
              {s.name}, {s.country}
            </li>
          ))}
        </ul>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}
