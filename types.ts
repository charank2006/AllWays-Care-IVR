export type TranslatableString = {
  en: string;
  [key: string]: string;
};

export interface LanguageOption {
  key: string;
  code: string; // e.g., 'en', 'hi'
  language: string;
  prompt: string;
}

export interface SymptomOption {
  key: string;
  symptom: TranslatableString;
  response: TranslatableString;
}

export interface ResourceOption {
  key: string;
  option: TranslatableString;
  description: TranslatableString;
}

export interface NotificationOption {
  key: string;
  option: TranslatableString;
  description: TranslatableString;
}

export type SubFlowOption = SymptomOption | ResourceOption | NotificationOption;

export interface SubFlow {
  title: TranslatableString;
  prompt: TranslatableString;
  options: SubFlowOption[];
  notes?: string[];
}

export interface MainMenuOption {
  key: string;
  feature: TranslatableString;
  description: TranslatableString;
  subFlow?: SubFlow;
}

export interface IvrFlow {
  welcomeMessage: { title: string; prompt: TranslatableString };
  languages: LanguageOption[];
  mainMenu: MainMenuOption[];
  exitMessage: { title: string; message: TranslatableString };
}

export interface TechStackItem {
  layer: string;
  technology: string;
  role: string;
}
