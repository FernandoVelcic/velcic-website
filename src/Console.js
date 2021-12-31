import { useEffect, useState } from "react";

const Console = () => {
  const descriptionToWrite = "Hello my name is Fernando Velcic\nWelcome to my page\n~ >>>"
  const [description, setDescription] = useState("");
  const [offset, setOffset] = useState(0);

  const increaseOffset = () => {
    setOffset(offset + 1);
  };

  const autoCompleteText = () => {
    if (offset < descriptionToWrite.length) {
      setTimeout(() => {
        increaseOffset();
        setDescription(description + descriptionToWrite[offset]);
      }, 100);
    }
  };

  useEffect(() => {
    autoCompleteText();
  }, [description]);

  return (
    <div class="flex justify-end flex-col text-center h-full bg-black opacity-90">
      <div class="p-1 font-mono text-left text-white whitespace-pre-line">
        {description}
      </div>
    </div>
  );
}

export default Console;