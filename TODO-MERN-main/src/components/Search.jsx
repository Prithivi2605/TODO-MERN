import React from 'react'

const Search = ({search, setSearch, submitTask}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    submitTask(search);
    setSearch('');
  }

  return (
    <form action="" onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-4">
      <div className="w-full max-w-lg mx-auto">
        <div className="flex items-center relative w-full">
          <svg
            className="absolute left-3 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pl-10 pr-3 text-base border border-gray-300 rounded-full outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    </form>
  )
}

export default Search