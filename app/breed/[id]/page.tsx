import { fetchCatBreeds, fetchDogBreeds, fetchCatBreedImages, fetchDogBreedImages } from "@/utils/api";

export default async function BreedPage({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const catBreeds = await fetchCatBreeds();
        const dogBreeds = await fetchDogBreeds();

        let breed;
        let images = [];

        if (isNaN(Number(id))) {
            breed = catBreeds.find((b: { id: string; }) => b.id === id);
            if (breed) {
                images = await fetchCatBreedImages(id);
            }
        } else {
            breed = dogBreeds.find((b: { id: { toString: () => string; }; }) => b.id.toString() === id);
            if (breed) {
                images = await fetchDogBreedImages(id);
            }
        }

        if (!breed) {
            return <div className="container mx-auto p-4">Breed not found</div>;
        }

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8 text-center">{breed.name}</h1>
                <div className="flex flex-col items-center">
                    {images.length === 1 ? (
                        <img
                            src={images[0].url}
                            alt={breed.name}
                            className="w-full h-auto  object-cover rounded-lg border-b-4 border-gold mb-4"
                        />
                    ) : images.length > 1 ? (
                        <>
                            <img
                                src={images[0].url}
                                alt={breed.name}
                                className="w-full h-full  object-cover rounded-lg border-b-4 border-gold mb-4"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {images.map((img: any, index: number) => (
                                    <img
                                        key={index}
                                        src={img.url}
                                        alt={`${breed.name} ${index + 1}`}
                                        className="w-full h-80 object-cover rounded-lg border-b-4 border-gold"
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div
                            className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg border-b-4 border-gold mb-4">
                            <span>No Image Available</span>
                        </div>
                    )}
                    <p className="text-lg text-center mt-4">{breed.description || 'No description available.'}</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error on BreedPage:', error);
        return <div className="container mx-auto p-4">An error occurred while loading the breed information.</div>;
    }
}
