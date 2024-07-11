import MainContent from "./Component/Main/main";
import Navbar from "./Component/Navbar/navbar";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#0E0E0E",
        flexDirection: "row",
        display: "flex",
        padding: 0
      }}
    >
      <Navbar />
      <MainContent />
    </div>
  );
}

export default App;
