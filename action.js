import axios from 'axios';
import { NavigationActions } from 'react-navigation';

export const AddItemCart = (data) => (
    {
        type: 'ADD_CART_ITEM',
        payload: data
    }
)

export const CheckOut = (data) => (dispatch) => {
    let URL = 'http://13.234.34.126:3000/user/checkout'
    fetch(URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: 'PLACE_ORDER',
                payload: data
            })
        })
        .catch(err => console.log(err))
    const navigateAction = NavigationActions.navigate({
        routeName: "home",
        params: {},
        action: NavigationActions.navigate({ routeName: "home" })
    });
    this.props.navigation.dispatch(navigateAction);
}
