import { Alert } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { CartContext } from "../store/context/cart-context";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/redux/cart";

export const Home = ({ navigation }) => {
  const products = [
    // Hard coded products
    {
      id: 1,
      name: "Smartphone",
      price: 699.99,
      description: "A high-end smartphone with cutting-edge features.",
      image:
        "https://img.freepik.com/free-vector/hand-holding-smartphone-mobile-phone-concept-hand-drawn-cartoon-art-illustration_56104-1117.jpg?w=2000",
    },
    {
      id: 2,
      name: "Laptop",
      price: 1299.99,
      description: "A powerful laptop designed for productivity and gaming.",
      image:
        "https://images.all-free-download.com/images/graphiclarge/laptop_183544.jpg",
    },
    {
      id: 3,
      name: "Headphones",
      price: 149.99,
      description:
        "Premium over-ear headphones for an immersive audio experience.",
      image:
        "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?cs=srgb&dl=pexels-sound-on-3394666.jpg&fm=jpg",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 249.99,
      description: "A stylish smartwatch to keep you connected on the go.",
      image:
        "https://img.freepik.com/premium-psd/realistic-smart-watch-mockup_165789-534.jpg",
    },
  ];

  const dispatch = useDispatch();

  // const cartProductsCtx = useContext(CartContext);

  const onGoToCartHandler = () => {
    navigation.navigate("Cart");
  };

  const onGoToDetailsHandler = (product) => {
    navigation.navigate("Details", { product: product });
  };

  const onAddToCartHandler = (product) => {
    Alert.alert("Success", "Are you sure to add this item?", [
      {
        text: "Yes",
        onPress: () => {
          // cartProductsCtx.addItem(product, 1);
          dispatch(addToCart({ product: product }));
        },
      },
      {
        text: "Yes and Go to Cart",
        onPress: () => {
          // cartProductsCtx.addItem(product, 1);
          dispatch(addToCart({ product: product }));
          onGoToCartHandler();
        },
      },
      {
        text: "No",
      }
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
      <View style={styles.productList}>
        {products.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productPrice}>
              $ {product.price.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => onAddToCartHandler(product)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.goToDetailsButton}
              onPress={() => onGoToDetailsHandler(product)}
            >
              <Text style={styles.buttonText}>Go to Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FB",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  goToCartButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 16,
    alignSelf: "center",
  },
  productContainer: {
    width: "48%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: "cover",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333333",
  },
  productPrice: {
    fontSize: 16,
    color: "#008080",
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: "#0077B6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 4,
  },
  goToDetailsButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
