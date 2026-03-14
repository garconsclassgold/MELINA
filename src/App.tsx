import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Cloud, 
  Baby, 
  Gift,
  ChevronDown
} from 'lucide-react';
import { EVENT_DETAILS, GUESTS } from './constants';

// Decorative falling elements component
const FallingDecorations = () => {
  const [elements, setElements] = useState<{ id: number; x: number; delay: number; duration: number; type: string }[]>([]);

  useEffect(() => {
    const types = ['heart', 'cloud', 'baby', 'star'];
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
      type: types[Math.floor(Math.random() * types.length)]
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: ['0vh', '110vh'],
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: el.duration, 
            repeat: Infinity, 
            delay: el.delay,
            ease: "linear"
          }}
          style={{ left: `${el.x}%` }}
          className="absolute text-guava/30"
        >
          {el.type === 'heart' && <Heart size={24} fill="currentColor" />}
          {el.type === 'cloud' && <Cloud size={28} fill="currentColor" />}
          {el.type === 'baby' && <Baby size={24} fill="currentColor" />}
          {el.type === 'star' && <div className="w-2 h-2 bg-current rounded-full" />}
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const handleWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${EVENT_DETAILS.whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const generalConfirmationMessage = `Olá! Estou confirmando minha presença no Chá de Fralda da Aurora Melina no dia 12 de abril às 18h na Piscina do Pirambu. 💕`;

  return (
    <div className="min-h-screen relative selection:bg-guava/30">
      <FallingDecorations />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 max-w-3xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <Heart className="text-guava w-16 h-16 animate-pulse" fill="currentColor" />
              <Baby className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-6 h-6" />
            </div>
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl text-guava-dark mb-6 leading-tight">
            {EVENT_DETAILS.title}
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            {EVENT_DETAILS.welcomeMessage}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleWhatsApp(generalConfirmationMessage)}
            className="bg-guava hover:bg-guava-dark text-white font-display font-medium px-8 py-4 rounded-full shadow-lg shadow-guava/20 flex items-center gap-2 mx-auto transition-colors"
          >
            <MessageCircle size={20} />
            Confirmar Presença pelo WhatsApp
          </motion.button>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-guava/50"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="py-24 px-6 bg-white/40 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-guava/10 rounded-full flex items-center justify-center text-guava mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="font-display font-semibold text-gray-500 uppercase text-xs tracking-widest mb-2">Data</h3>
              <p className="font-serif text-2xl text-guava-dark">{EVENT_DETAILS.date}</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-guava/10 rounded-full flex items-center justify-center text-guava mb-4">
                <Clock size={24} />
              </div>
              <h3 className="font-display font-semibold text-gray-500 uppercase text-xs tracking-widest mb-2">Horário</h3>
              <p className="font-serif text-2xl text-guava-dark">{EVENT_DETAILS.time}</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-guava/10 rounded-full flex items-center justify-center text-guava mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="font-display font-semibold text-gray-500 uppercase text-xs tracking-widest mb-2">Local</h3>
              <p className="font-serif text-2xl text-guava-dark">{EVENT_DETAILS.location}</p>
            </motion.div>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <p className="font-sans text-lg text-gray-600 italic">
              "{EVENT_DETAILS.infoMessage}"
            </p>
          </div>
        </div>
      </section>

      {/* Guest List Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-guava/30 flex-grow max-w-[100px]" />
            <h2 className="font-serif text-4xl text-guava-dark text-center">Lista de Convidados</h2>
            <div className="h-px bg-guava/30 flex-grow max-w-[100px]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUESTS.map((guest, index) => (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-3xl group hover:border-guava/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-serif text-2xl text-gray-800">{guest.name}</h4>
                  <div className="text-guava/20 group-hover:text-guava/40 transition-colors">
                    <Gift size={32} />
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-display uppercase tracking-wider mb-1">Vai levar:</p>
                  <p className="text-gray-700 font-medium">{guest.gift}</p>
                </div>

                <button
                  onClick={() => handleWhatsApp(guest.whatsappMessage)}
                  className="w-full py-3 px-4 rounded-2xl border-2 border-guava text-guava font-display font-semibold hover:bg-guava hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <MessageCircle size={18} />
                  Confirmar presença
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Final Confirmation */}
      <section className="py-24 px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-2xl mx-auto glass p-12 rounded-[3rem] border-guava/20"
        >
          <Heart className="text-guava mx-auto mb-6" fill="currentColor" size={40} />
          <h2 className="font-serif text-3xl text-guava-dark mb-6">Esperamos por você!</h2>
          <p className="text-gray-600 mb-10">
            Sua presença tornará este dia ainda mais especial para a Aurora Melina e para nós.
          </p>
          <button
            onClick={() => handleWhatsApp(generalConfirmationMessage)}
            className="bg-guava hover:bg-guava-dark text-white font-display font-medium px-10 py-4 rounded-full shadow-xl shadow-guava/20 flex items-center gap-2 mx-auto transition-all hover:scale-105"
          >
            <MessageCircle size={20} />
            Confirmar Presença
          </button>
        </motion.div>
        
        <div className="mt-20 text-guava/40 font-display text-xs uppercase tracking-[0.3em]">
          Com carinho, Família da Aurora Melina
        </div>
      </section>

      {/* Decorative Bows/Clouds in corners */}
      <div className="fixed top-0 left-0 p-8 opacity-20 pointer-events-none">
        <Cloud size={120} className="text-guava" />
      </div>
      <div className="fixed bottom-0 right-0 p-8 opacity-20 pointer-events-none">
        <Heart size={100} className="text-guava" />
      </div>
    </div>
  );
}
