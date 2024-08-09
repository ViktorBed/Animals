'use client';

import { useState } from 'react';

interface Breed {
    id: string;
    name: string;
}

export default function Header({ searchTerm, setSearchTerm, breeds, onSelectBreed }: { searchTerm: string, setSearchTerm: (value: string) => void, breeds: Breed[], onSelectBreed: (breed: Breed) => void }) {
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowSuggestions(value.length > 0);
    };

    const handleSelect = (breed: Breed) => {
        setSearchTerm(breed.name);
        setShowSuggestions(false);
        onSelectBreed(breed);
    };

    const filteredBreeds = breeds.filter(breed =>
        breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full py-4 bg-black text-gold border-b-4 border-gold mb-8 relative">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold ">Breed Explorer</h1>
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search breeds..."
                        className="p-2 rounded-lg border-2 border-gold text-black"
                    />
                    {showSuggestions && (
                        <ul className="absolute left-0 right-0 bg-white border border-gold mt-1 max-h-60 overflow-y-auto rounded-lg shadow-lg z-10 text-black">
                            {filteredBreeds.map((breed) => (
                                <li
                                    key={breed.id}
                                    onClick={() => handleSelect(breed)}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                >
                                    {breed.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
