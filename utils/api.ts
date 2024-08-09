export const fetchCatBreeds = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_CAT_API_KEY as string, {
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY_X as string,
        },
    });
    return res.json();
};

export const fetchDogBreeds = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_DOG_API_KEY as string, {
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_DOG_API_KEY_X as string,
        },
    });
    return res.json();
};


export const fetchDogBreedImages = async (breedId: string) => {
    const res = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=10`, {
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_DOG_API_KEY_X as string,
        },
    });
    return res.json();
};

export const fetchCatBreedImages = async (breedId: string) => {
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`, {
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY_X as string,
        },
    });
    return res.json();
};
