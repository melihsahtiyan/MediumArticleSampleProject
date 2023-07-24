import { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CartContext } from "../store/context/cart-context";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/redux/cart";

export const Cart = ({ navigation }) => {
  // const cartProductsCtx = useContext(CartContext);

  // const [products, setProducts] = useState(cartProductsCtx.cartItems);
  const products = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const [getTotalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      products.length > 0
        ? products.reduce(
            (total, item) => total + item.price,
            0
          )
        : 0
    );
    // setProducts(cartProductsCtx.cartItems);
  }, [products]);

  const onRemoveFromCartHandler = (id) => {
    // cartProductsCtx.removeItem(id);
    dispatch(removeFromCart({ id: id }));
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          {products.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  $ {item.price.toFixed(2)}
                </Text>

                <TouchableOpacity
                  style={styles.removeFromCartButton}
                  onPress={() => onRemoveFromCartHandler(item.id)}
                >
                  <Text style={styles.buttonText}>Remove from cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Text style={styles.totalPriceText}>
            Total Price: ${getTotalPrice.toFixed(2)}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FB",
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  productDetails: {
    flex: 1,
    marginLeft: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#008080",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: "#0077B6",
    padding: 4,
    borderRadius: 4,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  removeFromCartButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
