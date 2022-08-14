import NotesContext from "../context/Context";
import "../App.css";
const SearchBar = () => {
  return (
    <NotesContext.Consumer>
      {(context) => (
        <input class="search-bar-input"
          value={context.text}
          onInput={(e) => context.setText(e.target.value)}
          type="text"
          placeholder="Search notes"
        />
      )}
    </NotesContext.Consumer>
  );
};
export default SearchBar;
