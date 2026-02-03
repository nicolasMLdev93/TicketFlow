import "../styles/search_bar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Search_bar() {
  const [params, setparams] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setparams(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ title: params });
    navigate(`event_results?title=${params}`);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <form onSubmit={handleSearch} action="" style={{display:'flex'}}>
          <button
            type="submit"
            aria-label="Buscar"
            style={{
              padding: "0px",
              margin: "0px",
               backgroundColor: 'transparent',
              outline: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <SearchIcon className="search-icon" sx={{ color: "grey" }} />
          </button>
          <input
            onChange={(e) => handleChange(e)}
            value={params}
            type="text"
            className="search-input"
            placeholder="Buscar eventos, artistas ..."
          />
        </form>
      </div>
    </div>
  );
}
