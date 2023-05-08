import { ADD_ITEM, REMOVE_ITEM, RESET_MENU } from "../Types/types";

let initalState = {
  items: [],
  totalAmount: 0,
  itemsAmount: 0,
  cartnotEmpty: true,
};
if (JSON.parse(localStorage.getItem("items"))) {
  initalState = {
    items: JSON.parse(localStorage.getItem("items")),
    totalAmount: JSON.parse(localStorage.getItem("totalAmount")),
    itemsAmount: JSON.parse(localStorage.getItem("itemsAmount")),
    cartnotEmpty: JSON.parse(localStorage.getItem("cartnotEmpty")),
  };
}

function menuReducer(state = initalState, action) {
  switch (action.type) {
    case ADD_ITEM:
      let updatedTotalAmount = state.totalAmount + action.payload.price;
      let updatedItemList;
      let existingCartItem;
      let existingCartItemIndex;

      existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItemList = [...state.items];
        updatedItemList[existingCartItemIndex] = updatedItem;
      } else {
        updatedItemList = state.items.concat(action.payload);
      }
      localStorage.setItem("items", JSON.stringify([...updatedItemList]));
      localStorage.setItem("totalAmount", JSON.stringify(updatedTotalAmount));
      localStorage.setItem(
        "itemsAmount",
        JSON.stringify(state.itemsAmount + 1)
      );
      localStorage.setItem("cartnotEmpty", JSON.stringify(true));

      return {
        ...state,
        items: updatedItemList,
        totalAmount: updatedTotalAmount,
        itemsAmount: state.itemsAmount + 1,
        cartnotEmpty: true,
      };
    case REMOVE_ITEM:
      let updatedTotalAmountR = state.totalAmount - action.payload.price;
      let existingCartItemIndexR = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let existingCartItemR = state.items[existingCartItemIndexR];

      let updatedItemListR;
      if (existingCartItemR.amount > 1) {
        const updatedItemR = {
          ...existingCartItemR,
          amount: existingCartItemR.amount - 1,
        };
        updatedItemListR = [...state.items];
        updatedItemListR[existingCartItemIndexR] = updatedItemR;
      } else {
        updatedItemListR = state.items.filter((item) => {
          return item.id !== action.payload.id;
        });
      }

      let newCartnotEmpty = true;
      if (updatedTotalAmountR === 0) {
        newCartnotEmpty = false;
      }
      localStorage.setItem("items", JSON.stringify([...updatedItemListR]));
      localStorage.setItem("totalAmount", JSON.stringify(updatedTotalAmountR));
      localStorage.setItem(
        "itemsAmount",
        JSON.stringify(state.itemsAmount - 1)
      );
      localStorage.setItem("cartnotEmpty", JSON.stringify(newCartnotEmpty));

      return {
        ...state,
        items: updatedItemListR,
        totalAmount: updatedTotalAmountR,
        itemsAmount: state.itemsAmount - 1,
        cartnotEmpty: newCartnotEmpty,
      };

    case RESET_MENU:
      localStorage.removeItem("items");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("itemsAmount");
      localStorage.removeItem("cartnotEmpty");
      return {
        ...state,
        items: [],
        totalAmount: 0,
        itemsAmount: 0,
        cartnotEmpty: true,
      };
    default:
      return state;
  }
}

export default menuReducer;
