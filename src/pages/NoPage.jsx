import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux'
import { wsConnecting, wsDisconnected } from '../services/middlewareReducer'


const NoPage = () => {
    const dispatch = useDispatch()

    const connect = () => {
        dispatch(wsConnecting('wss://norma.nomoreparties.space/orders/all'));
    }
    const disconnect = () => {
        dispatch(wsDisconnected('wss://norma.nomoreparties.space/orders/all'));
    }

    return (
        <div>
            <button style={{margin: "300px 700px 30px 700px"}} onClick={() => {connect()}}>
            <h1 className="text text_type_main-large">CONNECT</h1>
        </button>
        <button style={{margin: "300px 700px"}} onClick={() => {disconnect()}}>
            <h1 className="text text_type_main-large">DISCONNECT</h1>
        </button>
        </div>
    ) 
}

export default NoPage