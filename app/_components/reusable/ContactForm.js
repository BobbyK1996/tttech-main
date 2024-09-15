'use client';

function ContactForm() {
  return (
    <form className="w-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log('hello');
        }}
      >
        Test
      </button>
    </form>
  );
}

export default ContactForm;
