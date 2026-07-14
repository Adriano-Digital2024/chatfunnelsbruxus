import { useTranslation } from "@/hooks/useTranslation";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  loading,
  onConfirm,
  onCancel,
}: Props) {
  const { translate: t } = useTranslation();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      <div
        className="bg-background text-foreground rounded-xl border border-border p-6 max-w-sm w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel || t("Cancelar")}
          </button>
          <button
            className="px-4 py-2 rounded-full bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? t("Eliminando...") : confirmLabel || t("Eliminar")}
          </button>
        </div>
      </div>
    </div>
  );
}
