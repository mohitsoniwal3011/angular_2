import React from "react";
// import ReactDom  from "react-dom";
import ReactDOM from "react-dom/client";


import  "./index.css";

// function Greeting(){
  //   return (<h1>Hello react, It's mohit this side</h1>); 
  // }
  
  
  // const Greeting =()=> {
    //   return React.createElement('h1', {}, 'hello world');
    // }
    
const title =  'The Psychology of Money' 
const Author = 'Morgan Housel';

const img = 'https://images-eu.ssl-images-amazon.com/images/I/41r6F2LRf8L._SY264_BO1,204,203,200_QL40_FMwebp_.jpg'; 

const BookList = ()=> {
  return (
      <section  className="booklist">
        <Book   job = "developer"/>
        <Book  title = "random title"  number = {45}/>
        <Book/> 
      </section>
  )
}

const Book  = (props)=> {
  return (
  <article  className="book">
    <img src={img} alt="" />
    <h1 >{title}</h1>
    <h4>{Author}</h4>
    <p>{props.job}</p>
    <p>{props.number}</p>
  </article>);
}





const root  = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BookList/>
  </React.StrictMode>
)



// ReactDom.render(<BookList/>, document.getElementById('root'));