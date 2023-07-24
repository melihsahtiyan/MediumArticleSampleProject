import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { CartContext } from "../store/context/cart-context";
import { useContext } from "react";
import { useDispatch } from "react-redux";

export const Details = ({ route, navigation }) => {
  const product = route.params.product;

  const dispatch = useDispatch();

  // const cartProductsCtx = useContext(CartContext);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const onGoToCartHandler = () => {
    navigation.navigate("Cart");
  };

  const onAddToCartHandler = () => {
    Alert.alert("Success", "Product added to cart", [
      {
        text: "OK",
        onPress: () => {
          // cartProductsCtx.addItem(product, 1);
          dispatch(addToCart(product));
        },
      },
      {
        text: "Go to Cart",
        onPress: () => {
          onGoToCartHandler();
          // cartProductsCtx.addItem(product, 1);
          dispatch(addToCart(product));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goToCartButton}
        onPress={onGoToCartHandler}
      >
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{product.name}</Text>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>$ {product.price}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={onAddToCartHandler}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  goToCartButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008080",
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: "#0077B6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
