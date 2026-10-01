import { Label, Input, Button } from '@/components/ui';
import { IPeserta, PesertaFormData } from '../types/form';
import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";

interface FormInputProps {
  editPeserta: IPeserta | null;
  onSubmit: (data: PesertaFormData) => void;
  onCancel?: () => void;
}

export default function FormInput({ editPeserta, onSubmit, onCancel }: FormInputProps) {
  const [form, setForm] = useState<PesertaFormData>({ nama: '', alamat: '' });

  // Sinkronkan state form jika prop editPeserta berubah
  useEffect(() => {
    if (editPeserta) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ nama: editPeserta.nama, alamat: editPeserta.alamat });
    } else {
      setForm({ nama: '', alamat: '' });
    }
  }, [editPeserta]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.alamat.trim()) return;

    onSubmit(form);
    setForm({ nama: '', alamat: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="nama" className="text-sm font-semibold">Nama</Label>
        <Input
          id="nama"
          name="nama"
          type="text"
          value={form.nama}
          onChange={handleChange}
          placeholder="Masukkan nama peserta"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat" className="text-sm font-semibold">Alamat</Label>
        <Input
          id="alamat"
          name="alamat"
          type="text"
          value={form.alamat}
          onChange={handleChange}
          placeholder="Masukkan alamat peserta"
          required
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1">
          {editPeserta ? "Update Data" : "Tambah Data"}
        </Button>
        {editPeserta && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
        )}
      </div>
    </form>
  );
}