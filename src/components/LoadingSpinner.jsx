const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-rose-700 border-t-purple-700 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
