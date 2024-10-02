import React, { useState, memo, useEffect } from 'react';
import "./App.css";
function timing() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}:${seconds}`;
  return currentTime;
}

// Call the function to save the current time


function App ()  {
  const products = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
  ];
const [count, setCount]=useState(0);


// });
if(count===0){
  localStorage.setItem('count',0);
}

const [inStockOnly,setInStockOnly]=useState(false);
const [searchText,setSearchText]=useState(()=>{
  return localStorage.getItem('searchText') ||'';
});
useEffect(()=>{

    setCount(count+1);
    localStorage.setItem('count',count);
  
  //else{
  //   localStorage.setItem('count',count);
  // }
},[searchText])
const updateStorage=()=>{
  localStorage.setItem('searchText',searchText);

  
}
  return (
    <>
      <Search 
      searchText={searchText}
      onChange={updateStorage()}
      inStockOnly={inStockOnly}
      setSearchText={setSearchText}
      inStockOnlyChange={setInStockOnly}
      />
      <List lis={products}
      searchText={searchText}
      inStockOnly={inStockOnly} />
    </>
  );
};

function Search ({searchText, inStockOnly, setSearchText, inStockOnlyChange}){ 
  return (
  <div>
    <h2>Fruits & Vegetables</h2>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={searchText}
      onChange={(e)=>setSearchText(e.target.value)}
      placeholder="Search..."
    />
    <label>
        <input 
          type="checkbox"
          checked={inStockOnly}
          onChange={(e)=>inStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
      <hr />
  </div>
);
}

function List({ lis, searchText, inStockOnly }) {
  const filteredList = lis.filter((prod) =>
    prod.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ul>
      {filteredList.map((item) => (
        (inStockOnly && !item.stocked) ? null :
        <Item key={item.name} item={item} />
      ))}
    </ul>
  );
}

function Item(props) {
  return (
    <li>
      <span>
        {props.item.stocked ? <span>&#9989;</span> : <span>&#10060;</span>}
      </span>
      <span>{props.item.name}   </span>
      <span>{props.item.price}   </span>
      <span>{props.item.category}</span>
    </li>
  );
}
localStorage.setItem('time',timing());
export default App;
