export type ProductsType = {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
    details: string;
    image: [
        {
            _key: string;
            _type: string;
            asset: {
                _ref: string;
                _type: string;
            };
        }
    ];
    name: string;
    price: number;
    slug: {
        _type: string;
        current: string;
    };
    quantity: number;
};
