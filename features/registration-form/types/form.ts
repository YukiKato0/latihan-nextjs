export interface IPeserta {
  id: number;
  nama: string;
  alamat: string;
}

export type PesertaFormData = Omit<IPeserta, 'id'>;