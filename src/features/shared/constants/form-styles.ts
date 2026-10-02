// shadcn tokens in this app are light, so every form control and dropdown is themed here.

export const fieldClass =
  "h-12 rounded-xl border-custom-primary/70 bg-transparent px-4 text-sm text-white placeholder:text-gray-500 hover:border-custom-primary focus-visible:border-custom-primary focus-visible:ring-custom-primary/30 aria-invalid:border-red-400 aria-invalid:ring-red-400/20 dark:bg-transparent";

export const labelClass = "text-sm font-semibold text-gray-200";

export const errorClass = "text-red-400";

export const dropdownClass =
  "border border-custom-primary/60 bg-dark-blue text-white shadow-lg shadow-custom-primary/10 ring-0 hover:text-white focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-dark-blue";

// Text turns white on hover/keyboard focus; the ! and **: overrides beat shadcn's dark accent-foreground on items and their children.
export const dropdownItemClass =
  "cursor-pointer rounded-lg py-2 text-gray-200 data-selected:bg-custom-primary/15 data-selected:text-white data-selected:**:text-white focus:bg-custom-primary/15 focus:text-white! focus:**:text-white! data-highlighted:bg-custom-primary/15 data-highlighted:text-white!";
