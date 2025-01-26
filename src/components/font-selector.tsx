import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { Type } from 'lucide-react';

interface FontSelectorProps {
  font: string;
  setFont: (font: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

export function FontSelector({ font, setFont, fontSize, setFontSize }: FontSelectorProps) {
  const fonts = [
    'Playfair Display',
    'Merriweather',
    'Lora',
    'Crimson Text'
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Type className="w-4 h-4" />
          Typography
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {fonts.map((f) => (
          <DropdownMenuItem
            key={f}
            onClick={() => setFont(f)}
            className="gap-2"
            style={{ fontFamily: f }}
          >
            {f}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="px-2 py-4">
          <p className="text-sm mb-2">Font Size: {fontSize}px</p>
          <Slider
            value={[fontSize]}
            onValueChange={([value]) => setFontSize(value)}
            min={12}
            max={48}
            step={1}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}