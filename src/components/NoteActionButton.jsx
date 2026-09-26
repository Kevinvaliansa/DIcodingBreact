import React from 'react';

/**
 * NoteActionButton - Reusable action button component for note actions.
 *
 * Props:
 * - variant: 'delete' | 'archive' | 'unarchive' — menentukan style dan label tombol
 * - onClick: function — handler ketika tombol ditekan
 */
function NoteActionButton({ variant, onClick }) {
  const variantConfig = {
    delete: {
      className: 'note-item__delete-button',
      label: 'Delete',
      dataTestId: 'note-item-delete-button',
    },
    archive: {
      className: 'note-item__archive-button',
      label: 'Arsip',
      dataTestId: 'note-item-archive-button',
    },
    unarchive: {
      className: 'note-item__archive-button',
      label: 'Aktifkan',
      dataTestId: 'note-item-archive-button',
    },
  };

  const config = variantConfig[variant] || variantConfig.delete;

  return (
    <button
      className={config.className}
      type="button"
      onClick={onClick}
      data-testid={config.dataTestId}
    >
      {config.label}
    </button>
  );
}

export default NoteActionButton;
