const Toolbar = ({ title }) => {
  title = title || '';

  return <div class="text-white text-center font-semibold bg-zinc-800 rounded-t py-1 select-none">
    {title}
  </div>;
}

export default Toolbar;