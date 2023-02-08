
import TodoContainer from "./containers/TodoContainer/TodoContainer";
import Header from "./partials/Header/Header";

function App() {
  return (
    <>
      <Header />
     <div className="mr-auto ml-auto w-[500px]">
     <TodoContainer />
     </div>
    </>
  );
}

export default App;
