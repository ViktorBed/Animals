'use client';

import Link from 'next/link';
import { fetchCatBreeds, fetchDogBreeds } from "@/utils/api";
import { useState, useEffect } from 'react';
import Header from '@/Components/Header';

interface Breed {
    id: string;
    name: string;
    image?: {
        url: string;
    };
}

export default function Home() {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const catData = await fetchCatBreeds();
            const dogData = await fetchDogBreeds();
            const combinedBreeds = [...catData, ...dogData].sort(() => 0.5 - Math.random());
            setBreeds(combinedBreeds);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredBreeds = selectedBreed
        ? [selectedBreed]
        : breeds.filter(breed =>
            breed.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const loadMoreBreeds = () => {
        if (page * 10 >= filteredBreeds.length) return;
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
                loadMoreBreeds();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, filteredBreeds]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div
                className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                breeds={breeds}
                onSelectBreed={(breed) => {
                    setSelectedBreed(breed);
                    setPage(1);  // Скидаємо сторінку на першу
                }}
            />
            <h1 className="text-4xl font-bold mb-8 text-center">Random Cat and Dog Breeds</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBreeds.slice(0, page * 10).map((breed: Breed) => (
                    <Link href={`/breed/${breed.id}`} key={breed.id}>
                        <div
                            className="relative border-4 border-gold p-4 rounded-lg shadow-md flex flex-col items-center bg-black cursor-pointer"
                        >
                            {breed.image?.url ? (
                                <img
                                    src={breed.image.url}
                                    alt={breed.name}
                                    className="w-full h-40 object-cover rounded-t-lg border-b-4 border-gold"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-lg border-b-4 border-gold">
                                    <span>No Image Available</span>
                                </div>
                            )}
                            <h2 className="text-2xl font-semibold mt-2 text-center text-gold">{breed.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
