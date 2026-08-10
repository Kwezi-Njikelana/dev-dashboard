import { useState, type FormEvent } from "react";

interface UsernameFieldProps {
  username: string;
  onChange: (username: string) => void;
}

export function UsernameField({ username, onChange }: UsernameFieldProps) {
  const [value, setValue] = useState(username);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim()) onChange(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap items-center gap-2 text-sm">
      <label htmlFor="username" className="text-muted">
        github.com/
      </label>
      <input
        id="username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded bg-raised px-2 py-1 text-parchment placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-phosphor"
        placeholder="username"
      />
      <button
        type="submit"
        className="rounded border border-phosphor-dim/60 px-3 py-1 text-phosphor hover:border-phosphor hover:text-phosphor-bright"
      >
        load
      </button>
    </form>
  );
}
