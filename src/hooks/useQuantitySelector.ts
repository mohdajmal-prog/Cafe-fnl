import { Alert } from "react-native";
import { MenuItem } from "../services/types";
import { useCart } from "../store/CartContext";

export function useQuantitySelector() {
  const { addItem } = useCart();

  const showQuantitySelector = (item: MenuItem) => {
    let quantity = 1;

    const buttons = [
      {
        text: "−",
        onPress: () => {
          if (quantity > 1) quantity--;
        },
      },
      {
        text: "+",
        onPress: () => {
          quantity++;
        },
      },
      {
        text: "Add to Cart",
        onPress: () => {
          addItem(item, quantity);
          Alert.alert("Success", `${item.name} added to cart!`);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ];

    Alert.alert(
      item.name,
      `₹${item.price}\n\nQuantity: ${quantity}`,
      buttons
    );
  };

  return { showQuantitySelector };
}
