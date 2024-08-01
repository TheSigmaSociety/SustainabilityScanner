import './App.css';
import CameraComponent from './camera';
import React, { useState } from 'react';

function App() {
  const [popup, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(prev => !prev);
  };

  return (
    <div className="h-screen w-screen bg-alt flex flex-col overflow-hidden">
      <Header />

      {popup && (
        <div className="absolute h-full w-full bg-primary bg-opacity-75 rounded p-2 z-20 flex">
          <div className="flex flex-col w-full h-full items-center bg-alt pt-5 rounded-md p-2">
            <h1 className="text-center font-title text-3xl -mt-2">Scan your item!</h1>
            <div>
              <CameraComponent />
            </div>
            <div className="bottom-5 absolute bg-third rounded mt-4">
              <button onClick={togglePopup}>Close</button>
            </div>
          </div>
        </div>

      )}
      <main className="flex flex-col flex-grow">
        <Content />
      </main>
      <Footer togglePopup={togglePopup} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <section className="md w-screen pl-4 my-5 relative">
        <p className="text-6xl font-title text-background text-left">Green <br /> Cart</p>
        <div className="-top-72 -right-56 absolute p-4 z-10">
          <img className="w-auto h-auto transform scale-50 md:scale-100 rotate-240" src='/leaf8.png' alt="Leaf" />
        </div>
      </section>
    </div>
  );
}

function Content() {
  return (
    <div className="flex flex-col flex-grow relative overflow-hidden">
      <div className="flex justify-center flex-grow mt-2 relative z-10">
        <div className="w-4/5 text-right">
          <h1 className="text-4xl font-title2 font-bold text-primary">A Sustainable Way to Shop</h1>
          <p className="text-lg text-primary pt-6 ml-16">
            Scan your groceries and find products with a lower environmental impact.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col flex-grow">
        <div className="absolute -bottom-48 -right-40 p-4">
          <img className="w-auto h-auto transform scale-50 md:scale-100 -rotate-200" src='/leaf7.png' alt="Leaf" />
        </div>
        
        <div className="absolute bottom-0 -left-48 p-4">
          <img className="w-auto h-auto transform scale-50 md:scale-100 rotate-30" src='/leaf11.png' alt="Leaf" />
        </div>

        <div className="absolute -bottom-64 -left-24 p-4">
          <img className="w-auto h-auto transform scale-50 md:scale-100 rotate-240" src='/leaf1.png' alt="Leaf" />
        </div>
      </div>
    </div>
  );
}


function Footer({ togglePopup }) {
  return (
    <div className="bg-third w-screen h-16 flex items-center justify-center z-10">
      <section className="relative flex items-center justify-center w-full h-full">
        <div onClick={togglePopup} className="bg-third h-24 w-24 rounded-full flex items-center justify-center -translate-y-4 flex-col cursor-pointer">
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
          <p className="w-40 translate-x-7">Take a Picture!</p>
        </div>
      </section>
    </div>
  );
}

export default App;
