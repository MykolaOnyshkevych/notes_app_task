import NotesContext from "../context/Context";
const SearchBar = () => {
  return (
    <NotesContext.Consumer>
      {(context) => (
        <input
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
