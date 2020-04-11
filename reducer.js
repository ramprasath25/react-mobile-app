import { combineReducers } from "redux";
const INITIAL_STATE = {
    products: [
        {
            _id: '02',
            title: "Niru's Idly/ Dosa Batter",
            image: 'http://niruhomefoods.com/img/latest-products/product-2.png',
            price: 50,
            quantity: '1 Kg',
            selectedQuantity: 0
        }
    ]
}
const ProductReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_CART_ITEM':
            let newState = { products: [] }
            newState['products'] = state.products.map(item => {
                if (item['_id'] == action.payload['_id']) {
                    item['selectedQuantity'] = action.payload['selectedQuantity']
                }
                return item
            });
            return newState;
        case 'PLACE_ORDER':
            alert('Order placed successfully')
            let checkoutState = { products: [] }
            checkoutState['products'] = state.products.map(item => {
                item['selectedQuantity'] = 0
                return item
            });
            return checkoutState;
        default:
            return state
    }
}

export default combineReducers({
    products: ProductReducer
});