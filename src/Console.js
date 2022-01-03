import { useEffect, useState, useRef } from "react";

const Console = ({descriptionToWrite, commandHandler}) => {
  descriptionToWrite = descriptionToWrite || '~ >>>\t';
  commandHandler = commandHandler || (() => {});

  const [stdout, setStdout] = useState("");
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
        setStdout(stdout + descriptionToWrite[offset]);
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
    if (isTyping()) return e.preventDefault();

    if (e.key === 'Enter') {
      const command = e.target.value;

      setStdout(stdout + command + "\n~ >>>\t");
      setInputValue("");

      commandHandler(command, stdout, setStdout);
    }
  };

  useEffect(() => {
    autoCompleteText();
    inputRef.current.scrollIntoView();
  }, [stdout]);

  useEffect(() => {
    if (!isTyping()) {
      setTimeout(() => {
        setShowCaret(!showCaret);
      }, 800);
    }
  }, [stdout, showCaret]);


  return (
    <div class="flex justify-end flex-col text-center h-full bg-black opacity-90 cursor-text" onClick={focusInput}>
      <div class="p-1 font-mono text-left text-white whitespace-pre-line overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-100 scrollbar-track-gray-900">
        {stdout}
        <input
          type="text" name="input" autoComplete="off" autoFocus
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