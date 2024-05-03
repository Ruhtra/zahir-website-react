import { ChevronUpIcon } from "@radix-ui/react-icons"
import "./BackToTop.css"
import { useEffect, useState } from "react";

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
            <ChevronUpIcon className="arrowIcon" />
        </div>
    );
}