import { atom } from 'jotai';
import type { Client } from '@/lib/sanity.types';

export const clientsAtom = atom<Client[] | null>(null);
