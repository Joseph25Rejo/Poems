import { toast } from 'sonner';

const OPENAI_API_KEY = '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';

interface RhymeResult {
  word: string;
  score: number;
}

export async function getRhymingSuggestions(word: string): Promise<RhymeResult[]> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{
          role: 'system',
          content: 'You are a poetry assistant. Return only a JSON array of objects with "word" and "score" properties. Score should be between 1-100 based on rhyme quality.'
        }, {
          role: 'user',
          content: `Give me 5 words that rhyme with "${word}" ordered by rhyme quality.`
        }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch rhyming suggestions');
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error fetching rhymes:', error);
    toast.error('Failed to fetch rhyming suggestions');
    return [];
  }
}

export async function getNextLineSuggestion(currentText: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{
          role: 'system',
          content: 'You are a poetry assistant. Given the current text of a poem, suggest the next line that maintains the style, rhyme scheme, and emotional tone. Return only the next line, nothing else.'
        }, {
          role: 'user',
          content: `Suggest the next line for this poem:\n\n${currentText}`
        }],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate next line');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating next line:', error);
    toast.error('Failed to generate next line');
    return '';
  }
}