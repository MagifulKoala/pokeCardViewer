"use client"
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PokemonCard } from "./pokemon-card";

interface Pokemon {
  name: string;
  url: string;
  imageUrl?: string;
  types?: string[];
}

interface PokemonGridProps {
  pokemonList: Pokemon[];
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [enhancedPokemonList, setEnhancedPokemonList] = useState<Pokemon[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const pokemonWithDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
          try {
            const response = await fetch(pokemon.url);
            const pokemonDetails = await response.json();
            
            const types = pokemonDetails.types.map((typeInfo: any) => typeInfo.type.name);

            return {
              ...pokemon,
              imageUrl: pokemonDetails.sprites.front_default,
              types: types
            };
          } catch (error) {
            console.error(`Error fetching details for ${pokemon.name}:`, error);
            return pokemon;
          }
        })
      );

      setEnhancedPokemonList(pokemonWithDetails);

      const uniqueTypes = Array.from(
        new Set(
          pokemonWithDetails
            .flatMap(pokemon => pokemon.types || [])
            .sort()
        )
      );
      setAvailableTypes(uniqueTypes);
    };

    fetchPokemonDetails();
  }, [pokemonList]);

  const filterPokemon = (pokemonList: Pokemon[]) => {
    return pokemonList.filter(
      (pokemon) => 
        pokemon.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedType === "" || 
         (pokemon.types || []).includes(selectedType))
    );
  };

  const filteredPokemonList = filterPokemon(enhancedPokemonList);

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-5xl py-6 text-center">PokeCard Viewer</h1>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          {/* Name Search Input */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pokemonName">Filter by name</Label>
            <Input
              type="text"
              value={searchText}
              autoComplete="off"
              id="pokemonName"
              placeholder="Pikachu, Charizard, etc..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Type Filter Select */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pokemonType">Filter by Type</Label>
            <select 
              id="pokemonType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="
                w-full 
                px-3 
                py-2 
                border 
                rounded-md 
                dark:bg-gray-700 
                dark:text-white 
                dark:border-gray-600
              "
            >
              <option value="">All Types</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h3 className="text-3xl pt-12 pb-6 text-center">
          Pokemon Roster 
        </h3>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
        {filteredPokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            imageURL={pokemon.imageUrl || ""}
            types={pokemon.types || []}
          />
        ))}
      </div>
    </>
  );
}