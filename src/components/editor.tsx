import { useCallback, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wand2, Loader2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNextLineSuggestion } from '@/lib/openai';
import { exportToPNG } from '@/lib/export';
import { toast } from 'sonner';

interface EditorProps {
  font: string;
  fontSize: number;
  background: string;
  onWordSelect: (word: string) => void;
}

export function Editor({ font, fontSize, background, onWordSelect }: EditorProps) {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    
    // Get the current word at cursor position
    const cursorPosition = e.target.selectionStart;
    const text = e.target.value;
    const words = text.slice(0, cursorPosition).split(/\s+/);
    const currentWord = words[words.length - 1];
    
    if (currentWord && currentWord.length > 2) {
      onWordSelect(currentWord);
    } else {
      onWordSelect('');
    }
  }, [onWordSelect]);

  const handleSuggestNextLine = async () => {
    if (!content.trim()) {
      toast.error('Please write something first');
      return;
    }

    setIsGenerating(true);
    try {
      const suggestion = await getNextLineSuggestion(content);
      if (suggestion) {
        setContent((prev) => prev + '\n' + suggestion);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async () => {
    if (!content.trim()) {
      toast.error('Please write something first');
      return;
    }

    setIsExporting(true);
    try {
      await exportToPNG(content, font, fontSize, background);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="w-full bg-black/20 border-white/10">
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <h2 className="text-lg font-medium">Editor</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export as PNG
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={handleSuggestNextLine}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4 mr-2" />
            )}
            Suggest Next Line
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Textarea
          value={content}
          onChange={handleTextChange}
          placeholder="Begin writing your poem..."
          className={cn(
            "min-h-[400px] bg-transparent border-none focus-visible:ring-0 resize-none",
            "placeholder:text-white/40"
          )}
          style={{
            fontFamily: font,
            fontSize: `${fontSize}px`,
            lineHeight: 1.6
          }}
        />
      </div>
    </Card>
  );
}