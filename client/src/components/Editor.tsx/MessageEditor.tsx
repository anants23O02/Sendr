"use client"
import { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Link, Image, Code, Quote, Heading1, Heading2, Heading3,
  Type, Palette, Trash, Check, X
} from 'lucide-react';

interface EditorState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignment: 'left' | 'center' | 'right' | 'justify';
  fontSize: string;
  textColor: string;
  showColorPalette: boolean;
  showFontSizeMenu: boolean;
  linkUrl: string;
  showLinkInput: boolean;
}

export default function MessageEditor() {
  // Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const fontSizeMenuRef = useRef<HTMLDivElement>(null);
  const linkInputRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<Range | null>(null);

  // State
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [editorState, setEditorState] = useState<EditorState>({
    bold: false,
    italic: false,
    underline: false,
    alignment: 'left',
    fontSize: 'normal',
    textColor: '#000000',
    showColorPalette: false,
    showFontSizeMenu: false,
    linkUrl: '',
    showLinkInput: false
  });

  // Font sizes
  const fontSizes = [
    { label: 'Small', value: '12px' },
    { label: 'Normal', value: '16px' },
    { label: 'Medium', value: '18px' },
    { label: 'Large', value: '22px' },
    { label: 'X-Large', value: '28px' }
  ];

  // Color palette
  const colors = [
    '#000000', '#555555', '#777777', '#999999',
    '#ff0000', '#ff8800', '#ffcc00', '#ffff00',
    '#00ff00', '#00ffff', '#0000ff', '#8800ff',
    '#ff00ff', '#990000', '#004400', '#000088'
  ];

  // Save current selection
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0).cloneRange();
    }
  };

  // Restore selection
  const restoreSelection = () => {
    if (selectionRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(selectionRef.current);
      }
    }
  };

  // Check if clicked outside of menus to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setEditorState(prev => ({ ...prev, showColorPalette: false }));
      }
      
      if (fontSizeMenuRef.current && !fontSizeMenuRef.current.contains(event.target as Node)) {
        setEditorState(prev => ({ ...prev, showFontSizeMenu: false }));
      }
      
      if (linkInputRef.current && !linkInputRef.current.contains(event.target as Node)) {
        setEditorState(prev => ({ ...prev, showLinkInput: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update editor states based on current selection
  useEffect(() => {
    const checkSelectionFormat = () => {
      const selection = window.getSelection();
      
      if (selection && selection.toString().length > 0) {
        // Save the selection for future use
        saveSelection();
        
        try {
          // Check if current selection has various formats
          setEditorState(prev => ({
            ...prev,
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline')
          }));
        } catch (e) {
          console.log("Error checking selection format:", e);
        }
      }
    };

    const editorElement = editorRef.current;
    if (editorElement) {
      editorElement.addEventListener('mouseup', checkSelectionFormat);
      editorElement.addEventListener('keyup', checkSelectionFormat);
      
      return () => {
        editorElement.removeEventListener('mouseup', checkSelectionFormat);
        editorElement.removeEventListener('keyup', checkSelectionFormat);
      };
    }
  }, []);

  // Modern approach to text formatting using the Selection API
  const applyFormatting = (format: 'bold' | 'italic' | 'underline') => {
    // Focus editor and restore selection if needed
    editorRef.current?.focus();
    restoreSelection();
    
    // Use the modern Selection API
    try {
      // Toggle format state
      setEditorState(prev => ({
        ...prev,
        [format]: !prev[format]
      }));
      
      // Apply formatting using document.execCommand (legacy but widely supported)
      // Note: We'll provide alternatives below when possible
      document.execCommand(format, false);
    } catch (e) {
      console.error(`Error applying ${format} formatting:`, e);
      
      // Fallback for modern browsers using CSS
      if (selectionRef.current) {
        const span = document.createElement('span');
        
        switch (format) {
          case 'bold':
            span.style.fontWeight = 'bold';
            break;
          case 'italic':
            span.style.fontStyle = 'italic';
            break;
          case 'underline':
            span.style.textDecoration = 'underline';
            break;
        }
        
        // Get the selected content and wrap it
        const selectedContent = selectionRef.current.extractContents();
        span.appendChild(selectedContent);
        selectionRef.current.insertNode(span);
      }
    }
    
    // Update content state
    handleContentChange();
  };

  // Apply text alignment
  const applyAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      setEditorState(prev => ({ ...prev, alignment }));
      
      // Apply alignment using CSS to the whole block or selection
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let container = range.commonAncestorContainer;
        
        // Find block-level parent
        while (container && container.nodeType === Node.TEXT_NODE || 
               (container.nodeType === Node.ELEMENT_NODE && 
               !['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes((container as Element).tagName))) {
          if (container.parentElement) {
            container = container.parentElement;
          } else {
            break;
          }
        }
        
        if (container && container.nodeType === Node.ELEMENT_NODE) {
          (container as HTMLElement).style.textAlign = alignment;
        } else {
          // Fallback to the legacy method if needed
          let command = 'justifyLeft';
          if (alignment === 'center') command = 'justifyCenter';
          if (alignment === 'right') command = 'justifyRight';
          if (alignment === 'justify') command = 'justifyFull';
          document.execCommand(command, false);
        }
      }
    } catch (e) {
      console.error(`Error applying ${alignment} alignment:`, e);
    }
    
    handleContentChange();
  };

  // Apply text color
  const applyTextColor = (color: string) => {
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      setEditorState(prev => ({
        ...prev,
        textColor: color,
        showColorPalette: false
      }));
      
      // Use modern approach when possible
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.color = color;
        
        const selectedContent = range.extractContents();
        span.appendChild(selectedContent);
        range.insertNode(span);
      } else {
        // Fallback
        document.execCommand('foreColor', false, color);
      }
    } catch (e) {
      console.error(`Error applying text color:`, e);
    }
    
    handleContentChange();
  };

  // Apply font size
  const applyFontSize = (size: string) => {
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      setEditorState(prev => ({
        ...prev,
        fontSize: size,
        showFontSizeMenu: false
      }));
      
      // Use modern approach when possible
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontSize = size;
        
        const selectedContent = range.extractContents();
        span.appendChild(selectedContent);
        range.insertNode(span);
      } else {
        // Legacy approach as fallback
        document.execCommand('fontSize', false, '7');
        const fontElements = document.getElementsByTagName('font');
        for (let i = 0; i < fontElements.length; i++) {
          if (fontElements[i].size === '7') {
            fontElements[i].removeAttribute('size');
            fontElements[i].style.fontSize = size;
          }
        }
      }
    } catch (e) {
      console.error(`Error applying font size:`, e);
    }
    
    handleContentChange();
  };

  // Handle creating lists
  const createList = (type: 'bullet' | 'number') => {
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      if (type === 'bullet') {
        document.execCommand('insertUnorderedList', false);
      } else {
        document.execCommand('insertOrderedList', false);
      }
    } catch (e) {
      console.error(`Error creating ${type} list:`, e);
      
      // Modern approach (more complex, simplified version here)
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const listElement = document.createElement(type === 'bullet' ? 'ul' : 'ol');
        const listItem = document.createElement('li');
        
        const selectedContent = range.extractContents();
        listItem.appendChild(selectedContent.textContent ? document.createTextNode(selectedContent.textContent) : document.createTextNode(''));
        listElement.appendChild(listItem);
        range.insertNode(listElement);
      }
    }
    
    handleContentChange();
  };

  // Apply heading
  const applyHeading = (level: 'h1' | 'h2' | 'h3') => {
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      document.execCommand('formatBlock', false, level);
    } catch (e) {
      console.error(`Error applying heading:`, e);
      
      // Modern approach
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const headingElement = document.createElement(level);
        
        const selectedContent = range.extractContents();
        headingElement.appendChild(selectedContent);
        range.insertNode(headingElement);
      }
    }
    
    handleContentChange();
  };

  // Insert link
  const insertLink = () => {
    if (!editorState.linkUrl) return;
    
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      setEditorState(prev => ({
        ...prev,
        showLinkInput: false
      }));
      
      // Create link
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const linkElement = document.createElement('a');
        linkElement.href = editorState.linkUrl;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer';
        
        const selectedContent = range.extractContents();
        linkElement.appendChild(selectedContent);
        range.insertNode(linkElement);
      } else {
        document.execCommand('createLink', false, editorState.linkUrl);
      }
    } catch (e) {
      console.error(`Error inserting link:`, e);
    }
    
    // Reset link URL after insertion
    setEditorState(prev => ({ ...prev, linkUrl: '' }));
    handleContentChange();
  };

  // Insert image
  const insertImage = () => {
    const imageUrl = prompt('Enter image URL:');
    if (!imageUrl) return;
    
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.alt = 'Inserted image';
      imageElement.style.maxWidth = '100%';
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        selection.getRangeAt(0).insertNode(imageElement);
      } else {
        editorRef.current?.appendChild(imageElement);
      }
    } catch (e) {
      console.error(`Error inserting image:`, e);
      document.execCommand('insertImage', false, imageUrl);
    }
    
    handleContentChange();
  };

  // Insert quote
  const insertQuote = () => {
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      document.execCommand('formatBlock', false, 'blockquote');
    } catch (e) {
      console.error(`Error inserting quote:`, e);
      
      // Modern approach
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const quoteElement = document.createElement('blockquote');
        quoteElement.style.borderLeft = '3px solid #ccc';
        quoteElement.style.paddingLeft = '10px';
        quoteElement.style.marginLeft = '20px';
        quoteElement.style.fontStyle = 'italic';
        
        const selectedContent = range.extractContents();
        quoteElement.appendChild(selectedContent);
        range.insertNode(quoteElement);
      }
    }
    
    handleContentChange();
  };

  // Insert code block
  const insertCodeBlock = () => {
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      document.execCommand('formatBlock', false, 'pre');
    } catch (e) {
      console.error(`Error inserting code block:`, e);
      
      // Modern approach
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const codeElement = document.createElement('pre');
        codeElement.style.backgroundColor = '#f6f8fa';
        codeElement.style.padding = '10px';
        codeElement.style.borderRadius = '4px';
        codeElement.style.fontFamily = 'monospace';
        
        const selectedContent = range.extractContents();
        codeElement.appendChild(selectedContent);
        range.insertNode(codeElement);
      }
    }
    
    handleContentChange();
  };

  // Clear formatting
  const clearFormatting = () => {
    editorRef.current?.focus();
    restoreSelection();
    
    try {
      document.execCommand('removeFormat', false);
    } catch (e) {
      console.error(`Error clearing formatting:`, e);
      
      // Manual approach (simplified)
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const plainText = range.toString();
        range.deleteContents();
        range.insertNode(document.createTextNode(plainText));
      }
    }
    
    setEditorState(prev => ({
      ...prev,
      bold: false,
      italic: false,
      underline: false,
      fontSize: 'normal',
      textColor: '#000000'
    }));
    
    handleContentChange();
  };

  // UI toggle handlers
  const toggleColorPalette = () => {
    saveSelection();
    setEditorState(prev => ({
      ...prev,
      showColorPalette: !prev.showColorPalette,
      showFontSizeMenu: false,
      showLinkInput: false
    }));
  };

  const toggleFontSizeMenu = () => {
    saveSelection();
    setEditorState(prev => ({
      ...prev,
      showFontSizeMenu: !prev.showFontSizeMenu,
      showColorPalette: false,
      showLinkInput: false
    }));
  };

  const toggleLinkInput = () => {
    saveSelection();
    setEditorState(prev => ({
      ...prev,
      showLinkInput: !prev.showLinkInput,
      showColorPalette: false,
      showFontSizeMenu: false
    }));
  };

  // Handle content changes
  const handleContentChange = () => {
    if (editorRef.current) {
      setDescription(editorRef.current.innerHTML);
    }
  };

  // Submit handler
  const handleSubmit = () => {
    alert(`Message sent!\nTitle: ${title}\nDescription content saved.${description}`);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">New Message</h2>
      
      <div className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter message title"
          />
          {description === '' && (
            <div
              className="absolute top-3 left-3 text-gray-400 pointer-events-none"
              style={{ pointerEvents: 'none' }}
            >
              
            </div>
          )}
        </div>
        
        {/* Rich Text Editor Toolbar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          
          {/* Main Toolbar */}
          <div className="flex flex-wrap gap-1 mb-2 p-1 border border-gray-300 rounded-md bg-gray-50 overflow-x-auto">
            {/* Text formatting */}
            <button
              onClick={() => applyFormatting('bold')}
              className={`p-1 rounded ${editorState.bold ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Bold"
            >
              <Bold size={18} />
            </button>
            <button
              onClick={() => applyFormatting('italic')}
              className={`p-1 rounded ${editorState.italic ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Italic"
            >
              <Italic size={18} />
            </button>
            <button
              onClick={() => applyFormatting('underline')}
              className={`p-1 rounded ${editorState.underline ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Underline"
            >
              <Underline size={18} />
            </button>
            
            <div className="mx-1 h-6 border-l border-gray-300"></div>
            
            {/* Alignment */}
            <button
              onClick={() => applyAlignment('left')}
              className={`p-1 rounded ${editorState.alignment === 'left' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Align Left"
            >
              <AlignLeft size={18} />
            </button>
            <button
              onClick={() => applyAlignment('center')}
              className={`p-1 rounded ${editorState.alignment === 'center' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Align Center"
            >
              <AlignCenter size={18} />
            </button>
            <button
              onClick={() => applyAlignment('right')}
              className={`p-1 rounded ${editorState.alignment === 'right' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Align Right"
            >
              <AlignRight size={18} />
            </button>
            <button
              onClick={() => applyAlignment('justify')}
              className={`p-1 rounded ${editorState.alignment === 'justify' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Justify"
            >
              <AlignJustify size={18} />
            </button>
            
            <div className="mx-1 h-6 border-l border-gray-300"></div>
            
            {/* Lists */}
            {/* <button
              onClick={() => createList('bullet')}
              className="p-1 rounded hover:bg-gray-100"
              title="Bullet List"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => createList('number')}
              className="p-1 rounded hover:bg-gray-100"
              title="Numbered List"
            >
              <ListOrdered size={18} />
            </button>
            
            <div className="mx-1 h-6 border-l border-gray-300"></div>
            
            {/* Headings */}
            {/* <button
              onClick={() => applyHeading('h1')}
              className="p-1 rounded hover:bg-gray-100"
              title="Heading 1"
            >
              <Heading1 size={18} />
            </button>
            <button
              onClick={() => applyHeading('h2')}
              className="p-1 rounded hover:bg-gray-100"
              title="Heading 2"
            >
              <Heading2 size={18} />
            </button>
            <button
              onClick={() => applyHeading('h3')}
              className="p-1 rounded hover:bg-gray-100"
              title="Heading 3"
            >
              <Heading3 size={18} />
            </button>
            
            <div className="mx-1 h-6 border-l border-gray-300"></div>
            
            {/* Font size */}
            {/* <div className="relative">
              <button
                onClick={toggleFontSizeMenu}
                className="p-1 rounded hover:bg-gray-100 flex items-center"
                title="Font Size"
              >
                <Type size={18} />
              </button>
              
              {editorState.showFontSizeMenu && (
                <div 
                  ref={fontSizeMenuRef}
                  className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-md py-1"
                >
                  {fontSizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => applyFontSize(size.value)}
                      className="block w-full text-left px-4 py-1 hover:bg-gray-100"
                      style={{ fontSize: size.value }}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
             */}
            {/* Text color */}
            {/* <div className="relative">
              <button
                onClick={toggleColorPalette}
                className="p-1 rounded hover:bg-gray-100"
                title="Text Color"
              >
                <Palette size={18} />
              </button>
              
              {editorState.showColorPalette && (
                <div 
                  ref={colorPickerRef}
                  className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-md p-2"
                >
                  <div className="grid grid-cols-4 gap-1">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => applyTextColor(color)}
                        className="w-6 h-6 rounded-sm border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mx-1 h-6 border-l border-gray-300"></div> */}
            
            {/* Links */}
            {/* <div className="relative">
              <button
                onClick={toggleLinkInput}
                className="p-1 rounded hover:bg-gray-100"
                title="Insert Link"
              >
                <Link size={18} />
              </button>
              
              {editorState.showLinkInput && (
                <div 
                  ref={linkInputRef}
                  className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-md p-2 flex items-center"
                >
                  <input
                    type="text"
                    value={editorState.linkUrl}
                    onChange={(e) => setEditorState(prev => ({ ...prev, linkUrl: e.target.value }))}
                    placeholder="Enter URL"
                    className="px-2 py-1 border border-gray-300 rounded-md w-64"
                  />
                  <button
                    onClick={insertLink}
                    className="ml-2 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    title="Add Link"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setEditorState(prev => ({ ...prev, showLinkInput: false }))}
                    className="ml-1 p-1 bg-gray-300 rounded-md hover:bg-gray-400"
                    title="Cancel"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div> */}
            
            {/* Image */}
            {/* <button
              onClick={insertImage}
              className="p-1 rounded hover:bg-gray-100"
              title="Insert Image"
            >
              <Image size={18} />
            </button>
            
            {/* Quote */}
            {/* <button
              onClick={insertQuote}
              className="p-1 rounded hover:bg-gray-100"
              title="Insert Quote"
            >
              <Quote size={18} />
            </button> */}
            
            {/* Code block */}
            {/* <button
              onClick={insertCodeBlock}
              className="p-1 rounded hover:bg-gray-100"
              title="Insert Code Block"
            >
              <Code size={18} />
            </button>
            
            <div className="mx-1 h-6 border-l border-gray-300"></div> */}
            
            {/* Clear formatting */}
            {/* <button
              onClick={clearFormatting}
              className="p-1 rounded hover:bg-gray-100"
              title="Clear Formatting"
            >
              <Trash size={18} />
            </button>*/} 
          </div>  
            
          {/* Content editable area with increased height */}
          <div
            ref={editorRef}
            contentEditable={true}
            className="w-full h-64 md:h-96 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto"
            style={{ textAlign: editorState.alignment }}
            onInput={handleContentChange}
            suppressContentEditableWarning={true}
          />
        </div>
        
        {/* Submit Button */}
        {/* <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </div> */}
      </div>
    </div>
  );
}