import { useState } from "react";
import Book from "./Book";

/**
 * Search page component that can be used to search books by
 * name, author and title
 * @param {*} props 
 * @returns 
 */
function SearchPage(props) {

  const { allBooks, onCategoryChange } = props;
  const [searchedBooks, setSearchedBooks] = useState(allBooks);

  const onTextChange = (e) => {
    e.preventDefault();

    if (e && e.target && e.target.value) {
      const searchedValue = e.target.value.toLowerCase();
      const filtered = allBooks.filter(book => (book.title.toLowerCase().includes(searchedValue)
        || book.authors.join(' ').toLowerCase().includes(searchedValue)
        || book.industryIdentifiers.map(inId => inId.type).join(' ').toLowerCase().includes(searchedValue)
      ));
      setSearchedBooks(filtered);
    }

  }

  return (<div className="search-books">
    <div className="search-books-bar">

      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={onTextChange}
        />
      </div>
    </div>
    <div className="search-books-results">

      <ol className="books-grid">
        {searchedBooks.map(book => (
          <li key={book.id}>
            <Book book={book} onCategoryChange={onCategoryChange}></Book>
          </li>
        ))}
      </ol>
    </div>
  </div>)
}

export default SearchPage;