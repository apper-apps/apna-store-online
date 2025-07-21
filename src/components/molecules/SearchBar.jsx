import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10"
        />
        <ApperIcon 
          name="Search" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
        />
      </div>
      <Button type="submit" size="md" className="px-4">
        <ApperIcon name="Search" className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default SearchBar;