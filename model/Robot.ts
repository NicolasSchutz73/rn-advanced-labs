export interface Robot {
    id: string;
    name: string;
    label: string;
    year: number;
    type: 'industrial' | 'service' | 'medical' | 'educational' | 'other';
    created_at: number;
    updated_at: number;
    archived: boolean;
}