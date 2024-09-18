import ConverterBlock from "./components/ConverterBlock";
import Header from "./layouts/Header";

function App() {
  return (
    <>
      <Header />
      <main className="w-full bg-emerald-50 h-[calc(100vh-70px)]">
        <ConverterBlock />
      </main>
    </>
  );
}

export default App;
