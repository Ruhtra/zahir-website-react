import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router-dom";
import * as Dialog from '@radix-ui/react-dialog';

import { Cross1Icon, HomeIcon, VideoIcon, CardStackIcon, GlobeIcon } from "@radix-ui/react-icons";
import './NavBar.css'
import { Menu } from "../../assets/Icons/Icons";

export function NavBar() {
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
                    </NavigationMenu.List>
                </div>            
            </div>
            <div className="nav mobile">
                <div className="logo">
                    <Link to="/">
                        <img src="/images/icon.png" alt="" />
                    </Link>
                </div>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                            {/* <HamburgerMenuIcon color="white" width={'auto'} height={'auto'} className={'HamburguerMenu'} aria-hidden /> */}
                            <Menu fillColor="orange" className="icon icon-menu" height={'auto'}></Menu>
                    </Dialog.Trigger>
                        <Dialog.Overlay className="overlay">
                            <Dialog.Content className="content">
                                <Dialog.Title asChild>
                                    <div className="title">
                                    <h2 className="text">Menu Bar</h2>
                                        <Dialog.Close asChild>
                                            <Cross1Icon color="white" width={'auto'} height={'auto'} className="Cross1Icon" />
                                        </Dialog.Close>
                                    </div>
                                </Dialog.Title>
                                <Dialog.Description>
                                    <NavigationMenu.List className="links">
                                        <NavigationMenu.Item>
                                            <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/'}>
                                                <Dialog.DialogClose asChild>
                                                    <Link className="item" to={'/'}>
                                                            <HomeIcon width={'1em'} height={'auto'} className="Home" color="white" />
                                                            index
                                                    </Link>
                                                </Dialog.DialogClose>
                                            </NavigationMenu.Link>
                                        </NavigationMenu.Item>
                        
                                        <NavigationMenu.Item className="line" />
                                        
                                        <NavigationMenu.Item>
                                            <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/profiles'}>
                                                <Dialog.DialogClose asChild>
                                                    <Link className="item" to={'/profiles'}>
                                                            <VideoIcon width={'1em'} height={'auto'} className="Video" color="white" />
                                                            Reviews
                                                    </Link>
                                                </Dialog.DialogClose>
                                            </NavigationMenu.Link>
                                        </NavigationMenu.Item>
                                        
                                        <NavigationMenu.Item className="line" />


                                        <NavigationMenu.Item>
                                            <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/loja'}>
                                                <Dialog.DialogClose asChild>
                                                    <Link className="item" to={'/loja'}>
                                                            <CardStackIcon width={'1em'} height={'auto'} className="CardStack" color="white" />
                                                            Loja
                                                    </Link>
                                                </Dialog.DialogClose>
                                            </NavigationMenu.Link>
                                        </NavigationMenu.Item>
                                        
                                        <NavigationMenu.Item className="line" />

                                        <NavigationMenu.Item>
                                            <NavigationMenu.Link className="item_link" asChild active={location.pathname === '/anuncie'}>
                                                <Dialog.DialogClose asChild>
                                                    <Link className="item" to={'/anuncie'}>
                                                            <GlobeIcon width={'1em'} height={'auto'} className="Globe" color="white" />
                                                            Anuncie
                                                    </Link>
                                                </Dialog.DialogClose>
                                            </NavigationMenu.Link>
                                        </NavigationMenu.Item>
                                        
                                        <NavigationMenu.Item className="line" />
                                    </NavigationMenu.List>
                                </Dialog.Description>
                            </Dialog.Content>
                        </Dialog.Overlay>
                </Dialog.Root>
            </div>
        </NavigationMenu.Root> 
    )
}





 {
    
    //config
    
    /* <NavigationMenu.Item>
                        <NavigationMenu.Item className="line" />
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