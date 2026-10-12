
import { BookOpen, Bookmark, CheckCircle, Clock3 } from 'lucide-react';
import './ReadingList.css';

const STATUSES = [
  {
    label: 'Want to Read',
    icon: Bookmark,
  },
  {
    label: 'Currently Reading',
    icon: BookOpen,
  },
  {
    label: 'Completed',
    icon: CheckCircle,
  },
];

function ReadingList({
  books,
  readingList,
  onBack,
  onStatusChange,
  onViewDetails,
}) {
  const savedCount = books.filter(
    (book) => readingList[book.id]
  ).length;

  return (
    <section className="reading-page">
      <button className="reading-back-button" onClick={onBack}>
        <Clock3 size={17} />
        Back to Explore
      </button>

      <div className="reading-heading">
        <span className="reading-heading-icon">
          <BookOpen size={26} />
        </span>
        <div>
          <span className="section-kicker">YOUR READING JOURNEY</span>
          <h1>My Reading List</h1>
          <p>Keep track of the books you're planning, reading, and finishing.</p>
        </div>
      </div>

      <div className="reading-summary">
        <strong>{savedCount}</strong>
        <span>{savedCount === 1 ? 'book in your list' : 'books in your list'}</span>
      </div>

      {STATUSES.map(({ label, icon: Icon }) => {
        const statusBooks = books.filter(
          (book) => readingList[book.id] === label
        );

        return (
          <section className="reading-group" key={label}>
            <div className="reading-group-heading">
              <span className={`reading-status-icon ${label.toLowerCase().replaceAll(' ', '-')}`}>
                <Icon size={20} />
              </span>
              <div>
                <h2>{label}</h2>
                <p>{statusBooks.length} {statusBooks.length === 1 ? 'book' : 'books'}</p>
              </div>
            </div>

            {statusBooks.length === 0 ? (
              <div className="reading-empty">
                No books here yet. Add one from Explore Books.
              </div>
            ) : (
              <div className="books-grid">
                {statusBooks.map((book) => (
                  <article className="book-card" key={book.id}>
                    <div className={`book-cover ${book.color}`}>
                      <img
                        src={book.cover}
                        alt={`Cover of ${book.title}`}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="cover-category">{book.category}</span>
                    </div>

                    <div className="book-info">
                      <div className="book-rating">
                        ★ {book.rating.toFixed(1)}
                      </div>

                      <h3>{book.title}</h3>
                      <p className="book-author">By {book.author}</p>

                      <label className="reading-status-label" htmlFor={`reading-status-${book.id}`}>
                        Reading status
                      </label>

                      <select
                        id={`reading-status-${book.id}`}
                        className="reading-status-select"
                        value={readingList[book.id]}
                        onChange={(event) =>
                          onStatusChange(book.id, event.target.value)
                        }
                      >
                        {STATUSES.map((status) => (
                          <option key={status.label} value={status.label}>
                            {status.label}
                          </option>
                        ))}
                        <option value="">Remove from list</option>
                      </select>

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
      })}
    </section>
  );
}

export default ReadingList;
