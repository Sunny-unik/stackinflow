import React, { useRef, useState } from "react";
import "./css/otpForm.css";

export default function OtpForm({
  onSubmit,
  otpLength,
  placeholder,
  inputStyleProps,
  inputType,
  labelText
}) {
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const inputWrapperRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(otp.join(""));
  };

  const handleChange = (event, index) => {
    const finalizeOtp = [...otp];
    const updatedAtIndex = finalizeOtp.findIndex((inputValue) => !inputValue);
    const value = event.target.value;

    updatedAtIndex === -1
      ? (finalizeOtp[index] = value[value.length - 1] ?? "")
      : (finalizeOtp[updatedAtIndex] = value[value.length - 1] ?? "");
    setOtp(finalizeOtp);

    if (event.nativeEvent.inputType.includes("deleteContent")) return;
    inputWrapperRef.current.children[
      (updatedAtIndex === -1 ? index : updatedAtIndex) + 1
    ]?.focus();
  };

  const handleKeyDown = (event, index) => {
    const allInputs = inputWrapperRef.current.children;
    const keyCode = event.keyCode;
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))
      return; // when any number clicked

    if (event.code === "Backspace" || event.code === "Delete") {
      const finalizeOtp = [...otp];
      finalizeOtp.splice(index, 1);
      finalizeOtp.length = otpLength;
      setOtp([...finalizeOtp.map((v) => (!v ? "" : v))]);
      allInputs[index - 1]?.focus();
    }
  };

  const handlePaste = (event, index) => console.log(event, index);

  return (
    <>
      <form onSubmit={handleSubmit} className="otpForm">
        {labelText && (
          <label className="otpLabel" htmlFor="otpInputsWrapper">
            {labelText}
          </label>
        )}
        <div id="otpInputsWrapper" ref={inputWrapperRef}>
          {otp.map((value, index) => (
            <input
              className="otpInput"
              key={index}
              type={inputType}
              style={{ ...inputStyleProps }}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              onFocus={(e) => e.target.select()}
              required
            />
          ))}
        </div>
        <button type="submit" className="otpSubmitBtn">
          Submit
        </button>
      </form>
    </>
  );
}