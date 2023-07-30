import React, { useState, useEffect } from 'react';
import './../src/App';
import './../src/styles.css';

const productsData = [
  { id: 1, name: 'Esmalte Rosa', description: 'Descrição do Produto 1', price: 5.49 , image: './img/rosa.jpg' },
  { id: 2, name: 'Esmalte Azul', description: 'Descrição do Produto 2', price: 5.49 , image: '/img/azul.jpg'},
  { id: 3, name: 'Esmalte Verde', description: 'Descrição do Produto 3', price: 5.49 , image: '/img/verde.jpg'},
  { id: 3, name: 'Esmalte Amarelo', description: 'Descrição do Produto 3', price: 5.49 , image: '/img/amarelo.jpg'},
  { id: 3, name: 'Esmalte Vermelho', description: 'Descrição do Produto 3', price: 5.49 , image: '/img/vermelho.jpg' },
];

const App = () => {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCart(cartItems);
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <div className="container mt-5">
      <h1>Produtos Disponíveis</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card mb-3">
              <img src={product.image} className="card-img-top" alt={product.name} /> 
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text card-price">Preço: R$ {product.price.toFixed(2)}</p>
                <button className="btn btn-primary add-to-cart-button" onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1>Carrinho de Compra</h1>
      <div className="cart">
        {cart.length === 0 ? <p>Carrinho vazio</p> : null}
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <p>{item.name}</p>
            <p>Quantidade: {item.quantity}</p>
            <p>Total: R$ {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        {cart.length > 0 && (
          <div>
        <p>Total da Compra: R$ {getTotalPrice()}</p>
        <button className="btn btn-danger" onClick={handleClearCart}>Limpar Carrinho</button>
      </div>
        )}
    </div>
    </div>
  );
};

export default App;
