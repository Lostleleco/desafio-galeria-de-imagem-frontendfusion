import { useState, useEffect } from "react";
import axios from "axios";

function Imgs() {
    const [imgs, setImgs] = useState([]);
    const [Carregando, setCarregando] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todas as categorias");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const categories = ["Todas as categorias", "Informatica e estações", "Aleatorias", "Diversos"]; // Exemplo de categorias

    useEffect(() => {
        axios.get("https://picsum.photos/v2/list")
            .then(res => {
                const categorizedImgs = res.data.map((img, index) => ({
                    ...img,
                    category: categories[index % categories.length]
                }));
                setImgs(categorizedImgs);
                setCarregando(false);
            })
            .catch(err => {
                console.log(err);
                setCarregando(false);
            });
    }, [categories]);

    const toggleFavorite = (img) => {
        if (favorites.includes(img.id)) {
            setFavorites(favorites.filter(fav => fav !== img.id));
        } else {
            setFavorites([...favorites, img.id]);
        }
    };

    const filteredImgs = selectedCategory === "Todas as categorias"
        ? imgs
        : imgs.filter(img => img.category === selectedCategory);

    return (
        <div>
            <h1 className="text-center bg-zinc-800 p-8 mb-6 text-slate-200 text-4xl font-mono">Catalogo de imagens</h1>


            <div className="flex justify-center space-x-4 mb-6">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-lg 
                        ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300'}
                        transition duration-300 ease-in-out`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {Carregando ? (
                <p className="text-center">Carregando...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                    {filteredImgs.map(img => (
                        <div key={img.id} className="relative text-center">
                            <img
                                src={img.download_url}
                                alt={`Image by ${img.author}`}
                                className="w-full max-h-60 rounded-lg shadow-md"
                            />
                            <p className="mt-2">Autor: {img.author}</p>
                            <p>Altura: {img.height}px</p>
                            <p>Largura: {img.width}px</p>

                          
                            <button
                                className={`absolute top-2 right-2 p-2 rounded-full 
                                ${favorites.includes(img.id) ? 'bg-red-500' : 'bg-gray-300'} 
                                hover:bg-red-400 transition`}
                                onClick={() => toggleFavorite(img)}
                            >
                                {favorites.includes(img.id) ? "❤️" : "♡"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Imgs;
