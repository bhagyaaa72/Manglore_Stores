import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get the logged-in user
  const userId = user?._id;
  const storageKey = userId ? `cart_${userId}` : "guest_cart"; // Unique key per user or guest

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Update cart on user change (e.g., login/logout)
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    setCartItems(stored ? JSON.parse(stored) : []);
  }, [storageKey]);

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey]);


  // const addToCart = (product) => {
  //   const formattedImage = product.image?.includes("http")
  //     ? product.image
  //     // : `http://localhost:5000/${product.image.replace(/\\/g, "/")}`;
  //     : `http://localhost:5000/${product.image.replace(/^Backend[\\/]/, "").replace(/\\/g, "/")}`;

  //   const exists = cartItems.find((item) => item._id === product._id);

  //   if (exists) {
  //     setCartItems((prev) =>
  //       prev.map((item) =>
  //         item._id === product._id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     );
  //     toast.info('Quantity updated in cart', { toastId: `update-${product._id}` });
  //   } else {
  //     setCartItems((prev) => [
  //       ...prev,
  //       {
  //         ...product,
  //         image: formattedImage,
  //         quantity: 1,
  //         weight: product.weight || 1,   //  ensures weight is never undefined
  //         unit: product.unit || "unit"   //  set valid default (like "g", "kg", etc.)
  //       }
  //     ]);
  //     toast.success('Added to cart', { toastId: `add-${product._id}` });
  //   }
  // };



  // const changeQuantity = (id, newQty) => {
  //   if (newQty < 1) {
  //     setCartItems((prev) => prev.filter((item) => item._id !== id));
  //     toast.warn('Removed from cart', { toastId: `remove-${id}` });
  //   } else {
  //     setCartItems((prev) =>
  //       prev.map((item) =>
  //         item._id === id ? { ...item, quantity: newQty } : item
  //       )
  //     );
  //     toast.info('Cart quantity changed', { toastId: `change-${id}` });
  //   }
  // };
//   const addToCart = (product) => {
//   const formattedImage = product.image?.includes("http")
//     ? product.image
//     : `http://localhost:5000/${product.image.replace(/^Backend[\\/]/, "").replace(/\\/g, "/")}`;

//   const exists = cartItems.find((item) => item._id === product._id);

//   if (exists) {
//     if (exists.quantity >= product.stockquantity) {
//       toast.error('Cannot add more. Stock limit reached.', { toastId: `stock-limit-${product._id}` });
//       return;
//     }

//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === product._id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//     toast.info('Quantity updated in cart', { toastId: `update-${product._id}` });
//   } else {
//     if (product.stockquantity <= 0) {
//       toast.error('Out of stock', { toastId: `out-of-stock-${product._id}` });
//       return;
//     }

//     setCartItems((prev) => [
//       ...prev,
//       {
//         ...product,
//         image: formattedImage,
//         quantity: 1,
//         weight: product.weight || 1,
//         unit: product.unit || "unit"
//       }
//     ]);
//     toast.success('Added to cart', { toastId: `add-${product._id}` });
//   }
// };
// const changeQuantity = (id, newQty) => {
//   const item = cartItems.find((item) => item._id === id);
//   if (!item) return;

//   if (newQty < 1) {
//     setCartItems((prev) => prev.filter((item) => item._id !== id));
//     toast.warn('Removed from cart', { toastId: `remove-${id}` });
//   } else if (newQty > item.stockquantity) {
//     toast.error(`Cannot set quantity more than stock (${item.stockquantity})`, {
//       toastId: `exceed-stock-${id}`
//     });
//   } else {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id ? { ...item, quantity: newQty } : item
//       )
//     );
//     toast.info('Cart quantity changed', { toastId: `change-${id}` });
//   }
// };
const addToCart = (product) => {
  const formattedImage = product.image?.includes("http")
    ? product.image
    : `http://localhost:5000/${product.image.replace(/^Backend[\\/]/, "").replace(/\\/g, "/")}`;

  const exists = cartItems.find((item) => item._id === product._id);

  if (exists) {
    // Check if total weight with new quantity would exceed stock
    const totalWeight = (exists.quantity + 1) * (product.weight || 1);
    if (totalWeight > product.stockquantity) {
      toast.error('Cannot add more. Stock limit reached.', { toastId: `stock-limit-${product._id}` });
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    toast.info('Quantity updated in cart', { toastId: `update-${product._id}` });
  } else {
    if (product.stockquantity < (product.weight || 1)) {
      toast.error('Out of stock', { toastId: `out-of-stock-${product._id}` });
      return;
    }

    setCartItems((prev) => [
      ...prev,
      {
        ...product,
        image: formattedImage,
        quantity: 1,
        weight: product.weight || 1,
        unit: product.unit || "unit"
      }
    ]);
    toast.success('Added to cart', { toastId: `add-${product._id}` });
  }
};

const changeQuantity = (id, newQty) => {
  const item = cartItems.find((item) => item._id === id);
  if (!item) return;

  const totalWeight = newQty * (item.weight || 1);

  if (newQty < 1) {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    toast.warn('Removed from cart', { toastId: `remove-${id}` });
  } else if (totalWeight > item.stockquantity) {
    toast.error(`Cannot set quantity more than stock (${item.stockquantity} ${item.unit})`, {
      toastId: `exceed-stock-${id}`
    });
  } else {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    );
    toast.info('Cart quantity changed', { toastId: `change-${id}` });
  }
};


  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    toast.warn('Removed from cart', { toastId: `remove-${id}` });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.error('Cart cleared', { toastId: 'clear-cart' });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
