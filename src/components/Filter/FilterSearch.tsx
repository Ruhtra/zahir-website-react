import { SetURLSearchParams } from "react-router-dom";

interface SearchProps {
    search: string | null;
    onSearchChange: SetURLSearchParams;
}

export function FilterSearch ({ search, onSearchChange }: SearchProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        
        onSearchChange((params) => {
            params.set('search', searchValue)
            return params
        }); 
    };

    return (
        <input
            type="search"
            value={search}
            onChange={handleInputChange}
            placeholder="Search..."
        />
    );
}