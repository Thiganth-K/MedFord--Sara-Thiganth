import React from 'react';

export interface Service {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
}
