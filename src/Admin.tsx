import React, { useState } from 'react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const prefixes = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];

  const getMessage = (link: string) => {
    return `Dear ${prefix} ${guestName} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${link}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Nuwan & Pabashi`;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    
    const url = new URL(window.location.origin);
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('guest', guestName.trim());
    setGeneratedLink(url.toString());
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const copyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyMessage = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(getMessage(generatedLink));
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="h-[100dvh] w-full bg-[#fdfaf5] py-12 px-4 font-montserrat overflow-y-auto flex flex-col items-center">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] max-w-lg w-full h-fit border border-[#f3a7cd]/30 my-auto shrink-0">
        <h1 className="font-cinzel text-2xl font-bold text-[#522642] mb-6 text-center">Invitation Link Generator</h1>
        
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">Prefix</label>
            <select 
              value={prefix} 
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-[#fdfaf5] border border-[#f3a7cd]/50 px-4 py-3 rounded-lg text-stone-800 focus:outline-none focus:border-[#bc5f99] transition-all"
            >
              {prefixes.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">Guest Name</label>
            <input 
              type="text" 
              value={guestName} 
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Sanjaya"
              className="w-full bg-[#fdfaf5] border border-[#f3a7cd]/50 px-4 py-3 rounded-lg text-stone-800 focus:outline-none focus:border-[#bc5f99] transition-all placeholder:text-stone-300"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#522642] text-white font-bold py-3 rounded-lg uppercase tracking-wider text-sm hover:bg-[#2c1323] transition-colors"
          >
            Generate Link
          </button>
        </form>

        {generatedLink && (
          <div className="mt-8 pt-8 border-t border-[#f3a7cd]/30 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Generated Link</label>
              <div className="p-3 bg-stone-50 border border-[#f3a7cd]/50 rounded-lg text-sm text-stone-600 break-all">
                {generatedLink}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={copyLink}
                className="flex-1 bg-white border border-[#f3a7cd] text-[#522642] font-bold py-2 px-4 rounded-lg text-sm hover:bg-[#fdfaf5] transition-colors"
              >
                {copiedLink ? "Copied!" : "Copy Link Only"}
              </button>
              <button 
                onClick={copyMessage}
                className="flex-1 bg-[#522642] text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-[#2c1323] transition-colors"
              >
                {copiedMessage ? "Copied!" : "Copy Full Message"}
              </button>
            </div>
            
            <div className="mt-4 text-xs text-stone-500 whitespace-pre-wrap bg-stone-50 p-4 rounded-lg border border-stone-200">
              {getMessage(generatedLink)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
