import Link from "next/link";
import { HeartHandshake, LayoutDashboard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const nav = [
  { href: "/adopt", label: "Adopt" },
  { href: "/rescue", label: "Rescue" },
  { href: "/medical/upload", label: "Medical" },
  { href: "/dashboard", label: "Dashboard" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/86 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <HeartHandshake className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">Campus Paws</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href="/rescue">
              <MapPin className="h-4 w-4" />
              Report
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/login">
              <LayoutDashboard className="h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
