import React, {useState} from "react";
import Header from "../../Components/header/Header";
import News from "../../Components/news/News";
import ProductList from "../../Components/ProductList/ProductList";
import { Drinks } from "../Drinks/Drinks";
import { useScrollPosition } from "../../Components/Hooks/useScrollPosition";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Pizza } from "../Pizza/Pizza";
import Sides from '../Sides/Sides'
import Dessert from '../Dessert/Dessert'
import Checkout from "../Checkout/Checkout";

import classes from './Index.module.css'
import { SideMenu } from "../../Components/SideMenu/SideMenu";

import { CartCount } from "../../Helper/Context";

export const Index = () => {


    const scrollPosition = useScrollPosition()
    const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)
    const showMenuBtn = () => {
        setIsOpenSideMenu(isOpenSideMenu => !isOpenSideMenu)
        if(isOpenSideMenu === false) {
            console.log('openMenu is true')
        } else {
            console.log('openMenu is false')
        };
    };

    const [navBarActive, setNavBarActive] = useState('#')

    
    const [isItemsCount, setIsItemsCount] = useState(1)

    const [cartCount, setCartCount] = useState(0)

    return(
        <div>
            <Header/>
            <div className={classes.menu}>
            <CartCount.Provider value={{cartCount, setCartCount}}></CartCount.Provider>
                
                    <Router>
                        <div className={classes.navBarBlock}>
                            <div className={scrollPosition > 50 ? classes.sticky : ''}>
                                <nav className={classes.navBar}>
                                        <div className={classes.barLinks}>
                                            <Link onClick={() => setNavBarActive('index')} to='/'>
                                                <div className={classes.logo}>Domino's Pizza</div>
                                            </Link>
                                            <div className={classes.links}>
                                                <Link onClick={() => setNavBarActive('pizza')} 
                                                    className={navBarActive === 'pizza' ? classes.linkActive : classes.link} to='/  ' >Pizza</Link>
                                                <Link onClick={() => setNavBarActive('drinks')} 
                                                    className={navBarActive === 'drinks' ? classes.linkActive : classes.link} to='/Drinks' >Drinks</Link>
                                                <Link onClick={() => setNavBarActive('sides')} 
                                                    className={navBarActive === 'sides' ? classes.linkActive : classes.link} to='/Sides' >Sides</Link>
                                                <Link onClick={() => setNavBarActive('dessert')}
                                                    className={navBarActive === 'dessert' ? classes.linkActive : classes.link} to='/Dessert' >Dessert</Link>
                                            </div>
                                            <Link className={classes.checkoutBlockLink} to='/Checkout'>
                                                <div className={isItemsCount === 0 ? classes.checkoutBlock : classes.checkoutBlockActive}>
                                                    <div className={classes.checkout}>
                                                        <div className={classes.count}>
                                                                {isItemsCount}
                                                        </div>
                                                        <i style={{fontSize: '14px'}} className="fa-solid fa-cart-shopping"></i>
                                                    </div>
                                                    {isItemsCount === 0 ? 
                                                            null
                                                        :
                                                            <div className={classes.price}>295.00 uah</div>
                                                    }

                                                    <div className={classes.btnBuy}>Checkout</div>
                                                </div>
                                            </Link>
                                        </div>
                                       
                                        <div onClick={showMenuBtn} className={classes.sideBar}>
                                            {
                                                isOpenSideMenu ?
                                                    <i class="fa-solid fa-xmark"></i>
                                                    :
                                                    <i className="fa-solid fa-bars"></i>

                                            }
                                            <SideMenu/>
                                        </div>
                                        
                                </nav>
                            </div>

                        </div>
                        <Routes>
                            <Route path="/" element={<Pizza 
                            navBarActive={navBarActive} setNavBarActive={setNavBarActive}/>}/>
                            <Route path="/Drinks" element={<Drinks/>}/>
                            <Route path="/Sides" element={<Sides/>}/>
                            <Route path="/Dessert" element={<Dessert/>}/>

                            <Route path="/Checkout" element={<Checkout/>}/>
                        </Routes>   
                    </Router>
                
                
            </div>
           
            <SideMenu isOpenSideMenu={isOpenSideMenu}/>
               
        </div>
        
    )
}