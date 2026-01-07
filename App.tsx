
import React, { useState, useEffect, useRef } from 'react';
import { ivrFlowData, uiStrings } from './constants';
import type { MainMenuOption, SymptomOption, ResourceOption, NotificationOption, TranslatableString, SubFlowOption } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PhoneSimulator } from './components/PhoneSimulator';
import { speak, stopSpeech } from './utils/speech';

type IvrLocation = 'WELCOME' | 'MAIN_MENU' | `SUB_FLOW_${string}` | `RESPONSE_${string}_${string}`;

const App: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'ACTIVE'>('IDLE');
  const [location, setLocation] = useState<IvrLocation>('WELCOME');
  const [history, setHistory] = useState<IvrLocation[]>([]);
  const [displayText, setDisplayText] = useState<string[]>(['Press CALL to start.']);
  const [language, setLanguage] = useState('en');
  const [symptomHistory, setSymptomHistory] = useState<string[]>([]);
  
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = (textObj: TranslatableString) => textObj[language] || textObj.en;
    
    const getDisplayText = (): string[] => {
      if (status === 'IDLE') return [t(uiStrings.pressCall)];
      
      switch (location) {
        case 'WELCOME': {
          const lines = [t(ivrFlowData.welcomeMessage.prompt)];
          ivrFlowData.languages.forEach(l => lines.push(`${l.key}: ${l.language}`));
          return lines;
        }
        case 'MAIN_MENU': {
          const lines = [t(uiStrings.chooseService)];
          ivrFlowData.mainMenu.forEach(o => lines.push(`${o.key}: ${t(o.feature)}`));
          return lines;
        }
        default: {
          if (location.startsWith('SUB_FLOW_')) {
            const menuKey = location.replace('SUB_FLOW_', '');
            const menu = ivrFlowData.mainMenu.find(m => m.key === menuKey);
            if (!menu || !menu.subFlow) return [t(uiStrings.error)];
            
            const lines = [`"${t(menu.subFlow.prompt)}"`];
            if (menu.subFlow.options.length > 0) {
              menu.subFlow.options.forEach((opt: SubFlowOption) => {
                  const optionText = 'symptom' in opt ? t(opt.symptom) : t(opt.option);
                  lines.push(`${opt.key}: ${optionText}`);
              });
            } else {
               lines.push("...");
            }
            return lines;
          }
          if (location.startsWith('RESPONSE_')) {
            const [menuKey, optionKey] = location.replace('RESPONSE_', '').split('_');
            const menu = ivrFlowData.mainMenu.find(m => m.key === menuKey);
            const option = menu?.subFlow?.options?.find((o) => o.key === optionKey);
            
            if (menuKey === '3' && optionKey === '1') {
                const historyLines = symptomHistory.length > 0 
                  ? [t(uiStrings.historyTitle), ...symptomHistory.map((s, i) => `${i+1}. ${s}`)]
                  : ["No history found."];
                return [...historyLines, " ", t(uiStrings.pressBack)];
            }

            if (!option) return [t(uiStrings.error)];
            
            const responseText = 'symptom' in option
              ? t((option as SymptomOption).response)
              : t((option as ResourceOption | NotificationOption).description);
              
            return [t(uiStrings.response), responseText, " ", t(uiStrings.pressBack)];
          }
          return [t(uiStrings.unknownState)];
        }
      }
    };
    
    const newDisplayText = getDisplayText();
    setDisplayText(newDisplayText);
    if (status === 'ACTIVE') {
      speak(newDisplayText, language);
    }

  }, [status, location, language, symptomHistory]);

  const handleKeyPress = (key: string) => {
    if (key === 'CALL') {
      setStatus('ACTIVE');
      setLocation('WELCOME');
      setHistory([]);
      return;
    }
    if (key === 'END') {
      stopSpeech();
      setStatus('IDLE');
      setLanguage('en');
      return;
    }
    if (status === 'IDLE') return;

    if (key === 'UP') {
      screenRef.current?.scrollBy({ top: -60, behavior: 'smooth' });
      return;
    }
    if (key === 'DOWN') {
      screenRef.current?.scrollBy({ top: 60, behavior: 'smooth' });
      return;
    }

    if (key === 'BACK' || key === 'LEFT') {
      const prevLocation = history.pop();
      if (prevLocation) {
        setLocation(prevLocation);
        setHistory([...history]);
      } else if (location !== 'MAIN_MENU' && location !== 'WELCOME') {
        setLocation('MAIN_MENU');
      } else if (location === 'MAIN_MENU') {
        setLocation('WELCOME');
      }
      return;
    }

    const newHistory = [...history, location];

    if (location === 'WELCOME') {
      const selectedLang = ivrFlowData.languages.find(l => l.key === key);
      if (selectedLang) {
        setLanguage(selectedLang.code);
        setLocation('MAIN_MENU');
        setHistory(newHistory);
      }
    } else if (location === 'MAIN_MENU') {
      const selectedOption = ivrFlowData.mainMenu.find(o => o.key === key);
      if (selectedOption?.subFlow) {
        setLocation(`SUB_FLOW_${key}`);
        setHistory(newHistory);
      }
    } else if (location.startsWith('SUB_FLOW_')) {
      const menuKey = location.replace('SUB_FLOW_', '');
      const menu = ivrFlowData.mainMenu.find(m => m.key === menuKey);
      if (menu?.subFlow?.options) {
        const selectedOption = menu.subFlow.options.find((o) => o.key === key);
        if (selectedOption) {
          if ('symptom' in selectedOption) {
            const sympName = selectedOption.symptom[language] || selectedOption.symptom.en;
            setSymptomHistory(prev => [sympName, ...prev].slice(0, 5));
          }
          setLocation(`RESPONSE_${menuKey}_${key}`);
          setHistory(newHistory);
        }
      }
    }
  };

  const simulateSms = () => {
    const randomSymptoms = ["Diabetes Update", "BP Reading: 120/80", "Cholesterol Sync", "New Allergy: Dust"];
    const update = randomSymptoms[Math.floor(Math.random() * randomSymptoms.length)];
    setSymptomHistory(prev => [`[SMS] ${update}`, ...prev].slice(0, 5));
    alert(`Incoming SMS update: ${update}`);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary font-sans flex flex-col items-center justify-between p-4 overflow-x-hidden">
      <Header />
      
      <div className="mb-4">
         <button 
           onClick={simulateSms}
           className="bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors"
         >
           Simulate Receive SMS Update
         </button>
      </div>

      <main className="flex-grow flex items-center justify-center w-full max-w-lg">
        <PhoneSimulator 
          screenRef={screenRef} 
          displayText={displayText} 
          onKeyPress={handleKeyPress} 
          status={status} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
