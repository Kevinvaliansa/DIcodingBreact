import React from 'react';
import { showFormattedDate } from '../utils';
import NoteActionButton from './NoteActionButton';

/**
 * highlightText - Fungsi yang menyorot kata kunci pencarian dalam teks
 * dengan membungkusnya dalam elemen <mark>.
 *
 * @param {string} text - Teks asli yang akan diproses
 * @param {string} keyword - Kata kunci yang akan disorot
 * @returns {React.ReactNode} - Elemen dengan kata kunci yang disorot
 */
function highlightText(text, keyword) {
  if (!keyword || keyword.trim() === '') {
    return text;
  }

  // Escape karakter regex spesial dalam keyword
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
}

function NoteItem({ note, onDelete, onArchive, searchKeyword = '' }) {
  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <div className="note-item__content" data-testid="note-item-content">
        {/* [Basic] tampilkan judul catatan menggunakan note.title */}
        {/* [Advanced] sorot kata kunci pencarian dalam judul menggunakan elemen <mark>. */}
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        {/* [Basic] gunakan util showFormattedDate untuk menampilkan tanggal dibuat. */}
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        {/* [Basic] tampilkan isi catatan dari note.body */}
        {/* [Advanced] sorot kata kunci pencarian dalam isi menggunakan elemen <mark>. */}
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        {/* [Skilled] gunakan NoteActionButton dengan variant dan onClick */}
        <NoteActionButton
          variant="delete"
          onClick={() => onDelete(note.id)}
        />
        {/* [Advanced] tombol arsip/unarsip menggunakan NoteActionButton */}
        <NoteActionButton
          variant={note.archived ? 'unarchive' : 'archive'}
          onClick={() => onArchive(note.id)}
        />
      </div>
    </div>
  );
}

export default NoteItem;
