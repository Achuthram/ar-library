import { X, Star, BookOpen } from 'lucide-react';
import './BookDetailsModal.css';

function BookDetailsModal({ book, onClose }) {
  if (!book) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="book-modal" onClick={(event) => event.stopPropagation()}>
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close book details"
        >
          <X size={18} />
        </button>

        <div className={`modal-cover ${book.color}`}>
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="modal-content">
          <span className="modal-category">{book.category}</span>
          <h2>{book.title}</h2>
          <p className="modal-author">By {book.author}</p>

          <div className="modal-rating">
            <Star size={16} fill="currentColor" />
            {book.rating.toFixed(1)} / 5
          </div>

          <p className="modal-description">{book.description}</p>

          <div className="modal-footer">
            <div className="modal-meta">
              <BookOpen size={16} />
              <span>Featured pick</span>
            </div>
            <button type="button" className="modal-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsModal;
