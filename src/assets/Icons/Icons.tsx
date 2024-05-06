import Anunice from './Anuncie.svg?react';
import ArrowIcon from './Arrow.svg?react';
import Estrela from './Estrela.svg?react';
import Filtro from './Filtro.svg?react';
import Home from './Home.svg?react';
import Instagram from './Instagram.svg?react';
import Loja from './Loja.svg?react';
import Lupa from './Lupa.svg?react';
import Menu from './Menu.svg?react';
import Promocao from './Promocao.svg?react';
import Reviews from './Reviews.svg?react';
import SetaDefault from './SetaDefault.svg?react';
import SetaArco from './SetaArco.svg?react';
import Tiktok from './Tiktok.svg?react';
import Youtube from './Youtube.svg?react';




interface ArrowProps {
    fillColor: "purple" | "orange";
    // Outras props que você queira definir...
}

function Arrow({ fillColor, ...props }: ArrowProps) {
    if (fillColor == "purple")
        return <ArrowIcon fill={'#6b45ca'} {...props}></ArrowIcon>
    else if (fillColor == "orange")
        return <ArrowIcon fill={'#fbb93e'} {...props}></ArrowIcon>
}
export {
    Anunice,
    Arrow,
    Estrela,
    Filtro,
    Home,
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
