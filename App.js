import { NavigationContainer } from "@react-navigation/native";
import { Cart } from "./screens/Cart";
import { Details } from "./screens/Details";
import { Home } from "./screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
// import CartProvider from "./store/context/cart-context";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <>
      {/* <CartProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </CartProvider> */}
    </>
  );
}
