import './App.css';
import CameraComponent from './camera';
import React, { useEffect, useState, useCallback } from 'react';

function App() {

  const [output, setOutput] = useState(null);


  const initialProductState = { image: null, name: null, score: null,description: null};
  const [products, setProducts] = useState(Array(9).fill(initialProductState));
  

  function Content() {
    return (
      <div className="flex flex-col flex-grow relative overflow-hidden">
        <div className="flex justify-center lg:items-center flex-grow mt-2 relative z-10">
          <div className="w-4/5 text-right lg:text-center lg:w-full">
            <h1 className="text-4xl font-title2 font-bold text-primary lg:text-6xl">A Sustainable Way to Shop</h1>
            <p className="text-lg text-primary pt-6 ml-16 lg:ml-0 lg:text-xl">
              Scan your groceries and find products with a lower environmental impact.
            </p>
          </div>
        </div>
          {output && <div className="flex flex-col flex-grow justify-center items-center">{output}</div>}
        <div className="relative flex flex-col flex-grow">
          <div className="absolute -bottom-48 -right-40 p-4">
            <img className="w-auto h-auto transform scale-50 md:scale-100 -rotate-200" src='/leaf7.png' alt="Leaf" />
          </div>
          
          <div className="absolute bottom-0 -left-56 p-4">
            <img className="w-auto h-auto transform scale-50 md:scale-100 rotate-30" src='/leaf11.png' alt="Leaf" />
          </div>
  
          <div className="absolute -bottom-64 -left-24 p-4">
            <img className="w-auto h-auto transform scale-50 md:scale-100 rotate-240" src='/leaf1.png' alt="Leaf" />
          </div>
        </div>
      </div>
    );}
  
  const [popup, setPopup] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);
  const [help, setHelp] = useState(false); //this

  const togglePopup = () => {
    setPopup(prev => !prev);
  };

  const toggleLeaderboard = () => {
    setLeaderboard(prev => !prev);
  };

  
  useEffect(() => {
    function updateProduct(index, newProduct) {
      const har = products
      har[index] = newProduct
      setProducts(har)
    };
  
    async function getLeaderboard() {
      const x = await fetch("http://127.0.0.1:5001/getItem?place=0").then(response => response.json());
      for(var i = 0; i < x['products'].length; i++) {
        const product = x['products'][i]
        const image = await fetch("http://127.0.0.1:5001/getImage?name="+product['name']).then(response => response.json());
        updateProduct(i,{image:image['image'],name: product['name'], score: product['score'], description : product['description']}); 
      }
      console.log(x)
    }
    getLeaderboard()
    }, [products,setProducts]);
  // function setDesc() {
  //   fetch("http://127.0.0.1:5001/getItem?place=0", {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(response => response.json()).then(data => {
  //     for(var i = 0; i < data['products'].length; i++) {
  //       const product = data['products'][i]
  //       updateProduct(i,{image:"",name: product['name'], score: product['score'], description : product['description']}); 
  //       getImage(product['name'],i,product);
  //     }
  //   });
  // }
  // async function getImage(imageName,place,value) {
  //   const resp = await fetch("http://127.0.0.1:5001/getImage?name="+imageName, {}).then(response => response.json());
  //   updateProduct(place,{image:resp['image'],score:value["score"],description:value["description"],name:value['name']});
  //   console.log(products)
  // }


  return (
    <div className="h-screen w-screen bg-alt flex flex-col overflow-hidden">
      <Header />



      {popup && (
      <div className="absolute h-full w-full bg-primary bg-opacity-75 rounded p-2 z-20 flex justify-center items-center">
        <div className="flex flex-col relative w-full max-w-lg items-center bg-alt pt-5 rounded-md p-2 max-h-screen overflow-auto">
          <svg 
              onClick={togglePopup} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="red"
              className="absolute top-2 right-2 w-6 h-6 cursor-pointer">

              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
              strokeWidth="1.5"
              stroke="red"
              className="absolute top-2 right-2 w-6 h-6 cursor-pointer">

              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          <h1 className="text-center font-title text-3xl mt-2">Leaderboard!</h1>
          <div className = "flex flex-col bg-gray-300 w-full h-full rounded">
            <div className = "flex flex-row place-content-between w-full my-2 h-1/3 leading-4">
              {products[0] && <LbItem name={products[0]["name"]} ranking={products[0]["score"]} image = {products[0]["image"]} color = "bg-yellow-500"/>}
              {products[1] && <LbItem name={products[1]["name"]} ranking={products[1]["score"]} image = {products[1]["image"]} color = "bg-gray-400"/>}
              {products[2] && <LbItem name={products[2]["name"]} ranking={products[2]["score"]} image = {products[2]["image"]} color = "bg-orange-400"/>}
            </div>
            <div className = "flex flex-row place-content-between w-full my-2 h-1/3 leading-4">
              {products[3] && <LbItem name={products[3]["name"]} ranking={products[3]["score"]} image = {products[3]["image"]}/>}
              {products[4] && <LbItem name={products[4]["name"]} ranking={products[4]["score"]} image = {products[4]["image"]}/>}
              {products[5] && <LbItem name={products[5]["name"]} ranking={products[5]["score"]} image = {products[5]["image"]}/>}
            </div>
            <div className = "flex flex-row place-content-between w-full my-2 h-1/3 leading-4">
              {products[6] && <LbItem name={products[6]["name"]} ranking={products[6]["score"]} image = {products[6]["image"]}/>}
              {products[7] && <LbItem name={products[7]["name"]} ranking={products[7]["score"]} image = {products[7]["image"]}/>}
              {products[8] && <LbItem name={products[8]["name"]} ranking={products[8]["score"]} image = {products[8]["image"]}/>}
            </div>
          </div>
        </div>
      </div>
    )}




    {help && (
      <div className="absolute h-full w-full bg-primary bg-opacity-75 rounded p-2 z-20 flex justify-center items-center">
        <div className="flex flex-col relative w-full max-w-lg items-center bg-alt pt-5 rounded-md p-2 max-h-screen overflow-auto">
          <svg 
              onClick={toggleHelp} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="red"
              className="absolute top-2 right-2 w-6 h-6 cursor-pointer">

              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h1 className="text-center font-title text-3xl mt-2">How to use</h1>  
            <br></br>     
            <p className="text-center font-content text-xl">
              Step 1: Click the "Take A Picture" button on the home page
              <br></br><br></br>
              Step 2: If the website asks for permission to use your camera, click "Allow"
              <br></br><br></br>
              Step 3: Point your camera at the item you want to check
              <br></br><br></br>
              Step 4: Click the button to take a picture
              <br></br><br></br>
              Step 5: Click the green check mark to confirm the picture
              <br></br><br></br>
              Step 6: Wait for the website to process the image
              <br></br><br></br>
              Shortly after, you will recieve information about your item! You can also view the leaderboard tab to see the most sustainable items that users submitted.
            </p> 
          </div>
      </div>
    )}




      <main className="flex flex-col flex-grow">
        <Content />
      </main>
      <Footer toggleHelp={toggleHelp} togglePopup={togglePopup} toggleLeaderboard={toggleLeaderboard} />
    </div>




  );

}

function LbItem( { color = "bg-alt", image, name = "placeholder", ranking = "0/10", isVisible = true } ) {
  return (
    <div className={`${color} w-1/3 h-full mx-2 flex items-center justify-center text-center flex-col duration-500 
    hover:w-full hover:flex-row rounded-md p-2`}>
      <img className = "w-3/4 h-full rounded-md object-cover" src={image} alt="img"/>
      <div className = "flex flex-col text-center p-2">
        <p>{ name }</p>
        <p className = "font-black text-xl">{ ranking }/10</p>
      </div>
    </div>
  );
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

function Footer({ togglePopup, toggleLeaderboard, toggleHelp }) {
  return (

    <div className="bg-third w-screen h-16 flex items-center justify-center z-10">
      <section className="relative flex items-center justify-center w-full h-full">
        <div className = "flex items-center justify-center flex-col">

          {/* The leaderboard Button */}
          <div onClick={toggleLeaderboard} className = "absolute left-5">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-9 translate-x-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
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

        {/* The Help Button */}
        <div onClick={toggleHelp} className = "absolute right-5">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="size-9"
          >
      
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
            <p className="text-sm translate-x-1">Help</p>
        </div>

      </section>
    </div>
  );
}

export default App;
