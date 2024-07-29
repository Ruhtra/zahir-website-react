import "./BackToTop.css"
import { useEffect, useState } from "react";
import { Arrow, SetaDefault } from "../../assets/Icons/Icons";

export function BackToTop() {
    const [scrolled, setScrolled] = useState(false);

    // Identifica quando o usuário rola 100vh
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight) {
            setScrolled(true);
            } else {
            setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    function handleClick() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Para animação suave
        });
      };
    
    if (scrolled) return (
        <div className={'btnTop'} onClick={handleClick}>
            <Arrow fillColor="red" side="bottom" />
            {/* <ChevronUpIcon className="arrowIcon" /> */}
        </div>
    );
}