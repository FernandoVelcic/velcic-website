import Header from './Header';
import Toolbar from './Toolbar';
import Console from './Console';

const links = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/fvelcic" },
  { name: "YouTube", url: "https://www.youtube.com/channel/UC4J0UigOQrWDAXoLSNlWEIg" },
  { name: "GitHub", url: "https://github.com/FernandoVelcic" },
  { name: "Contact", url: "mailto:fvelcic@gmail.com" },
];

const description = `
  I'm Fernando Velcic, a passionate Software Engineer that looks for developing software quality product.

  Professor at the university who aims to help people to understand how the computer works and help them to grow up in this field.

  I consider myself a low level programmer who applies this knowledge to the new technologies, this helps me to have a different point of view when solving problems.
  
  I enjoy developing low level projects and high level as well, frontend and backend but also infrastructure, more than 15 years of programming experience in different technologies.
  
  If you want to know more about me please type <b>help</b>

  ~ >>>\t`;

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
  } else if (sanitized_command === "help") {
    const description = `
    Useful commands:
    - stack (to know more about my stack of technologies)
    - linkedin (to see my work experience)
    - github (to checkout some of my projects)
    - youtube (to watch videos of me teaching python or computer organization)
    - clear (to clear the terminal screen)
    `;
    return stdout + "\n" + description;
  } else if (sanitized_command === "stack") {
    const description = `
    I like to be up to date, so I have tested different technologies over the years but the most relevant are the following:
    - reactjs and angular (Frontend)
    - nodejs and php (Backend)
    - docker
    - aws (Infrastructure and different services like s3, cloudfront, lambdas, rekognition and more)
    - relational databases (mysql, sql server, oracle database)
    - non-relational databases (dynamodb, elasticsearch, mongodb, redis)
    `;
    return stdout + "\n" + description;
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
        descriptionToWrite={description}
        autotyperSpeed={50}
        commandHandler={commandHandler}
      />
    </div>
  </div>
);

export default App;
