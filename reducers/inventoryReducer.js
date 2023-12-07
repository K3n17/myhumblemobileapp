const initialState = {
  inventory: []
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const newProduct = action.payload;
      const existingProductIndex = state.inventory.findIndex(p => p.id === newProduct.id);

      if (existingProductIndex !== -1) {
        const updatedInventory = [...state.inventory];
        updatedInventory[existingProductIndex].quantity += 1;
        return { ...state, inventory: updatedInventory };
      } else {
        return { ...state, inventory: [...state.inventory, { ...newProduct, quantity: 1 }] };
      }
    }
    case 'REMOVE_PRODUCT': {
      const productId = action.payload;
      const existingProductIndex = state.inventory.findIndex(p => p.id === productId);

      if (existingProductIndex !== -1) {
        const updatedInventory = [...state.inventory];
        updatedInventory[existingProductIndex].quantity -= 1;

        if (updatedInventory[existingProductIndex].quantity === 0) {
          updatedInventory.splice(existingProductIndex, 1);
        }
        return { ...state, inventory: updatedInventory };
      }

      return state;
    }
    default:
      return state;
  }
};

export default inventoryReducer;
