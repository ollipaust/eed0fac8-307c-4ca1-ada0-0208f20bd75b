import React, { createContext, useContext, useEffect, useState, Suspense } from "react"

// Event Context
interface EventContextProps {
  eventsByDate: Record<string, any[]>
  loading: boolean
  error: Error | null
}

const EventContext = createContext<EventContextProps | undefined>(undefined)

export const useEventContext = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider")
  }
  return context
}

// Search Context
interface SearchContextProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within the SearchProvider")
  }
  return context
}

interface ShoppingCartContextProps {
  cart: any[]
  addToCart: (item: any) => void
  removeFromCart: (item: any) => void
  maxCartItemsSelected: number
}

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined)
const maxCartItemsSelected = 10

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext)
  if (!context) {
    throw new Error("useShoppingCartContext must be used within ShoppingCartProvider")
  }
  return { ...context, maxCartItemsSelected }
}

// Combined Context Provider
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://teclead-ventures.github.io/data/london-events.json")
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const eventsByDate: Record<string, any[]> = events.reduce((acc, event) => {
    const date = new Date(event.startTime).toLocaleDateString()
    acc[date] = [...(acc[date] || []), event]
    return acc
  }, {})

  // Search Provider Logic
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      const { data, timestamp } = JSON.parse(storedCart)
      const expirationTime = 24 * 60 * 60 * 1000 // 24h in ms
      if (Date.now() - timestamp <= expirationTime) {
        setCart(data)
      }
    }
  }, [])

  useEffect(() => {
    const timestamp = Date.now()
    localStorage.setItem("cart", JSON.stringify({ data: cart, timestamp }))
  }, [cart])

  const addToCart = (item: any) => {
    if (!cart.some((cartItem) => cartItem._id === item._id)) {
      setCart((prevCart) => [...prevCart, item])
    }
  }

  const removeFromCart = (item: any) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== item._id))
  }

  return (
    <Suspense fallback={<div>Loading Data...</div>}>
      <EventContext.Provider value={{ eventsByDate, loading, error }}>
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart, maxCartItemsSelected }}>
            {children}
          </ShoppingCartContext.Provider>
        </SearchContext.Provider>
      </EventContext.Provider>
    </Suspense>
  )
}
