import { useEffect, useState } from "react";
import { Settings, Moon, Sun, Palette, ShieldAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const THEME_KEY = "palette-theme";

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  if (theme === "dark") {
    root.style.backgroundColor = "#000";
  } else {
    root.style.backgroundColor = "";
  }
}

export function SettingsMenu() {
  const [open, setOpen] = useState<null | "personalization" | "rules">(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as "light" | "dark" | null) ?? "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function changeTheme(next: "light" | "dark") {
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen("personalization")}>
            <Palette className="mr-2 h-4 w-4" /> Personalization
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen("rules")}>
            <ShieldAlert className="mr-2 h-4 w-4" /> Rules
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open === "personalization"} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Personalization</DialogTitle>
            <DialogDescription>Choose how Palette looks for you.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => changeTheme("light")}
              className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
                theme === "light" ? "border-primary ring-2 ring-primary" : "border-border hover:bg-accent"
              }`}
            >
              <Sun className="h-5 w-5" />
              <span className="font-semibold">Light mode</span>
              <span className="text-xs text-muted-foreground">Bright and warm.</span>
            </button>
            <button
              type="button"
              onClick={() => changeTheme("dark")}
              className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
                theme === "dark" ? "border-primary ring-2 ring-primary" : "border-border hover:bg-accent"
              }`}
            >
              <Moon className="h-5 w-5" />
              <span className="font-semibold">Dark mode</span>
              <span className="text-xs text-muted-foreground">Black background.</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open === "rules"} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rules</DialogTitle>
            <DialogDescription>Please follow these to use Palette.</DialogDescription>
          </DialogHeader>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <ShieldAlert className="mt-0.5 h-4 w-4 text-primary" />
              <span><strong>You can't use AI.</strong> All art must be made by you, by hand.</span>
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}