const ErrorComponent = ({ error }) => {
  return (
    <div className="border border-stone-800 rounded-sm drop-shadow-lg w-full mx-auto p-[10px]">
      <h1 className="text-white">{error}</h1>
    </div>
  );
};

export default ErrorComponent;
