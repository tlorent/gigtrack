type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
};

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  value,
  onChange,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-body mb-1 block text-sm font-medium text-gray-300"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`font-body w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none ${error ? 'border-red-500' : 'border-white/10'}`}
      />
      {error && (
        <p className="font-body mt-1 text-xs text-red-400">{error}</p>
      )}
      {children}
    </div>
  );
}
