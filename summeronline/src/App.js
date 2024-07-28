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

document.getElementById('loginButton').addEventListener('click', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (response.ok) {
      document.getElementById('result').textContent = result.message;
  } else {
      document.getElementById('result').textContent = result.error;
  }
});

export default App;
