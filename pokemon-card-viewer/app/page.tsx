import { PokemonGrid } from "./components/pokemon-grid";
import { getPokemonList } from "@/lib/pokemonAPI";
import { ThemeToggle } from "./components/theme-toggle";

export default async function Home() {
  const pokemonList = await getPokemonList();

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <PokemonGrid pokemonList={pokemonList}/>
      </div>
    </div>
  );
}
