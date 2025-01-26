import { toast } from 'sonner';
import html2canvas from 'html2canvas';

export async function exportToPNG(
  content: string,
  font: string,
  fontSize: number,
  background: string
): Promise<void> {
  try {
    // Create a temporary container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.width = '800px';
    container.style.height = '1000px';
    container.style.padding = '40px';
    
    // Apply background based on theme
    switch (background) {
      case 'longing':
        container.style.background = 'linear-gradient(to bottom right, #1a1a2e, #4a1042, #1a1a2e)';
        break;
      case 'sunset':
        container.style.background = 'linear-gradient(to bottom right, #7c2d12, #581c87, #1e3a8a)';
        break;
      case 'rain':
        container.style.background = 'linear-gradient(to bottom right, #111827, #1f2937, #111827)';
        break;
      case 'minimalist':
        container.style.background = '#171717';
        break;
      case 'nature':
        container.style.background = 'linear-gradient(to bottom right, #064e3b, #065f46, #064e3b)';
        break;
      case 'abstract':
        container.style.background = 'linear-gradient(to bottom right, #5b21b6, #4c1d95, #5b21b6)';
        break;
      case 'ocean':
        container.style.background = 'linear-gradient(to bottom right, #1e3a8a, #0e7490, #1e3a8a)';
        break;
      case 'night':
        container.style.background = 'linear-gradient(to bottom right, #1e1b4b, #0f172a, #1e1b4b)';
        break;
    }

    // Create content element
    const contentElement = document.createElement('div');
    contentElement.style.color = 'white';
    contentElement.style.fontFamily = font;
    contentElement.style.fontSize = `${fontSize}px`;
    contentElement.style.lineHeight = '1.6';
    contentElement.style.whiteSpace = 'pre-wrap';
    contentElement.textContent = content;

    container.appendChild(contentElement);
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = 'poem.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.success('Poem exported successfully');
    } finally {
      document.body.removeChild(container);
    }
  } catch (error) {
    console.error('Error exporting poem:', error);
    toast.error('Failed to export poem');
  }
}