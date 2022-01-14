import { useEffect, useCallback, useState, useRef } from "react";

const Console = ({ prompt, descriptionToWrite, autotyperSpeed, commandHandler }) => {
  prompt = prompt || '\n~ >>>\t'
  descriptionToWrite = descriptionToWrite || prompt;
  autotyperSpeed = autotyperSpeed || 100;
  commandHandler = commandHandler || (() => { });

  const [stdin, setStdin] = useState("");
  const stdinRef = useRef();

  const [stdout, setStdout] = useState("");

  const caretRef = useRef();

  const [offset, setOffset] = useState(0);

  const isTyping = useCallback(() => {
    return offset < descriptionToWrite.length;
  }, [offset, descriptionToWrite]);

  const focusStdin = () => {
    stdinRef.current.focus();
  };

  const onChangeStdin = (e) => {
    if (isTyping()) return e.preventDefault();

    setStdin(e.target.value);
  }

  const onKeyDownStdin = (e) => {
    const ignoreKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (isTyping() || ignoreKeys.includes(e.key)) return e.preventDefault();

    if (e.key === 'Enter') {
      const command = e.target.value;

      const new_stdout = stdout + command

      setStdout(new_stdout);
      setStdin("");

      setStdout(commandHandler(command, new_stdout) + prompt);
    }
  };

  //Scroll to bottom
  useEffect(() => {
    stdinRef.current.scrollIntoView();
  }, [stdout]);

  //Autotyping
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isTyping()) {
        clearInterval(intervalId);
        return;
      }

      setOffset(offset + 1);
      setStdout(stdout + descriptionToWrite[offset]);
    }, autotyperSpeed);

    return () => clearInterval(intervalId);
  }, [stdout, offset, isTyping, autotyperSpeed, descriptionToWrite]);

  //Caret blinking
  useEffect(() => {
    const intervalId = setInterval(() => {
      caretRef.current.style.display = (caretRef.current.style.display === "none" || isTyping()) ? "inline" : "none";
    }, 800);

    return () => clearInterval(intervalId);
  }, [stdout, isTyping]);


  return (
    <div class="flex justify-end flex-col text-center h-full bg-black opacity-90 cursor-text" onClick={focusStdin}>
      <div class="p-1 font-mono text-left text-white whitespace-pre-line overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-100 scrollbar-track-gray-900">
        <div class="inline" dangerouslySetInnerHTML={{ __html: stdout }}></div>
        <input
          type="text" name="input" autoComplete="off" maxlength="30" autoFocus
          class="inline text-white bg-black focus:outline-none caret-black" style={{ width: stdin.length + 'ch' }}
          value={stdin}
          ref={stdinRef}
          onChange={onChangeStdin}
          onKeyDown={onKeyDownStdin}
        ></input>
        <b class="left-0 bg-white" ref={caretRef}>&nbsp;</b>
      </div>
    </div>
  );
}

export default Console;