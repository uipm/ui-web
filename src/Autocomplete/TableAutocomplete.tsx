// src/components/TableAutocomplete.tsx
"use client"
import React, { useState, useEffect, useRef } from "react";
import { cn } from "../_common/helper";

export type Column = {
  id: string;
  label: string;
};

type Props<T> = {
  columns: Column[];
  data: T[];
  value?: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  defaultValue?:string;
  getLabel?: (obj: T) => string;
  searchType?: "start" | "include" | "end"
};

export default function TableAutocomplete<T extends Record<string, any>>({
  columns,
  data,
  value,
  onChange,
  placeholder = "Tìm kiếm...",
  getLabel = (obj: any) => obj.name,
  defaultValue,
  searchType = 'include'
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(data);
    } else {
      const lowerSearch = search.toLowerCase();
      const result = data.filter((row) =>
        columns.some((col) => {
          const value = String(row[col.id]).toLowerCase();
          switch (searchType) {
            case "start":
              return value.startsWith(lowerSearch);
            case "end":
              return value.endsWith(lowerSearch);
            case "include":
            default:
              return value.includes(lowerSearch);
          }
        })
      );
      setFilteredData(result);
    }
  }, [search, data, columns]);

  // click ngoài dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredData.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredData.length) {
        selectRow(filteredData[highlightedIndex]);
      }
    }
  };

  const selectRow = (row: T) => {
    onChange(row);
    setShowDropdown(false);
    setSearch('');
    if (inputRef.current) {
      inputRef.current.value = getLabel(row);
    }
  };

  // Khi focus => bôi đen toàn bộ
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
    setShowDropdown(true);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        autoComplete='false'
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search || value && getLabel(value) || ''}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      {/* Icon xổ xuống */}
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-80 overflow-auto">
          {filteredData.length === 0 ? (
            <div className="p-2 text-gray-500 text-sm">Không tìm thấy</div>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.id}
                      className="px-3 py-2 font-medium text-gray-700"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 20).map((row, idx) => (
                  <tr
                    key={idx}
                    className={cn(
                      "cursor-pointer hover:bg-blue-100",
                      highlightedIndex === idx && "bg-blue-100"
                    )}
                    onClick={() => selectRow(row)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className="px-3 py-2 border-t border-gray-200"
                      >
                        {row[col.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
