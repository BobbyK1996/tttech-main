function SubmitForm() {
  return (
    <form className="text-black">
      <div className="flex">
        <div>
          <label htmlFor="given-name">Name</label>
          <input
            type="text"
            id="given-name"
            name="given-name"
            required
            placeholder="Given name"
            autoComplete="given-name"
            aria-label="Given Name"
          />
        </div>
        <div>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            required
            placeholder="Surname"
            autoComplete="family-name"
            aria-label="Surname"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mobile">Mobile number</label>
        <input type="tel" id="mobile" />
      </div>
    </form>
  );
}

export default SubmitForm;
