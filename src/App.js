import Header from './Header';
import Toolbar from './Toolbar';
import Console from './Console';

const links = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/fvelcic" },
  { name: "YouTube", url: "https://www.youtube.com/channel/UC4J0UigOQrWDAXoLSNlWEIg" },
  { name: "GitHub", url: "https://github.com/FernandoVelcic" },
  { name: "Contact", url: "mailto:fvelcic@gmail.com" },
];

const commandHandler = (command, stdout) => {
  const sanitized_command = command.toLowerCase().trim();

  const socialCommand = links.find((link) => sanitized_command === link.name.toLowerCase());
  if (socialCommand) {
    var win = window.open(socialCommand.url, '_blank');
    win.focus();
    return stdout;
  }

  if (sanitized_command === "") {
    return stdout;
  } else if (sanitized_command === "clear") {
    return "";
  } else {
    return stdout + "\n" + "sh: command not found: " + command;
  }
}


const App = () => (
  <div class="flex flex-col absolute inset-0">
    <Header links={links} />
    <div class="bg-manjaro bg-center pt-5 px-5 pb-16 sm:p-20 h-full">
      <Toolbar title="Terminal" />
      <Console 
        descriptionToWrite={"Hello my name is Fernando Velcic\nWelcome to my page\n~ >>>\t"}
        commandHandler={commandHandler}
      />
    </div>
  </div>
);

export default App;
