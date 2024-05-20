import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router-dom";

import './NavBar.css'
import { Anunice, Home, Loja, Menu, Reviews } from "../../assets/Icons/Icons";
import { useEffect, useState } from "react";


export function NavBar() {
    const location = useLocation();
    const [state, setState] = useState(null)

    useEffect(() => {
        // Adicionando o atributo ao elemento body
        if (state == 'open') document.body.setAttribute('data-scroll-locked', '');
        else  document.body.removeAttribute('data-scroll-locked');

        // Função de limpeza para remover o atributo quando o componente for desmontado
        return () => {
          document.body.removeAttribute('data-scroll-locked');
        };
      }, [state]); // [] como segundo argumento garante que o efeito só é executado uma vez
    

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
    
    return (
        <NavigationMenu.Root  className={`${state} navbar`} orientation="horizontal">
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
            <div className={`${state} content`}>
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
                </NavigationMenu.List>
            </div>
        </NavigationMenu.Root> 
    )
}