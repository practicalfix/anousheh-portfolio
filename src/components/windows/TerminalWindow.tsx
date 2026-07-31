import { useState, useRef, useEffect } from 'react';
import { terminalCommands } from '../../data/terminalCommands';
import type { TerminalContext } from '../../data/terminalCommands';
import { useSettings } from '../../context/SettingsContext';

interface HistoryItem {
  id: string;
  isCommand?: boolean;
  content: React.ReactNode;
}

export function TerminalWindow() {
  const { settings } = useSettings();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  
  // Command history for arrow keys
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input on click anywhere
  const handleClick = () => {
    inputRef.current?.focus();
  };

  // Scroll to bottom on new history
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (cmdString: string) => {
    if (!cmdString.trim()) return;

    // Add to local command history
    setCommandHistory(prev => [cmdString, ...prev]);
    setHistoryIndex(-1);

    const cmdId = Date.now().toString() + '-cmd';
    setHistory(prev => [...prev, { id: cmdId, isCommand: true, content: cmdString }]);

    const args = cmdString.trim().split(/\s+/);
    const cmdName = args[0].toLowerCase();

    const ctx: TerminalContext = {
      settings,
      print: (node) => {
        const id = Date.now().toString() + Math.random().toString();
        setHistory(prev => [...prev, { id, content: node }]);
        return id;
      },
      update: (id, node) => {
        setHistory(prev => prev.map(item => item.id === id ? { ...item, content: node } : item));
      },
      clear: () => {
        setHistory([]);
      }
    };

    const command = terminalCommands.find(c => c.name === cmdName);
    if (command) {
      try {
        await command.execute(args.slice(1), ctx);
      } catch (e) {
        ctx.print(`Error executing command: ${cmdName}`);
      }
    } else {
      // Secret command check
      if (cmdString.trim() === 'sudo rm -rf /') {
        ctx.print('Nice try.\nPermission denied.\nSTAROS refuses to self-destruct.');
      } else {
        ctx.print(`command not found: ${cmdName}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className="p-4 font-mono text-sm h-full flex flex-col bg-surface text-on-surface"
      onClick={handleClick}
    >
      <div className="opacity-70 mb-4 whitespace-pre-wrap">
        STAROS Terminal v1.0
        <br/>
        Type "help" to get started.
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col" ref={scrollRef}>
        {history.map((item) => (
          <div key={item.id} className="mb-2">
            {item.isCommand ? (
              <div className="flex gap-2">
                <span className="text-primary">&gt;</span>
                <span>{item.content}</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-on-surface-variant opacity-80 mt-1">
                {item.content}
              </div>
            )}
          </div>
        ))}
        
        <div className="flex gap-2 items-center mt-2 shrink-0">
          <span className="text-primary">&gt;</span>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
              setInput('');
            }}
            className="flex-1"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none border-none text-on-surface font-mono"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
}


