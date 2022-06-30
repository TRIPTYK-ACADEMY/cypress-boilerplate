const Loader = () => (
  <div
    className="absolute w-screen top-0 left-0 h-screen flex items-center justify-center bg-blue-300 bg-opacity-30 z-[1000]"
    data-cy="loading">
    <div className="lds-default">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
