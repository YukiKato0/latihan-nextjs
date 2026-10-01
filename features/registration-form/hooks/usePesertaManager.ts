import { useState, useCallback } from 'react';
import { IPeserta, PesertaFormData } from '../types/form';
import { Peserta } from '../mock/data';

export function usePesertaManager(initialData: IPeserta[] = Peserta) {
  const [listPeserta, setListPeserta] = useState<IPeserta[]>(initialData);
  const [editPeserta, setEditPeserta] = useState<IPeserta | null>(null);

  // Menambah atau Memperbarui data
  const savePeserta = useCallback((formData: PesertaFormData) => {
    if (editPeserta) {
      setListPeserta((prev) =>
        prev.map((item) =>
          item.id === editPeserta.id ? { ...item, ...formData } : item
        )
      );
      setEditPeserta(null);
    } else {
      const newPeserta: IPeserta = {
        id: Date.now(),
        ...formData,
      };
      setListPeserta((prev) => [newPeserta, ...prev]);
    }
  }, [editPeserta]);

  // Menghapus data
  const deletePeserta = useCallback((id: number) => {
    setListPeserta((prev) => prev.filter((item) => item.id !== id));
    if (editPeserta?.id === id) {
      setEditPeserta(null);
    }
  }, [editPeserta]);

  // Batal Edit
  const cancelEdit = useCallback(() => {
    setEditPeserta(null);
  }, []);

  return {
    listPeserta,
    editPeserta,
    setEditPeserta,
    savePeserta,
    deletePeserta,
    cancelEdit,
  };
}