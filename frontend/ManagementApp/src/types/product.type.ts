export type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    supplier: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
};