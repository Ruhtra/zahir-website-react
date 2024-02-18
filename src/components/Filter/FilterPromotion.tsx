// SearchInput.tsx
import  { useState } from "react";

interface PromotionProps {
    onPromotionChange: (promotion: boolean) => void;
}

export function FilterPromotion({ onPromotionChange }: PromotionProps) {
    const [promotion, setPromotion] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromotion(e.target.checked)
        onPromotionChange(e.target.checked); 
    };

    return (
        <input type="checkbox" checked={promotion} onChange={handleInputChange} />
    )
}