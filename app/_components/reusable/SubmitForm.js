"use client";

import { useEffect, useState } from "react";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const messages = ["Required", "Optional (but helpful!)", "Review & Submit"];

function StepMessage({ children }) {
  return (
    <p className="mx-10 flex flex-col items-center text-center text-2xl font-bold">
      {children}
    </p>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const calcProgressWidth = () => {
  const progressParentEl = document.querySelectorAll("#progress-parent > li");
  const posDiff =
    progressParentEl[1].getBoundingClientRect().left -
    progressParentEl[0].getBoundingClientRect().left;

  return posDiff;
};

function SubmitForm() {
  const [step, setStep] = useState(1);

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <>
      <ul
        className="mx-auto flex w-full max-w-xl justify-between"
        id="progress-parent"
      >
        <li
          className={`relative flex aspect-square h-10 items-center justify-center rounded-full text-2xl ${
            step >= 1 ? "bg-green-600 text-white" : "bg-stone-400"
          }`}
          style={{}}
        >
          1
        </li>
        <li
          className={`flex aspect-square h-10 items-center justify-center rounded-full text-2xl ${
            step >= 2 ? "bg-green-600 text-white" : "bg-stone-400"
          }`}
        >
          2
        </li>
        <li
          className={`flex aspect-square h-10 items-center justify-center rounded-full text-2xl ${
            step >= 3 ? "bg-green-600 text-white" : "bg-stone-400"
          }`}
        >
          3
        </li>
      </ul>

      <StepMessage>{messages[step - 1]}</StepMessage>

      <div className="flex justify-between">
        <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
          <span>
            <MdNavigateBefore />
          </span>
        </Button>

        <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
          <span>
            <MdNavigateNext />
          </span>
        </Button>
      </div>
    </>

    // <form className="text-black">
    //   <div className="flex">
    //     <div>
    //       <label htmlFor="given-name">Name</label>
    //       <input
    //         type="text"
    //         id="given-name"
    //         name="given-name"
    //         required
    //         placeholder="Given name"
    //         autoComplete="given-name"
    //         aria-label="Given Name"
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="surname">Surname</label>
    //       <input
    //         type="text"
    //         id="surname"
    //         name="surname"
    //         required
    //         placeholder="Surname"
    //         autoComplete="family-name"
    //         aria-label="Surname"
    //       />
    //     </div>
    //   </div>

    //   <div>
    //     <label htmlFor="mobile">Mobile number</label>
    //     <input type="tel" id="mobile" />
    //   </div>
    // </form>
  );
}

export default SubmitForm;
