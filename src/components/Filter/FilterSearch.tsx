// SearchInput.tsx
import  { useState } from "react";

interface SearchProps {
    onSearchChange: (search: string) => void;
}

export function FilterSearch ({ onSearchChange }: SearchProps) {
    const [search, setSearch] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        onSearchChange(searchValue); 
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