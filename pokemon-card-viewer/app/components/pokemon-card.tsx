import React, { useState, useEffect } from 'react';
import Link from "next/link"
import { PokemonImage } from "./pokemon-image"
import { Heart } from 'lucide-react';

interface PokemonCardProps {
    name: string;
    imageURL: string;
    types: string[];
}

export function PokemonCard({ name, imageURL, types }: PokemonCardProps) {
    const [isFavorite, setIsFavorite] = useState(() => {
        const savedFavorite = localStorage.getItem(`favorite-${name}`);
        return savedFavorite === 'true';
    });

    useEffect(() => {
        localStorage.setItem(`favorite-${name}`, String(isFavorite));
    }, [isFavorite, name]);
    
    const typeColors: {[key: string]: string} = {
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        grass: 'bg-green-500',
        electric: 'bg-yellow-500',
        ice: 'bg-blue-200',
        fighting: 'bg-orange-700',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-700',
        flying: 'bg-indigo-200',
        psychic: 'bg-pink-500',
        bug: 'bg-green-700',
        rock: 'bg-gray-600',
        ghost: 'bg-purple-700',
        dragon: 'bg-indigo-700',
        dark: 'bg-gray-800',
        steel: 'bg-gray-400',
        fairy: 'bg-pink-300'
    };
    
    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        setIsFavorite(!isFavorite);
    };
    
    return (
        <Link
            href={name}
            className="group relative rounded-lg border border-transparent m-3 px-5 py-4 dark:border-gray-500 text-center hover:bg-lightBackground hover:shadow-lg transition-all duration-300"
            key={name + "Card"}
        >
            <button 
                onClick={toggleFavorite} 
                className="absolute top-2 right-2 z-10"
            >
                <Heart 
                    fill={isFavorite ? 'red' : 'none'} 
                    color="red" 
                    className="hover:scale-110 transition-transform"
                />
            </button>
            <h2 className={'text-2xl font-semibold capitalize'}>
                {name}
            </h2>
            <div className="m-4 flex justify-center" style={{ position: "relative", width: '100px', height: '100px'}}>
                <PokemonImage 
                    image={imageURL}
                    name={name}
                />
            </div>
            
            <div className="flex justify-center gap-2">
                {types.map((type) => (
                    <span 
                        key={type} 
                        className={`
                            ${typeColors[type] || 'bg-gray-500'} 
                            text-white px-2 py-1 rounded-md text-xs uppercase
                        `}
                    >
                        {type}
                    </span>
                ))}
            </div>
            {isFavorite && (
                <div className="text-red-500 text-sm mt-2">
                    Favorited!
                </div>
            )}
        </Link>
    )
}