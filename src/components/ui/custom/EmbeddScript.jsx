"use client"
import React, { useEffect, useRef } from 'react'
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github-dark.css";
import CopyButtonPlugin from "highlightjs-copy/index"
import { useToast } from '@/hooks/use-toast';



const EmbeddScript = () => {
    const {toast} = useToast()
    const codeRef = useRef(null);
    hljs.registerLanguage("javascript", javascript);
hljs.addPlugin(new CopyButtonPlugin());
hljs.addPlugin({
    "after:highlightElement": ({ el, text }) => {
      /**
       * el is the <code> element that was highlighted
       * el.parentElement is the <pre> element
       */
      const wrapper = el.parentElement;
      if (wrapper == null) {
        return;
      }
  
      /**
       * Make the parent relative so we can absolutely
       * position the copy button
       */
      wrapper.classList.add("relative");
  
      const copyButton = document.createElement("button");
      copyButton.classList.add(
        "border",
        "rounded-md",
        "absolute",
        "top-2",
        "right-2",
        "p-2",
        "text-gray-500",
        "hover:text-gray-700",
      );
      // Lucide copy icon
      copyButton.innerHTML = `<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
  
      copyButton.onclick = () => {
        navigator.clipboard.writeText(text);
  
        // Notify user that the content has been copied
        toast({
            title:"Copied to clipboard",
          description: "The code block content has been copied to the clipboard.",
        });
        copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4BB543" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      };
  
      // Append the copy button to the wrapper
      wrapper.appendChild(copyButton);
    },
  });

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);
  return (
    <div>
      <pre >
      <code className="javascript rounded-md" ref={codeRef}>
        {
            `// Log
<script src="cdn.aidea.in/config.js" domain="example.com"></script>
console.log("Hello world!");`
        }
      </code>
    </pre>
    </div>
  )
}

export default EmbeddScript
