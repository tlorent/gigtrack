type SubmitButtonProps = {
  loading: boolean;
  label: string;
  loadingLabel: string;
};

export default function SubmitButton({
  loading,
  label,
  loadingLabel,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="font-body mt-2 cursor-pointer rounded-lg bg-linear-to-r from-purple-600 to-orange-500 py-3 font-medium text-white transition hover:from-purple-500 hover:to-orange-400 disabled:opacity-50"
    >
      {loading ? loadingLabel : label}
    </button>
  );
}
