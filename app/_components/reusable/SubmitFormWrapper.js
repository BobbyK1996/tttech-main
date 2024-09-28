"use client";
import { useState } from "react";

import SubmitForm from "@components/reusable/SubmitForm";

function SubmitFormWrapper({ isOpen, onOpen }) {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full">
      <button className="w-full bg-green-500 p-4" onClick={onOpen}>
        {!isOpen ? "Apply!" : "Go Back"}
      </button>
      {isOpen && <SubmitForm step={step} setStep={setStep} />}
    </div>
  );
}

export default SubmitFormWrapper;
