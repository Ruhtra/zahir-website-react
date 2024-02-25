import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router-dom";
// import { CaretDownIcon } from "@radix-ui/react-icons";

import './my.css'

export function MyNavigationMenu() {

    const location = useLocation();

    return (
     <NavigationMenu.Root className="navbar" orientation="horizontal">
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
                    
                    <NavigationMenu.Item className="line" />
                    
                    {/* <NavigationMenu.Item>
                        <NavigationMenu.Trigger asChild>
                            <NavigationMenu.Link className="item_link" asChild active={
                                    location.pathname === '/config/profiles' ||
                                    location.pathname === '/config/homePage'
                                }
                            >
                                <Link className="item" to={'#'}>
                                    Config  <CaretDownIcon className="CaretDown" aria-hidden />
                                </Link>
                            </NavigationMenu.Link>
                                
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="contesnt">
                            <NavigationMenu.Sub orientation="vertical">
                                <NavigationMenu.List>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/config/profiles'}>
                                            <Link className="item" to={'/config/profiles'}>Profiles</Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/config/homePage'}>
                                            <Link className="item" to={'/config/homePage'}>HomePage</Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                </NavigationMenu.List>
                                <NavigationMenu.Viewport />
                            </NavigationMenu.Sub>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item> */}

                </NavigationMenu.List>
            </div>
        </div>
    </NavigationMenu.Root> 
    )
}