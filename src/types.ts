export interface Guest {
  id: string;
  name: string;
  gift: string;
  whatsappMessage: string;
}

export interface EventDetails {
  title: string;
  date: string;
  time: string;
  location: string;
  welcomeMessage: string;
  infoMessage: string;
  whatsappNumber: string; // Placeholder or real number
}
