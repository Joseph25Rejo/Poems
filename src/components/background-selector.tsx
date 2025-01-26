import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

interface BackgroundSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function BackgroundSelector({ value, onChange }: BackgroundSelectorProps) {
  const backgrounds = [
    { id: 'longing', name: 'Longing' },
    { id: 'sunset', name: 'Distant Sunset' },
    { id: 'rain', name: 'Rainy Window' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'nature', name: 'Nature' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'ocean', name: 'Ocean' },
    { id: 'night', name: 'Night Sky' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Palette className="w-4 h-4" />
          Background
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {backgrounds.map((bg) => (
          <DropdownMenuItem
            key={bg.id}
            onClick={() => onChange(bg.id)}
            className="gap-2"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: bg.id === 'longing' ? 'linear-gradient(135deg, #1a1a2e, #4a1042)' :
                           bg.id === 'sunset' ? 'linear-gradient(135deg, #7c2d12, #581c87, #1e3a8a)' :
                           bg.id === 'rain' ? 'linear-gradient(135deg, #111827, #1f2937)' :
                           bg.id === 'minimalist' ? '#171717' :
                           bg.id === 'nature' ? 'linear-gradient(135deg, #064e3b, #065f46)' :
                           bg.id === 'abstract' ? 'linear-gradient(135deg, #5b21b6, #4c1d95)' :
                           bg.id === 'ocean' ? 'linear-gradient(135deg, #1e3a8a, #0e7490)' :
                           'linear-gradient(135deg, #1e1b4b, #0f172a)'
              }}
            />
            {bg.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}