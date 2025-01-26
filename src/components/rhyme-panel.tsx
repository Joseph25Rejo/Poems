import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRhymingSuggestions } from '@/lib/openai';

interface RhymePanelProps {
  selectedWord: string;
}

export function RhymePanel({ selectedWord }: RhymePanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [rhymes, setRhymes] = useState<Array<{ word: string; score: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchRhymes() {
      if (!selectedWord) {
        setRhymes([]);
        return;
      }

      setIsLoading(true);
      try {
        const suggestions = await getRhymingSuggestions(selectedWord);
        if (isMounted) {
          setRhymes(suggestions);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchRhymes();
    return () => {
      isMounted = false;
    };
  }, [selectedWord]);

  if (isCollapsed) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed right-0 top-1/2 -translate-y-1/2"
        onClick={() => setIsCollapsed(false)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Card className="w-80 bg-black/20 border-white/10 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setIsCollapsed(true)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-medium">Rhyme Assistant</h2>
      </div>
      
      <div className="p-4">
        {selectedWord ? (
          <>
            <p className="text-sm text-white/60 mb-2">Suggestions for:</p>
            <p className="text-xl font-medium mb-4">{selectedWord}</p>
            
            <ScrollArea className="h-[400px] pr-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-6 h-6 animate-spin text-white/60" />
                </div>
              ) : rhymes.length > 0 ? (
                rhymes.map((rhyme) => (
                  <div
                    key={rhyme.word}
                    className="mb-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{rhyme.word}</span>
                      <span className={cn(
                        "text-sm",
                        rhyme.score >= 90 ? "text-green-400" :
                        rhyme.score >= 80 ? "text-yellow-400" :
                        "text-orange-400"
                      )}>
                        {rhyme.score}%
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-white/40">
                  No rhyming suggestions found
                </div>
              )}
            </ScrollArea>
          </>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-white/40 text-center p-4">
            Type in the editor to see rhyming suggestions
          </div>
        )}
      </div>
    </Card>
  );
}