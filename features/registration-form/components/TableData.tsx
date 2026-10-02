import { IPeserta } from "../types/form";
import { Button } from '@/components/ui';

interface TableDataProps {
  peserta: IPeserta;
  onEdit: (peserta: IPeserta) => void;
  onDelete: (id: number) => void;
}

export default function TableData({ peserta, onEdit, onDelete }: TableDataProps) {
  return (
    <tr>
      <td>{peserta.nama}</td>
      <td>{peserta.alamat}</td>
      <td>
        <Button
          type="button"
          variant={"outline"}
          size={"sm"}
          onClick={() => onEdit(peserta)}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant={"destructive"}
          size={"sm"}
          onClick={() => onDelete(peserta.id)}
        >
          Hapus
        </Button>
      </td>
    </tr>
  )
}