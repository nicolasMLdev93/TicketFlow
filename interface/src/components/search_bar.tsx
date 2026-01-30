import '../styles/search_bar.css'
import SearchIcon from '@mui/icons-material/Search';

export default function Search_bar() {
  return (
    <div className='search-bar-container'>
      <div className='search-bar'>
        <SearchIcon className='search-icon' />
        <input 
          type="text" 
          className='search-input' 
          placeholder='Buscar eventos, artistas ...'
        />
      </div>
    </div>
  )
}