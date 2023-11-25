import React, { createContext, useContext, useEffect, useState, Suspense } from 'react';
import type { ReactNode } from 'react';

// Define the context
type EventContextType = {
  events: any[]; // maybe adjust type
  loading: boolean;
  error: Error | null;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

// create custom hook to use context
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

// create provider component
interface EventProviderProps {
  children: ReactNode;
}
export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<any[]>([]); // maybe adjust type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://teclead-ventures.github.io/data/london-events.json');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventContext.Provider value={{ events, loading, error }}>
        {children}
      </EventContext.Provider>
    </Suspense>
  );
};