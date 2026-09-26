import React from 'react';
import NoteItem from './NoteItem';

/**
 * getGroupKey - Menghasilkan key grup berdasarkan bulan dan tahun dari tanggal.
 * Format: "YYYY-MM" (e.g. "2025-04")
 */
function getGroupKey(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/**
 * formatGroupHeader - Mengubah key grup menjadi label yang bisa dibaca.
 * Contoh: "2025-04" → "April 2025"
 */
function formatGroupHeader(groupKey) {
  const [year, month] = groupKey.split('-');
  const date = new Date(year, parseInt(month, 10) - 1, 1);
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

/**
 * groupNotesByMonth - Mengelompokkan catatan berdasarkan kombinasi bulan-tahun.
 * Mengembalikan object { groupKey: [notes] } diurutkan dari terbaru.
 */
function groupNotesByMonth(notes) {
  // [Basic] gunakan array.reduce untuk mengakumulasi catatan ke dalam grup berdasarkan bulan-tahun.
  const groups = notes.reduce((acc, note) => {
    const key = getGroupKey(note.createdAt);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(note);
    return acc;
  }, {});

  // Urutkan grup dari terbaru ke terlama
  const sortedEntries = Object.entries(groups).sort(([a], [b]) =>
    b.localeCompare(a)
  );

  return Object.fromEntries(sortedEntries);
}

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list', searchKeyword = '' }) {
  // [Basic] validasi notes agar tidak kosong.
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* [Basic] tampilkan pesan kosong yang informatif ketika tidak ada catatan. */}
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  // [Advanced] kelompokkan catatan per bulan-tahun dan render tiap grup dalam <section className="notes-group">.
  const groupedNotes = groupNotesByMonth(notes);

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {/* [Basic] gunakan array.map untuk merender NoteItem untuk setiap catatan. */}
      {/* [Advanced] render dalam section.notes-group dengan header dan jumlah per grup */}
      {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => (
        <section
          key={groupKey}
          data-testid={`${groupKey}-group`}
          className="notes-group"
        >
          <div className="notes-group__header">
            <h3 className="notes-group__title">{formatGroupHeader(groupKey)}</h3>
            <span
              data-testid={`${groupKey}-group-count`}
              className="notes-group__count"
            >
              {groupNotes.length} catatan
            </span>
          </div>
          <div className="notes-group__items">
            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
