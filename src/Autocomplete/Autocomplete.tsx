"use client"
import React, { useState, useRef } from "react";

const HTML_TAGS = ["div", "span", "p", "img", "a", "button", "input", "ul", "li"];

export const Autocomplete=()=> {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValue(val);

    const word = getCurrentWord(val, e.target.selectionStart);
    if (word.startsWith("<")) {
      const partial = word.slice(1); // bỏ dấu <
      const matches = HTML_TAGS.filter((tag) => tag.startsWith(partial));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }

    setCursor(e.target.selectionStart);
  };

  const getCurrentWord = (text: string, pos: number) => {
    const left = text.slice(0, pos);
    const match = left.match(/<[\w-]*$/);
    return match ? match[0] : "";
  };

  const handleSelectSuggestion = (tag: string) => {
    if (!textareaRef.current) return;

    const start = value.slice(0, cursor);
    const end = value.slice(cursor);

    const currentWord = getCurrentWord(value, cursor);
    const newValue = start.slice(0, start.length - currentWord.length) + `<${tag}>` + end;

    setValue(newValue);
    setSuggestions([]);

    // đặt lại con trỏ
    const newPos = start.length - currentWord.length + tag.length + 2; // +2 for < and >
    requestAnimationFrame(() => {
      textareaRef.current!.selectionStart = newPos;
      textareaRef.current!.selectionEnd = newPos;
      textareaRef.current!.focus();
    });
  };

  return (
    <div className="editor-container">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="editor-textarea"
        placeholder="Gõ HTML ở đây..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-box">
          {suggestions.map((tag, i) => (
            <li key={i} onClick={() => handleSelectSuggestion(tag)}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
