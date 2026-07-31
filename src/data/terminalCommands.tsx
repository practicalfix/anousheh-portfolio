import React from 'react';
import { cosmicEvents } from '../utils/cosmicEventBus';
import type { Settings } from '../context/SettingsContext';

export interface TerminalContext {
  settings: Settings;
  print: (node: React.ReactNode) => string;
  update: (id: string, node: React.ReactNode) => void;
  clear: () => void;
}

export interface TerminalCommand {
  name: string;
  description: string;
  execute: (args: string[], ctx: TerminalContext) => Promise<void> | void;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const quotes = [
  "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” – Martin Fowler",
  "“First, solve the problem. Then, write the code.” – John Johnson",
  "“Experience is the name everyone gives to their mistakes.” – Oscar Wilde",
  "“In order to be irreplaceable, one must always be different.” – Coco Chanel",
  "“Java is to JavaScript what car is to Carpet.” – Chris Heilmann",
  "“Knowledge is power.” – Francis Bacon",
  "“Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.” – Dan Salomon",
  "“Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.” – Antoine de Saint-Exupery",
  "“Ruby is rubbish! PHP is phpantastic!” – Nikita Popov",
  "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
  "“Fix the cause, not the symptom.” – Steve Maguire",
  "“Optimism is an occupational hazard of programming: feedback is the treatment.” – Kent Beck",
  "“When to use iterative development? You should use iterative development only on projects that you want to succeed.” – Martin Fowler",
  "“Simplicity is the soul of efficiency.” – Austin Freeman",
  "“Before software can be reusable it first has to be usable.” – Ralph Johnson",
  "“Make it work, make it right, make it fast.” – Kent Beck"
];

export const terminalCommands: TerminalCommand[] = [
  {
    name: 'help',
    description: 'Displays all available commands.',
    execute: (_, ctx) => {
      const helpText = terminalCommands.map(cmd => `${cmd.name.padEnd(15)} - ${cmd.description}`).join('\n');
      ctx.print(`Available commands:\n\n${helpText}\n\nHint: Try 'whoami', 'cat', 'coffee', or 'neofetch'`);
    }
  },
  {
    name: 'clear',
    description: 'Clears the terminal.',
    execute: (_, ctx) => {
      ctx.clear();
    }
  },
  {
    name: 'quote',
    description: 'Displays one random programming quote.',
    execute: (_, ctx) => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      ctx.print(quote);
    }
  },
  {
    name: 'coffee',
    description: 'Brews a fresh cup of coffee.',
    execute: async (_, ctx) => {
      const id = ctx.print('Brewing coffee...');
      await delay(1500);
      ctx.update(id, 'Brewing coffee...\n\n☕\n\n+10 Productivity');
    }
  },
  {
    name: 'cat',
    description: 'Displays a pixel ASCII cat.',
    execute: (_, ctx) => {
      ctx.print(
` /\\_/\\
( o.o )
 > ^ <

Meow! 🐾`
      );
    }
  },
  {
    name: 'aboutstaros',
    description: 'Explain STAROS in 3–4 concise sentences.',
    execute: (_, ctx) => {
      ctx.print('STAROS is an interactive, retro-inspired operating system interface built to showcase a personal portfolio. It features draggable windows, CRT aesthetic effects, and dynamic data binding through React and TypeScript. By imitating classic 90s systems, it offers a nostalgic and engaging way for recruiters to explore projects, skills, and credentials.');
    }
  },
  {
    name: 'neofetch',
    description: 'Display a retro system information panel.',
    execute: (_, ctx) => {
      ctx.print(
        <div className="flex flex-col sm:flex-row gap-6 mt-2">
          <div className="text-primary font-bold hidden sm:block whitespace-pre">
{`   _____ _______       _____   ____   _____ 
  / ____|__   __|/\\   |  __ \\ / __ \\ / ____|
 | (___    | |  /  \\  | |__) | |  | | (___  
  \\___ \\   | | / /\\ \\ |  _  /| |  | |\\___ \\ 
  ____) |  | |/ ____ \\| | \\ \\| |__| |____) |
 |_____/   |_/_/    \\_\\_|  \\_\\\\____/|_____/ `}
          </div>
          <div className="flex flex-col gap-1 text-on-surface">
            <span className="text-primary font-bold">STAROS v1.0</span>
            <span className="text-outline-variant">-------------------</span>
            <div className="grid grid-cols-2 gap-x-4">
              <span className="text-primary">User:</span><span>Anousheh</span>
              <span className="text-primary">Portfolio:</span><span>STAROS</span>
              <span className="text-primary">Projects:</span><span>3</span>
              <span className="text-primary">Credentials:</span><span>3</span>
              <span className="text-primary">Built With:</span><span>React, TypeScript, Tailwind CSS</span>
            </div>
          </div>
        </div>
      );
    }
  },
  {
    name: 'whoami',
    description: 'Displays the user profile card.',
    execute: async (_, ctx) => {
      const id = ctx.print('Loading user profile...\n\n█□□□□□□□□□ 10%');
      
      await delay(400);
      ctx.update(id, 'Loading user profile...\n\n███□□□□□□□ 30%');
      
      await delay(500);
      ctx.update(id, 'Loading user profile...\n\n██████□□□□ 60%');
      
      await delay(600);
      ctx.update(id, 'Loading user profile...\n\n██████████ 100%');
      
      await delay(300);
      ctx.update(id, (
        <div className="mt-4 mb-2 max-w-[500px] bg-surface-container-lowest border border-outline-variant/30 rounded-sm p-4 relative overflow-hidden">
          {/* Subtle scanline effect inside the card */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]"></div>
          
          <div className="flex flex-col sm:flex-row gap-6 relative z-10">
            {/* Left: Avatar */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-sm overflow-hidden bg-surface-container-highest p-1 flex items-center justify-center">
                <img 
                  src="/src/assets/profile/pixel-avatar.jpg" 
                  alt="Pixel Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Right: Info */}
            <div className="flex flex-col flex-1 gap-4 font-mono text-xs sm:text-sm">
              <div className="flex flex-col">
                <span className="text-primary font-bold">Name: <span className="text-on-surface font-normal">Anousheh</span></span>
                <span className="text-primary font-bold mt-1">Role: <span className="text-on-surface font-normal">Computer Science Engineering Student</span></span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-primary font-bold border-b border-outline-variant/20 pb-1 mb-1">Building:</span>
                <span className="text-on-surface before:content-['•_'] before:text-primary">STAROS</span>
                <span className="text-on-surface before:content-['•_'] before:text-primary">Diskette</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-primary font-bold border-b border-outline-variant/20 pb-1 mb-1">Current Focus:</span>
                <span className="text-on-surface before:content-['•_'] before:text-primary">React</span>
                <span className="text-on-surface before:content-['•_'] before:text-primary">Operating Systems</span>
                <span className="text-on-surface before:content-['•_'] before:text-primary">Web Development</span>
              </div>
              
              <div className="flex flex-col mt-1 bg-surface-container-highest/50 p-2 rounded-sm border border-outline-variant/10">
                <span className="text-primary font-bold text-xs mb-1">Status:</span>
                <span className="text-on-surface">☕ Probably coding.</span>
              </div>
            </div>
          </div>
        </div>
      ));
    }
  },
  {
    name: 'star',
    description: '???',
    execute: async (_, ctx) => {
      if (!ctx.settings.cosmicEvents) {
        ctx.print('Cosmic events are disabled in Settings.');
        return;
      }
      
      const id = ctx.print('Searching deep space...');
      await delay(1000);
      ctx.update(id, 'Searching deep space...\n\nCosmic anomaly detected.\nInitializing observation mode...');
      
      cosmicEvents.dispatch('star');
      
      await delay(15000);
      ctx.print('Observation complete.\nReturning to normal operation.');
    }
  },
  {
    name: 'stars',
    description: '???',
    execute: async (args, ctx) => {
      // Alias for star
      const starCommand = terminalCommands.find(c => c.name === 'star');
      if (starCommand) {
        await starCommand.execute(args, ctx);
      }
    }
  }
];
