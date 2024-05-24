import Anunice from './Anuncie.svg?react';
import ArrowIcon from './Arrow.svg?react';
import Estrela from './Estrela.svg?react';
import Filtro from './Filtro.svg?react';
import Home from './Home.svg?react';
import Google from './Google.svg?react'
import Instagram from './Instagram.svg?react';
import Loja from './Loja.svg?react';
import Lupa from './Lupa.svg?react';
import MenuIcon from './Menu.svg?react';
import Promocao from './Promocao.svg?react';
import Reviews from './Reviews.svg?react';
import SetaDefault from './SetaDefault.svg?react';
import SetaArco from './SetaArco.svg?react';
import Tiktok from './Tiktok.svg?react';
import Youtube from './Youtube.svg?react';




interface ArrowProps {
    fillColor: "purple" | "orange";
    side: "left" | "rigth" | "top" | "bottom"
    [key: string]: any
}

function Arrow({ fillColor, side, ...props }: ArrowProps) {
    var fill = "";
    var rotate = "";

    if (fillColor == "purple") fill ="#6b45ca"
    else if (fillColor == "orange") fill ="#fbb93e"


    switch (side) {
        case "left" : rotate = "180deg"; break
        case "top" : rotate = "90deg"; break
        case "rigth" :  rotate = "0deg"; break
        case "bottom" : rotate = "270deg"; break
    }

    return <ArrowIcon fill={fill} style={{rotate: rotate}}  {...props}></ArrowIcon>
}

interface MenuProps {
    fillColor: "grey" | "orange";
    [key: string]: any
}
function Menu({ fillColor, ...props }: MenuProps) {
    var fill = "";

    if (fillColor == "grey") fill ="rgba(255, 255, 255, .4)"
    else if (fillColor == "orange") fill ="#fbb93e"

    return <MenuIcon fill={fill}  {...props}></MenuIcon>
}
export {
    Anunice,
    Arrow,
    Estrela,
    Filtro,
    Home,
    Google,
    Instagram,
    Loja,
    Lupa,
    Menu,
    Promocao,
    Reviews,
    SetaDefault,
    SetaArco,
    Tiktok,
    Youtube
}
