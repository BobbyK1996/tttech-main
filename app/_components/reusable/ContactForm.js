import { sendMail } from '@lib/mail';

function ContactForm() {
  const send = async () => {
    'use server';
    await sendMail({
      to: 'freestuffpls12345@gmail.com',
      name: 'Bobby',
      subject: 'Test mail',
      body: '<h1>Testing</h1>',
    });
  };

  return (
    <form className="w-full">
      <button
        // onClick={(e) => {
        //   e.preventDefault();
        //   console.log('hello');
        // }}
        formAction={send}
      >
        Test
      </button>
    </form>
  );
}

export default ContactForm;
