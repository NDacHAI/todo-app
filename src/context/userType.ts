export interface User {
    id: string;
    name: string | null;
}

export interface UserContextType {
    user: User | null;
    loading?: boolean; // nếu có loading thì thêm optional
}

