import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { CodeBlock } from 'react-code-block';
import { useCopyToClipboard } from 'react-use';
import { Button } from '../button';
import { useToast } from '@/hooks/use-toast';
import { themes } from 'prism-react-renderer';

function EmbedScript({ code, language }) {
  const [state, copyToClipboard] = useCopyToClipboard();
  const { toast } = useToast()

  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(code);
    toast({
      title:"Copied to clipboard",
    description: "The code block content has been copied to the clipboard.",
  });
  };

  return (
    <div className=''>
    <CodeBlock code={code} language={language} theme={themes.oneDark}>
      <div className="relative">
      
        <CodeBlock.Code className="bg-gray-900 !p-3 !pr-16 rounded-xl shadow-lg overflow-x-auto text-xs">
          <div className="table-row">
            {/* <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" /> */}
            <CodeBlock.LineContent className="table-cell">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>
        <Button
          variant="outline"
          className="rounded-md p-1 py-1 absolute top-2 right-2 text-sm font-semibold "
          onClick={copyCode}
        >
          {state.value ? <CopyCheckIcon color='green'/> : <CopyIcon/>}
        </Button>
        
      </div>
    </CodeBlock>
    </div>
  );
}

export default EmbedScript;