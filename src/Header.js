import { useState } from "react";
import { ReactComponent as MenuIcon } from "./images/menu.svg"
import avatar from "./images/avatar.png"



const Header = ({ links }) => {
  links = links || [];

  const [navToggled, setNavToggled] = useState(false);

  const navToggle = () => {
    setNavToggled(!navToggled);
  };

  return (
    <nav class="flex shrink-0 items-center justify-between flex-wrap bg-black p-4">
      <div class="flex items-center flex-shrink-0 text-white mr-8">
        <img class="fill-current h-9 w-9 mr-4" src={avatar} alt="Logo" />
        <span class="font-semibold text-xl tracking-tight">Fernando Velcic</span>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white" onClick={navToggle}>
          <MenuIcon class="fill-current h-3 w-3" alt="Menu" />
        </button>
      </div>
      <div className={"w-full block flex-grow lg:flex lg:items-center lg:w-auto " + (navToggled ? "" : "hidden")}>
        <div class="text-sm lg:flex-grow">
          {
            links.map((link, index, array) => (
            <a key={index} href={link.url} className={"block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white " + ((index < array.length - 1) ? "mr-6" : "")}>
              {link.name}
            </a>))
          }
        </div>
        {/*<div>
          <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
        </div>*/}
      </div>
    </nav>
  );
};

export default Header;