import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Editor } from '@/components/editor';
import { RhymePanel } from '@/components/rhyme-panel';
import { BackgroundSelector } from '@/components/background-selector';
import { FontSelector } from '@/components/font-selector';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Feather } from 'lucide-react';

function App() {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [background, setBackground] = useState('longing');
  const [font, setFont] = useState('Playfair Display');
  const [fontSize, setFontSize] = useState(18);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="poetry-editor-theme">
      <div className={cn(
        "min-h-screen w-full transition-all duration-300",
        background === 'longing' && "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
        background === 'sunset' && "bg-gradient-to-br from-orange-900 via-purple-900 to-blue-900",
        background === 'rain' && "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900",
        background === 'minimalist' && "bg-neutral-900",
        background === 'nature' && "bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900",
        background === 'abstract' && "bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900",
        background === 'ocean' && "bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900",
        background === 'night' && "bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950"
      )}>
        <header className="w-full p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <Feather className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Poetic</h1>
          </div>
          <div className="flex items-center gap-4">
            <BackgroundSelector value={background} onChange={setBackground} />
            <FontSelector 
              font={font} 
              setFont={setFont}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
          </div>
        </header>
        
        <main className="container mx-auto p-4 flex gap-4">
          <div className="flex-1">
            <Editor
              font={font}
              fontSize={fontSize}
              background={background}
              onWordSelect={setSelectedWord}
            />
          </div>
          <RhymePanel
            selectedWord={selectedWord}
          />
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;