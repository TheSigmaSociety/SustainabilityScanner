import './App.css';
import CameraComponent from './camera';
import React, { useState } from 'react';

function App() {
  const [output, setOutput] = useState(null);
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
        {output && <div className="flex flex-col flex-grow justify-center items-center">{output}</div>}
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
  const [popup, setPopup] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);

  const togglePopup = () => {
    setPopup(prev => !prev);
  };

  const toggleLeaderboard = () => {
    setLeaderboard(prev => !prev);
  };

  return (
    <div className="h-screen w-screen bg-alt flex flex-col overflow-hidden">
      <Header />

      {popup && (
      <div className="absolute h-full w-full bg-primary bg-opacity-75 rounded p-2 z-20 flex justify-center items-center">
        <div className="flex flex-col relative w-full max-w-lg items-center bg-alt pt-5 rounded-md p-2">
          <svg 
              onClick={togglePopup} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              className="absolute top-2 right-2 w-6 h-6 cursor-pointer">

              <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          <h1 className="text-center font-title text-3xl mt-2">Scan your item!</h1>
          <div>
            <CameraComponent output = {output} outputFunc = {setOutput}/>
          </div>
        </div>
      </div>
    )}
    {leaderboard && (
      <div className="absolute h-full w-full bg-primary bg-opacity-75 rounded p-2 z-20 
        flex justify-center items-center">
        <div className="flex flex-col relative w-full h-full max-w-lg items-center bg-alt 
          rounded-md p-2">
          <svg 
              onClick={toggleLeaderboard} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              className="absolute top-2 right-2 w-6 h-6 cursor-pointer">

              <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          <h1 className="text-center font-title text-3xl mt-2">Leaderboard!</h1>
          <div className="mb-3 w-2/3">
            <div className="relative mb-4 flex w-full">
                <input
                    type="search"
                    className="relative text-title2 mt-3 m-0 block flex-auto rounded 
                      border border-solid border-neutral-300 bg-transparent bg-clip-padding 
                      px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 
                      outline-none transition duration-200 ease-in-out focus:z-[3] 
                      focus:border-primary focus:text-neutral-700 
                      focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none 
                      dark:border-neutral-600 dark:text-black-200 dark:placeholder:text-black-200
                      dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2" />
            </div>
          </div>
          <div className = "flex flex-col bg-gray-300 w-full h-full rounded">
            <div className = "flex flex-row place-content-between w-full my-2 h-1/3">
              <LbItem color="secondary" image="leaf2" name={"First Place"}/>
              <LbItem />
              <LbItem />
            </div>
            <div className = "flex flex-row place-content-between w-full my-2 h-1/3">
              <LbItem />
              <LbItem />
              <LbItem />
            </div>
            <div className = "flex flex-row place-content-between w-full my-2 h-1/3">
              <LbItem />
              <LbItem />
              <LbItem />
            </div>
          </div>
        </div>
      </div>
    )}
      <main className="flex flex-col flex-grow">
        <Content />
      </main>
      <Footer togglePopup={togglePopup} toggleLeaderboard={toggleLeaderboard} />
    </div>
  );
}


function LbItem( { color = "alt", image, name = "placeholder", ranking = "0/10", isVisible = true } ) {
  return (
    <div className={`bg-${color} w-1/3 h-full mx-2 flex items-center justify-center text-center flex-col duration-500 hover:scale-105`}>
      <img className = "w-1/2 h-auto" src={`/${image}.png`} alt="img"/> 
      <p>{ name }</p>
      <p>{ ranking }</p>
    </div>
  );
}

function getImage(items){
  //ur gay
  //gay gay gay gayg ya
}

function Header() {
  return (
    <div>
      <section className="md w-screen my-5 relative">
        <div className = 'relative z-20 pl-2'>
          <p className="text-6xl font-title text-background text-left">Sustainability<br />Scanner</p>
        </div>
        <div className="-top-72 -right-56 absolute p-4 z-10">
          <img className="w-auto h-auto transform scale-50 md:scale-1a00 rotate-240" src='/leaf8.png' alt="Leaf" />
        </div>
      </section>
    </div>
  );
}




function Footer({ togglePopup, toggleLeaderboard }) {
  return (
    <div className="bg-third w-screen h-16 flex items-center justify-center z-10">
      <section className="relative flex items-center justify-center w-full h-full">
        <div className = "flex items-center justify-center flex-col">
          {/* The leaderboard Button */}
          <div onClick={toggleLeaderboard} className = "absolute left-5 border-secondary border-4 rounded-xl px-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-9 translate-x-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
            </svg>
            <p className="text-sm">Leaderboard!</p>
          </div>
        </div>
        {/* The Camera Button */}
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
