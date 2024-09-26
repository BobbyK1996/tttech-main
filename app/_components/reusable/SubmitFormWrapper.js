import SubmitForm from '@components/reusable/SubmitForm';

function SubmitFormWrapper({ isOpen, onOpen }) {
  return (
    <div className="w-full">
      <button className="w-full p-4 bg-green-500" onClick={onOpen}>
        {!isOpen ? 'Apply!' : 'Go Back'}
      </button>
      {isOpen && <SubmitForm />}
    </div>
  );
}

export default SubmitFormWrapper;
