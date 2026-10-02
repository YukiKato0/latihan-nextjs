import { Button, Card } from '@/components/ui';
import { IPeserta } from '../types/form';

interface CardDataProps {
  peserta: IPeserta;
  onEdit: (peserta: IPeserta) => void;
  onDelete: (id: number) => void;
}

export default function CardData({ peserta, onEdit, onDelete }: CardDataProps) {
  return (
    <Card className="w-full flex justify-between items-center p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <h3 className="font-bold text-base text-gray-900">{peserta.nama}</h3>
        <p className="text-sm text-gray-600">{peserta.alamat}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onEdit(peserta)}
          aria-label={`Edit data ${peserta.nama}`}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onDelete(peserta.id)}
          aria-label={`Hapus data ${peserta.nama}`}
        >
          Hapus
        </Button>
      </div>
    </Card>
  );
}