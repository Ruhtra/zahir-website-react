import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router-dom";

import './NavBar.css'
import { Anunice, Google, Home, Loja, Menu, Reviews } from "../../assets/Icons/Icons";
import { useEffect, useRef, useState } from "react";
import Images from "../../assets/Images";


export function NavBar() {
    const location = useLocation();
    const [state, setState] = useState(null)

    useEffect(() => {
        if (state == 'open') openCuratain()
        else closeCuratain()
      }, [state]);

      useEffect(() => {
        const curtainElement = curtainRef.current;

        const handleTransitionEnd = () => {
            if (curtainElement.style.transform === 'translateY(-100%)') {
                document.body.removeAttribute('data-scroll-locked');
            }
        };

        curtainElement.addEventListener('transitionend', handleTransitionEnd);
        
        return () => {
            curtainElement.removeEventListener('transitionend', handleTransitionEnd);
        };
    }, []);

    function changeState() {
        if (state == null) {
            setState('open')
        } else {
            if (state == "open") setState("close")
            if (state == "close") setState("open")
        }
    }
    function closeState() {
        if (state == "open") changeState()
    }

    
    const [startY, setStartY] = useState(0);
    const [endY, setEndY] = useState(0);
    const curtainRef = useRef(null);

    const openCuratain = () => {
        document.body.setAttribute('data-scroll-locked', '');
        curtainRef.current.style.transform = `translateY(0)`;
    }
    const closeCuratain = () => {
        curtainRef.current.style.transform = `translateY(-100%)`;
        closeState()
    }

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setEndY(e.touches[0].clientY);
        const moveY = e.touches[0].clientY - startY;

        if (moveY < 0) {
            curtainRef.current.style.transform = `translateY(${moveY}px)`;
        }
    };

    const handleTouchEnd = () => {
        const movePercentage = Math.abs((endY - startY) / window.innerHeight) * 100;
        if (movePercentage < 30) {
            openCuratain()
        } else if (endY < startY) {
            closeCuratain()
        }
    };


    
    return (
        <NavigationMenu.Root  className={`navbar`} orientation="horizontal">
            <div className="nav desktop">
                <div className="logo">
                    <Link to="/">
                        <img src="/images/icon.png" alt="" />
                    </Link>
                </div>
    
                <div className="links-block">
                    <NavigationMenu.List className="links">
                        <NavigationMenu.Item>
                            <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/'}>
                                <Link className="item" to={'/'}>index</Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
        
                        <NavigationMenu.Item className="line" />
                        
                        <NavigationMenu.Item>
                            <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/profiles'}>
                                <Link className="item" to={'/profiles'}>Reviews</Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                        
                        <NavigationMenu.Item className="line" />

                        <NavigationMenu.Item>
                            <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/loja'}>
                                <Link className="item" to={'/loja'}>Loja</Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                        
                        <NavigationMenu.Item className="line" />

                        <NavigationMenu.Item>
                            <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/anuncie'}>
                                <Link className="item" to={'/anuncie'}>Anuncie</Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                    </NavigationMenu.List>
                </div>          

                <div className="login">
                    <div className="btn" style={{display: "none"}}>
                        <Google width={null} height={null} className="icon" />
                        <span className="text"> Login com Google </span>
                    </div>  
                    <div className="user">
                        <div className="message">Olá, Fabrydjene</div>
                        <img width={null} height={null} src={Images.backImageExample} />
                    </div>
                </div>
            </div>
            <div className="nav mobile">
                <div className="logo">
                    <Link to="/" onClick={closeState}>
                        <img src="/images/icon.png" alt="" />
                    </Link>
                </div>

                <div className="botao" onClick={changeState}>
                    <Menu fillColor="orange" className="icon icon-menu" height={'auto'}></Menu>
                </div>
            </div>
            <div 
                id="curtain"
                className={`curtain content`}
                ref={curtainRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <NavigationMenu.List>
                    <NavigationMenu.Item className="item">
                        <Link to={'/'} onClick={closeState}>
                            <Home className="icon icon-home"></Home>
                            <div className="text">Home</div>
                        </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className="item">
                        <Link to={'/profiles'} onClick={closeState}>
                            <Reviews className="icon icon-reviews"></Reviews>
                            <div className="text">Reviews</div>
                        </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className="item">
                        <Link to={'/loja'} onClick={closeState}>
                            <Loja className="icon icon-loja"></Loja>
                            <div className="text">Loja</div>
                        </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className="item">
                        <Link to={'/anuncie'} onClick={closeState}>
                            <Anunice className="icon icon-anuncie"></Anunice>
                            <div className="text">Anuncie</div>
                        </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className="item">
                        <Link to={'/anuncie'} onClick={closeState}>
                            <Anunice className="icon icon-anuncie"></Anunice>
                            <div className="text">Anuncie</div>
                        </Link>
                    </NavigationMenu.Item>
                </NavigationMenu.List>
            </div>
        </NavigationMenu.Root> 
    )
}