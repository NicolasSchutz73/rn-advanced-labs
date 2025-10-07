export interface Robot {
    id: string;
    name: string;
    label: string;
    year: number;
    type: 'industrial' | 'service' | 'medical' | 'educational' | 'other';
}