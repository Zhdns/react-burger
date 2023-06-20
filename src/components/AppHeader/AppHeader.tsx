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
        dispatch(wsDisconnected(null))
        dispatch(wsConnecting('wss://norma.nomoreparties.space/orders/all'))
    }

    useEffect(() => {
        if (!pathname.startsWith('/react-burger/feed') || !pathname.startsWith('/react-burger/profile/orders/')) {
            dispatch(wsDisconnected(null))
        }
    }, [pathname, dispatch])

    useEffect (() => {
        if (pathname.startsWith('/react-burger/feed')) {
            dispatch(wsConnecting('wss://norma.nomoreparties.space/orders/all'))
        }
    }, [pathname, dispatch])

    useEffect(() => {
        if (pathname.startsWith('/react-burger/profile/orders/')) {
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
                    <NavLink to='/react-burger/' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks}> 
                    <BurgerIcon type={location.pathname === '/react-burger/' ? "primary" : "secondary"}/><span className={`text text_type_main-default`}>Конструктор</span> 
                    </NavLink>
                    <NavLink to='react-burger/feed' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks} onClick={() => {connectingToAllOreders()}} > 
                    <ListIcon type={location.pathname.startsWith('/react-burger/feed') ? "primary" : "secondary"}/> <span className={`text text_type_main-default `}>Лента заказов</span> 
                    </NavLink>
                </nav>
                <div className={style.logo} onClick={() =>  navigate('/react-burger')}>
                    <Logo/>
                </div>
                <NavLink to='/react-burger/profile' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks}>
                    <ProfileIcon type={location.pathname === '/react-burger/' || location.pathname.startsWith('/react-burger/ingredients/') || location.pathname.startsWith('/react-burger/feed') ?
                    "secondary" : "primary"}/><span className={ location.pathname === '/' || location.pathname.startsWith('/react-burger/ingredients/') || location.pathname.startsWith('/react-burger/feed') ? 
                    `text text_type_main-default ${style.navLinks}` : `text text_type_main-default ${style.navLinksActive}`}>Личный кабинет </span>
                    </NavLink>  
        </header>
    )
}


export default AppHeader