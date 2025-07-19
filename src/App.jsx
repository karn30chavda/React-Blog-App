function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL); // Log the environment variable

  return (
    <>
      <div className="text-3xl font-bold rounded-xl text-center m-4 p-4 bg-gray-600 text-white">
        Welcome to React Mega Project
      </div>
    </>
  );
}

export default App;
