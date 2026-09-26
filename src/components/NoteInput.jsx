import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // [Basic] kelola nilai title sebagai controlled input.
      title: '',
      // [Basic] kelola nilai body sebagai controlled textarea.
      body: '',
      // [Advanced] state untuk pesan error validasi body.
      bodyError: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    // [Basic] update state dengan nilai event.target.value.
    // [Skilled] batasi judul maksimal 50 karakter menggunakan state (bukan maxLength).
    const value = event.target.value;
    if (value.length <= 50) {
      this.setState({ title: value });
    }
  }

  onBodyChangeEventHandler(event) {
    // [Basic] update state body agar textarea menjadi controlled component.
    const value = event.target.value;
    this.setState({
      body: value,
      // Hapus error ketika user mulai mengetik lagi
      bodyError: value.length > 0 && value.length < 10 ? 'Isi catatan minimal harus 10 karakter' : '',
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    // [Advanced] tolak submit ketika body kurang dari 10 karakter dan tampilkan pesan error.
    if (body.length < 10) {
      this.setState({ bodyError: 'Isi catatan minimal harus 10 karakter' });
      return;
    }

    // [Basic] panggil props.addNote dengan data title & body dari state, lalu reset form.
    this.props.addNote({ title, body });
    this.setState({ title: '', body: '', bodyError: '' });
  }

  render() {
    const { title, body, bodyError } = this.state;

    // [Skilled] hitung sisa karakter untuk limit 50 karakter.
    const remainingChars = 50 - title.length;
    const isNearLimit = remainingChars < 10;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {/* [Advanced] tampilkan pesan error menggunakan elemen dengan class note-input__feedback--error. */}
        {bodyError && (
          <p className="note-input__feedback note-input__feedback--error">
            {bodyError}
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          {/* [Skilled] tampilkan sisa karakter secara dinamis */}
          <p
            className={`note-input__title__char-limit${isNearLimit ? ' note-input__title__char-limit--warn' : ''}`}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>
          {/* [Basic] label + input controlled untuk judul */}
          <label htmlFor="note-input-title">Judul</label>
          <input
            id="note-input-title"
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          {/* [Basic] label + textarea controlled untuk isi catatan */}
          <label htmlFor="note-input-body">Catatan</label>
          <textarea
            id="note-input-body"
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
