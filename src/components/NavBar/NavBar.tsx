import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router-dom";

import './NavBar.css'
import { Anunice, Google, Home, Loja, Menu, Reviews } from "../../assets/Icons/Icons";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Skeleton } from "@radix-ui/themes";
import { AuthContext } from "../../Contexts/AuthContext";


export function NavBar() {
    const location = useLocation();
    const [state, setState] = useState(null)
    const { dataUser, statusUser, getGoogleOAuthURL } = useContext(AuthContext);

    const changeState = useCallback(() => {
        if (state == null) {
            setState('open')
        } else {
            if (state == "open") setState("close")
            if (state == "close") setState("open")
        }
    }, [state])


    const closeState = useCallback(() => {
        if (state == "open") changeState()
    }, [state, changeState])

    const openCuratain = useCallback(() => {
        document.body.setAttribute('data-scroll-locked', '');
        curtainRef.current.style.transform = `translateY(0)`;
    }, [])

    const closeCuratain = useCallback(() => {
        curtainRef.current.style.transform = `translateY(-100%)`;
        closeState()
    }, [closeState])

    useEffect(() => {
        if (state == 'open') openCuratain()
        else closeCuratain()
    }, [state, closeCuratain, openCuratain]);

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


    const [startY, setStartY] = useState(0);
    const [endY, setEndY] = useState(0);
    const curtainRef = useRef(null);


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
        if (movePercentage < 15) {
            openCuratain()
        } else if (endY < startY) {
            closeCuratain()
        }
    };



    return (
        <NavigationMenu.Root className={`navbar`} orientation="horizontal">
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
                                <Link className="item" to={'/'}>Home</Link>
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
                    <Skeleton loading={statusUser == "loading"}>
                        {
                            statusUser != "loading" && statusUser == "success" && dataUser != null
                                ? <div className="user">
                                    <div className="message">Olá, {dataUser?.name}</div>
                                    <img width={null} height={null} src={dataUser?.picture} />
                                </div>
                                : <Link to={getGoogleOAuthURL()} className="btn">
                                    <Google width={null} height={null} className="icon" />
                                    <span className="text"> Login com Google </span>
                                </Link>
                        }
                    </Skeleton>
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
                <NavigationMenu.List className="links">
                    <NavigationMenu.Item className="item link">
                        <Link to={'/'} onClick={closeState}>
                            <Home className="icon icon-home"></Home>
                            <div className="text">Home</div>
                        </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className="item link">
                        <Link to={'/profiles'} onClick={closeState}>
                            <Reviews className="icon icon-reviews"></Reviews>
                            <div className="text">Reviews</div>
                        </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className="item link">
                        <Link to={'/loja'} onClick={closeState}>
                            <Loja className="icon icon-loja"></Loja>
                            <div className="text">Loja</div>
                        </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className="item link">
                        <Link to={'/anuncie'} onClick={closeState}>
                            <Anunice className="icon icon-anuncie"></Anunice>
                            <div className="text">Anuncie</div>
                        </Link>
                    </NavigationMenu.Item>

                </NavigationMenu.List>
                <NavigationMenu.List className="bottomlinks">
                    <NavigationMenu.Item className="item loginbtn">
                        <div className="login">
                            <Skeleton loading={statusUser == "loading"}>
                                {
                                    statusUser != "loading" && statusUser == "success" && dataUser != null
                                        ? <div className="user">
                                            <div className="message">Olá, {dataUser?.name}</div>
                                            <img width={null} height={null} src={dataUser?.picture} />
                                        </div>
                                        : <Link to={getGoogleOAuthURL()} className="btn">
                                            <Google width={null} height={null} className="icon" />
                                            <span className="text"> Login com Google </span>
                                        </Link>
                                }
                            </Skeleton>
                        </div>
                    </NavigationMenu.Item>
                </NavigationMenu.List>
            </div>
        </NavigationMenu.Root>
    )
}