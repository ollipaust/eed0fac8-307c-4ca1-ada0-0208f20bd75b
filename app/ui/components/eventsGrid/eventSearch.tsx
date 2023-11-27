import React from "react"
import { useSearch } from "~/utils/appContextProvider"

const EventSearch: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
  }

  return (
    <div>
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} />
    </div>
  )
}

export default EventSearch
