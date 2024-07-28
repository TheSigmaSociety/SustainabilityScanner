import './App.css';


function App() {
  return <div className = "h-screen w-screen bg-alt flex">
    <Header />
  </div>;
}

function Header() {
  return <div>
    <section className = "md w-screen flex justify-center my-5 relative">
      <p className = "text-4xl font-firsticle text-background">Website Head</p>
    </section>
  </div>

}

export default App;
