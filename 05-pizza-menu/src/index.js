import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  // const pizzasNum = [];
  const pizzaslen = pizzaData.length;
  const pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {pizzaslen > 0 ? (
        <>
          <p>
            we have all kinds of pizzas. spinaci pizza, butter puff pizzas and
            other special pizzas are avaliable like tikka boti shahi daal and
            paner boti
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} />
            ))}
          </ul>
        </>
      ) : (
        <p>We are still working on our menu please come back later:</p>
      )}

      {/* <Pizza
        name="Pizza Salamino"
        ingredients="Tomato, mozarella, and pepperoni"
        price={15}
        photoName="pizzas/salamino.jpg"
      /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <div className={`${pizzaObj.soldOut ? "pizza sold-out" : "pizza"}`}>
      <img src={pizzaObj.photoName} alt="img not found" />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </div>
  );
}
function Footer() {
  const date = new Date().getHours();
  const openHour = 12;
  const closingHour = 23;
  const isOpen = date > openHour && date < closingHour;
  console.log(isOpen);

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closingHour={closingHour} />
      ) : (
        <p>
          We are Happy to welcome you between {openHour}:00 and {closingHour}
          :00
        </p>
      )}
    </footer>
  );
  // return React.createElement("Footer", null, "we are currently open!");
}

function Order(props) {
  return (
    <div className="order">
      <p>We are open until {props.closingHour % 12}pm</p>
      <button className="btn">Order</button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//Before React 18
// React.render(<App />);
