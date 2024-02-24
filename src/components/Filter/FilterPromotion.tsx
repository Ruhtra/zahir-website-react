import { SetURLSearchParams } from "react-router-dom";


interface PromotionProps {
    promotion: boolean;
    onPromotionChange: SetURLSearchParams
}

export function FilterPromotion({ promotion, onPromotionChange }: PromotionProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onPromotionChange((params) => {
            params.set('promotion', e.target.checked ? 'true' : 'false')
            return params
        })
    };

    return (
        <input type="checkbox" checked={promotion} onChange={handleInputChange} />
    )
}