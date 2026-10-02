"use client";

import { RegistrationForm, ListData } from "@/features/registration-form";
import { usePesertaManager } from "@/features/registration-form/hooks/usePesertaManager";
import { Peserta } from "@/features/registration-form/mock/data";

export default function HalamanUtama() {
  const {
    listPeserta,
    editPeserta,
    setEditPeserta,
    savePeserta,
    deletePeserta,
    cancelEdit,
  } = usePesertaManager(Peserta);

  return (
    <main className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      <section aria-labelledby="form-title">
        <RegistrationForm
          editPeserta={editPeserta}
          onSubmit={savePeserta}
          onCancelEdit={cancelEdit}
        />
      </section>

      <section aria-label="Daftar Peserta Registrasi">
        <ListData
          listPeserta={listPeserta}
          onEditPeserta={setEditPeserta}
          onDeletePeserta={deletePeserta}
        />
      </section>
    </main>
  );
}