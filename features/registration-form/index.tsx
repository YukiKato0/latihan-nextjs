"use client";

import FormInput from "./components/FormInput";
import CardData from "./components/CardData";
import { Card } from '@/components/ui';
import { IPeserta, PesertaFormData } from "./types/form";
import TableData from "./components/TableData";

interface RegistrationFormProps {
  editPeserta: IPeserta | null;
  onSubmit: (data: PesertaFormData) => void;
  onCancelEdit?: () => void;
}

export function RegistrationForm({ editPeserta, onSubmit, onCancelEdit }: RegistrationFormProps) {
  return (
    <Card className="w-full shadow-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        {editPeserta ? "Edit Peserta" : "Form Registrasi"}
      </h2>
      <FormInput editPeserta={editPeserta} onSubmit={onSubmit} onCancel={onCancelEdit} />
    </Card>
  );
}

interface GridDataProps {
  listPeserta: IPeserta[];
  onEditPeserta: (peserta: IPeserta) => void;
  onDeletePeserta: (id: number) => void;
}

export function GridData({ listPeserta, onEditPeserta, onDeletePeserta }: GridDataProps) {
  if (listPeserta.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500 border border-dashed rounded-lg">
        Belum ada data peserta.
      </div>
    );
  }

  return (
    <ul className="w-full flex flex-col gap-3 overflow-y-auto max-h-125 px-2 py-1">
      {listPeserta.map((peserta) => (
        <li key={peserta.id}>
          <CardData
            peserta={peserta}
            onEdit={onEditPeserta}
            onDelete={onDeletePeserta}
          />
        </li>
      ))}
    </ul>
  );
}

interface ListDataProps {
  listPeserta: IPeserta[];
  onEditPeserta: (peserta: IPeserta) => void;
  onDeletePeserta: (id: number) => void
}

export function ListData({ listPeserta, onEditPeserta, onDeletePeserta }: ListDataProps) {
  if (listPeserta.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500 border border-dashed rounded-lg">
        Belum ada data peserta.
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Alamat</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        {listPeserta.map((peserta) => (
          <TableData key={peserta.id} peserta={peserta} onEdit={onEditPeserta} onDelete={onDeletePeserta} />
        ))}
      </tbody>

    </table>
  )
}