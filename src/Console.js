import { useEffect, useState, useRef } from "react";

const Console = () => {
  const descriptionToWrite = "Hello my name is Fernando Velcic\nWelcome to my page\n~ >>>\t"
  const [description, setDescription] = useState("");
  const [offset, setOffset] = useState(0);

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const [showCaret, setShowCaret] = useState(true);

  const increaseOffset = () => {
    setOffset(offset + 1);
  };

  const isTyping = () => {
    return offset < descriptionToWrite.length;
  };

  const autoCompleteText = () => {
    if (isTyping()) {
      setTimeout(() => {
        increaseOffset();
        setDescription(description + descriptionToWrite[offset]);
      }, 100);
    }
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    if (isTyping()) return e.preventDefault(); 
    setInputValue(e.target.value);
  }

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      setDescription(description + e.target.value + "\n~ >>>\t");
      setInputValue("");
    }
  };

  useEffect(() => {
    autoCompleteText();
  }, [description]);

  useEffect(() => {
    if (!isTyping()) {
      setTimeout(() => {
        setShowCaret(!showCaret);
      }, 800);
    }
  }, [description, showCaret]);


  return (
    <div class="flex justify-end flex-col text-center h-full bg-black opacity-90 cursor-text" onClick={focusInput}>
      <div class="p-1 font-mono text-left text-white whitespace-pre-line">
        {description}
        <input
          type="text" name="input" autocomplete="off" autoFocus
          class="inline text-white bg-black focus:outline-none caret-black" style={{ width: inputValue.length + 'ch' }}
          value={inputValue}
          ref={inputRef}
          onChange={onChangeInput}
          onKeyDown={handleInput}
        ></input>
        <b className={"left-0 bg-white " + ((showCaret) ? "" : "hidden")}>&nbsp;</b>
      </div>
    </div>
  );
}

export default Console;