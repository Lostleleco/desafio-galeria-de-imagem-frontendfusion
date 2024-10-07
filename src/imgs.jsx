import { useState, useEffect } from "react";
import axios from "axios";

function Imgs() {
    const [imgs, setImgs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://picsum.photos/v2/list")
            .then(res => {
                setImgs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // É uma boa prática definir loading como false em caso de erro também
            });
    }, []);

    return (
        <div>
            <h1>Imgs</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center p-6">
                    {imgs.map(img => (
                        <img 
                            key={img.id} 
                            src={img.download_url} 
                            alt={img.author} 
                            className="w-1/4 h-auto" // Ajuste o tamanho conforme necessário
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Imgs;
