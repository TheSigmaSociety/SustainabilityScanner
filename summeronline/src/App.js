import './App.css';
import CameraComponent from './camera';

function App() {
  return <div className = "h-screen w-screen bg-alt flex flex-col overflow-hidden relative">
    <Header />
    <Content />
    <CameraComponent />
    <Footer />
  </div>;
}

function Header() {
  return <div>
    <section className = "md w-screen flex justify-center my-5 relative">
      <p className = "text-6xl font-title text-background text-center">Sustainability Scanner</p>
    </section>
  </div>
}
function Content() {
  return (<div>
    <div className="flex justify-center items-center h-2.9/3 mt-2">
      <div className="w-4/5 z-10">
        <h1 className="text-4xl font-title2 font-bold text-primary w-50 text-right">A Sustainable Way to Shop</h1>
        <p className="text-lg text-primary pt-6 text-right w-100 ml-4">
          Scan your groceries and find products with a lower environmental impact. 
        </p>
      </div>
    </div>
    <div className="flex justify-center items-center h-1/3 absolute -right-7 bottom-0">
      <img className = "w-full h-full -rotate-200"src='/leaf7.png' alt = "Leaf"/>
    </div>
    <div className="flex justify-center items-center h-1/3 absolute -left-16 bottom-64">
      <img className = "w-full h-full rotate-30"src='/leaf11.png' alt = "Leaf"/>
    </div>
    <div className="flex justify-center items-center h-1/3 absolute left-0 bottom-32">
      <img className = "w-full h-full rotate-240"src='/leaf1.png' alt = "Leaf"/>
    </div>
    <div className="flex justify-center items-center h-1/3 absolute -right-20 -top-20">
      <img className = "w-full h-full rotate-240"src='/leaf8.png' alt = "Leaf"/>
    </div>
  </div>
  );
}

function Footer() {

  const clicked = () => {
    console.log("clicked");
  }

  return <div className = "w-screen">
    <section  className = "bottom-0 bg-third w-screen h-16 absolute flex items-center justify-center">
      <div className = "bg-third h-24 w-24 rounded-full flex items-center justify-center -translate-y-4 flex-col cursor-pointer" onClick={clicked}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="size-16 mt-3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>
        <p className = "w-40 translate-x-7">Take a Picture!</p>
      </div>
    </section>
  </div>
}


export default App;
