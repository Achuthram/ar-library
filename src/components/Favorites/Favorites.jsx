
import { Heart, ArrowLeft, BookOpen } from 'lucide-react';
import './Favorites.css';

function Favorites({ books, onBack, onViewDetails, onToggleFavorite }) {
  return (
    <section className="favorites-page">
      <button className="favorites-back" onClick={onBack}>
        <ArrowLeft size={17} />
        Back to Explore
      </button>

      <div className="favorites-heading">
        <span className="favorites-icon">
          <Heart size={24} />
        </span>

        <div>
          <h1>My Wishlist</h1>
          <p>Your favorite books, all in one place.</p>
        </div>
      </div>

      <p className="favorites-count">
        {books.length} saved {books.length === 1 ? 'book' : 'books'}
      </p>

      {books.length === 0 ? (
        <div className="favorites-empty">
          <BookOpen size={42} />
          <h2>Your wishlist is empty</h2>
          <p>Explore the library and save books you love.</p>
          <button onClick={onBack}>Explore Books</button>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <article className="book-card" key={book.id}>
              <div className={`book-cover ${book.color}`}>
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />

                <button
                  className="favorite-button is-favorite"
                  aria-label={`Remove ${book.title} from favorites`}
                  onClick={() => onToggleFavorite(book.id)}
                >
                  <Heart size={18} fill="currentColor" />
                </button>

                <span className="cover-category">{book.category}</span>
              </div>

              <div className="book-info">
                <div className="book-rating">
                  ★ {book.rating.toFixed(1)}
                </div>

                <h3>{book.title}</h3>
                <p className="book-author">By {book.author}</p>

                <button
                  className="details-button"
                  onClick={() => onViewDetails(book)}
                >
                  View Details →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;
