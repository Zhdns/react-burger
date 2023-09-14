import style from './AppHeader.module.css'
import { NavLink, useLocation, Location, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ReactElement, useEffect } from 'react'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { wsConnecting, wsDisconnected } from '../../services/middlewareReducer'
import { TOKEN } from '../../utility/constants'


const AppHeader = (): ReactElement  =>  {

    const location: Location = useLocation();
    const pathname: string = location.pathname
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const connectingToAllOreders = () => {
        dispatch(wsDisconnected())
        dispatch(wsConnecting('wss://norma.nomoreparties.space/orders/all'))
    }

    useEffect(() => {
        if (!pathname.startsWith('/feed') || !pathname.startsWith('/profile/orders/')) {
            dispatch(wsDisconnected())
        }
    }, [pathname, dispatch])

    useEffect (() => {
        if (pathname.startsWith('/feed')) {
            dispatch(wsConnecting('wss://norma.nomoreparties.space/orders/all'))
        }
    }, [pathname, dispatch])

    useEffect(() => {
        if (pathname.startsWith('/profile/orders/')) {
            let token: string | null = localStorage.getItem(TOKEN)
            if (token === null) {
                console.log('localStorege.token is empty = null')
            } else {
                token = token.replace('Bearer ', '')
                const url = `wss://norma.nomoreparties.space/orders?token=${token}`
                dispatch(wsConnecting(url))
            }
        }
    }, [pathname, dispatch])

    return (
        <header className={style.header}>
                <nav className={style.nav}>
                    <NavLink to='/' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks}> 
                    <BurgerIcon type={location.pathname === '/' ? "primary" : "secondary"}/><span className={`text text_type_main-default`}>Конструктор</span> 
                    </NavLink>
                    <NavLink to='/feed' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks} onClick={() => {connectingToAllOreders()}} > 
                    <ListIcon type={location.pathname.startsWith('/feed') ? "primary" : "secondary"}/> <span className={`text text_type_main-default `}>Лента заказов</span> 
                    </NavLink>
                </nav>
                <div className={style.logo} onClick={() =>  navigate('/')}>
                    <Logo/>
                </div>
                <NavLink to='/profile' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks}>
                    <ProfileIcon type={location.pathname === '/' || location.pathname.startsWith('/ingredients/') || location.pathname.startsWith('/feed') ?
                    "secondary" : "primary"}/><span className={ location.pathname === '/' || location.pathname.startsWith('/ingredients/') || location.pathname.startsWith('/feed') ? 
                    `text text_type_main-default ${style.navLinks}` : `text text_type_main-default ${style.navLinksActive}`}>Личный кабинет </span>
                    </NavLink>  
        </header>
    )
}


export default AppHeader