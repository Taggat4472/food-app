import React from 'react';
import classes from './cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { removeProduct } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Utilise la fonction reduce pour calculer le prix total de manière plus concise
  const totalPrice = products.reduce((acc, product) => acc + product.quantity * product.price, 0);

  const handleRemoveProduct = (id) => {
    // Utilise directement dispatch(removeProduct(id)) pour simplifier
    dispatch(removeProduct(id));
  };

  const handleOrder = () => {
    if (products.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className={classes.product}>
                <div onClick={() => handleRemoveProduct(product._id)} className={classes.closeBtn}>
                  <AiOutlineClose />
                </div>
                <img src={`http://localhost:5000/images/${product.img}`} className={classes.img} alt={product.title} />
                <div className={classes.productData}>
                  <h3 className={classes.title}>{product.title}</h3>
                  <div className={classes.productAndQuantity}>
                    <span className={classes.quantity}>{product.quantity} x </span>
                    <span className={classes.price}>
                      <span>$</span>
                      {product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className={classes.noProducts}>Aucun produit dans le panier. Faites du shopping !</h1>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.totalProductMsg}>Total des produits : {products.length}</div>
          <div className={classes.subtotalCheckoutBtns}>
            <span className={classes.subtotal}>Sous-total : ${totalPrice}</span>
            <span onClick={handleOrder} disabled={products.length === 0} className={classes.orderNowBtn}>
              Commander maintenant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
