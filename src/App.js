import React, { useEffect, useState } from 'react';
import Recipes from './Recipes'
import './App.css';


function App() {

const APP_ID = "214095db";
const APP_KEY = "735d8c71440b8ddc59de7c77f2e28a39"
  
const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState("chicken");

useEffect(() => {
  getRecipes();
}, [query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
}


const updateSearch = (e) => {
   setSearch(e.target.value)
}

const getSearch = (e) => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  })
}

const __DEV__ = document.domain === 'localhost';

async function displayRazorpay() {
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"

  );
  if (!res) {
    alert("its failed to load");
    return;
  }
  const data = await fetch("http://localhost:5000/razorpay", {method: 'POST'}).then((t) => t.json())
  
  if(!data) {
    alert("Server error");
    return;
  }
 

 const options = {
   key: __DEV__ ? "rzp_test_iApOY0MJgo2qc4" : 'PRODUCTION_KEY',
   amount: data.amount.toString(),
   currency: data.currency,
   name: "Laxmi Menon",
   description: "Test Transaction",
   order_id: data.id,
   handler: function (response) {
    alert(response.razorpay_payment_id)
    alert(response.razorpay_order_id)
    alert(response.razorpay_signature)
  },
   prefill: {
     name: "Soumya Dev",
     email: "laxmimenon18@gmail.com",
     contact: "8789001918",
    },
    notes: {
      address: "Cooperate office",
    },
    theme: {
      color: "#61dafb"
    },
 };
 const paymentObject = new window.Razorpay(options);
 paymentObject.open();

}

return (
    <div className="App">
     <form onSubmit={getSearch} className="search-form" > 
       <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
       <button className="search-button" type="submit">
         Search
       </button>
       <br/>
     </form>
     <button className="search-button1" data-payment_button_id="pl_H8Ze0yFDab6L8n" type="submit" onClick={displayRazorpay}>
       Buy me!!
      </button>
     <div className="recipes">
     {recipes.map(recipe => (
       <Recipes key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
     ))};
     </div>
     <div>
    
     </div>
    
    </div>
  );
}

export default App;
