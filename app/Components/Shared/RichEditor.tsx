"use client";

import { useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  Code,
  Code2,
  List,
  ListOrdered,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

type FormatCommand =
  | "bold"
  | "italic"
  | "h2"
  | "h3"
  | "blockquote"
  | "code"
  | "pre"
  | "ul"
  | "ol"
  | "hr"
  | "link"
  | "image";

export default function RichEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  // ── FIX: Set initial HTML only once via ref, never via dangerouslySetInnerHTML
  // dangerouslySetInnerHTML on a contentEditable re-renders on every keystroke,
  // which resets the cursor to position 0 — causing reversed text and broken backspace.
  useEffect(() => {
    if (!isInitialized.current && editorRef.current) {
      editorRef.current.innerHTML = value || "";
      isInitialized.current = true;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // If value is cleared from outside (e.g. reset form), sync it
  useEffect(() => {
    if (isInitialized.current && editorRef.current && value === "") {
      editorRef.current.innerHTML = "";
    }
  }, [value]);

  const saveRange = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) return sel.getRangeAt(0).cloneRange();
    return null;
  }, []);

  const restoreRange = useCallback((range: Range | null) => {
    if (!range) return;
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, []);

  const insertBlock = useCallback(
    (html: string) => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      range.deleteContents();

      const template = document.createElement("div");
      template.innerHTML = html;
      const frag = document.createDocumentFragment();
      let lastNode: Node | null = null;
      Array.from(template.childNodes).forEach((node) => {
        lastNode = frag.appendChild(node);
      });
      range.insertNode(frag);

      if (lastNode) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      onChange(editorRef.current?.innerHTML || "");
    },
    [onChange],
  );

  const wrapSelection = useCallback(
    (tag: string) => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      const el = document.createElement(tag);

      if (range.collapsed) {
        el.textContent = tag.toUpperCase();
        range.insertNode(el);
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        range.surroundContents(el);
      }

      onChange(editorRef.current?.innerHTML || "");
    },
    [onChange],
  );

  const handleFormat = useCallback(
    (cmd: FormatCommand) => {
      editorRef.current?.focus();

      switch (cmd) {
        case "bold":
          document.execCommand("bold");
          break;
        case "italic":
          document.execCommand("italic");
          break;
        case "h2":
          insertBlock("<h2>Heading 2</h2><p><br></p>");
          break;
        case "h3":
          insertBlock("<h3>Heading 3</h3><p><br></p>");
          break;
        case "blockquote":
          insertBlock(
            "<blockquote>Add your quote here...</blockquote><p><br></p>",
          );
          break;
        case "code":
          wrapSelection("code");
          break;
        case "pre":
          insertBlock(
            "<pre><code>// paste your code here\n</code></pre><p><br></p>",
          );
          break;
        case "ul":
          insertBlock(
            "<ul><li>First item</li><li>Second item</li></ul><p><br></p>",
          );
          break;
        case "ol":
          insertBlock(
            "<ol><li>First item</li><li>Second item</li></ol><p><br></p>",
          );
          break;
        case "hr":
          insertBlock("<hr/><p><br></p>");
          break;
        case "link": {
          const url = prompt("Enter URL:");
          if (!url) break;
          const savedRange = saveRange();
          const sel = window.getSelection();
          if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
            document.execCommand("createLink", false, url);
          } else {
            restoreRange(savedRange);
            const linkText = prompt("Link text:") || url;
            insertBlock(`<a href="${url}">${linkText}</a>`);
          }
          break;
        }
        case "image": {
          const src = prompt("Image URL:");
          if (!src) break;
          const alt = prompt("Alt text (optional):") || "";
          insertBlock(`<img src="${src}" alt="${alt}" /><p><br></p>`);
          break;
        }
      }

      setTimeout(() => {
        onChange(editorRef.current?.innerHTML || "");
      }, 0);
    },
    [insertBlock, wrapSelection, saveRange, restoreRange, onChange],
  );

  // ── FIX: Use onInput directly — don't re-set innerHTML on every change
  const handleInput = useCallback(() => {
    onChange(editorRef.current?.innerHTML || "");
  }, [onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        document.execCommand("insertHTML", false, "&nbsp;&nbsp;&nbsp;&nbsp;");
        onChange(editorRef.current?.innerHTML || "");
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        handleFormat("bold");
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "i") {
        e.preventDefault();
        handleFormat("italic");
      }
    },
    [handleFormat, onChange],
  );

  const toolbarGroups: Array<
    Array<{ cmd: FormatCommand; icon: React.ReactNode; title: string }>
  > = [
    [
      { cmd: "bold", icon: <Bold size={14} />, title: "Bold (⌘B)" },
      { cmd: "italic", icon: <Italic size={14} />, title: "Italic (⌘I)" },
    ],
    [
      { cmd: "h2", icon: <Heading2 size={14} />, title: "Heading 2" },
      { cmd: "h3", icon: <Heading3 size={14} />, title: "Heading 3" },
    ],
    [
      { cmd: "blockquote", icon: <Quote size={14} />, title: "Blockquote" },
      { cmd: "code", icon: <Code size={14} />, title: "Inline code" },
      { cmd: "pre", icon: <Code2 size={14} />, title: "Code block" },
    ],
    [
      { cmd: "ul", icon: <List size={14} />, title: "Bullet list" },
      { cmd: "ol", icon: <ListOrdered size={14} />, title: "Numbered list" },
    ],
    [
      { cmd: "hr", icon: <Minus size={14} />, title: "Divider" },
      { cmd: "link", icon: <LinkIcon size={14} />, title: "Insert link" },
      {
        cmd: "image",
        icon: <ImageIcon size={14} />,
        title: "Insert image URL",
      },
    ],
  ];

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "6px",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Toolbar — sticky so it stays visible while scrolling long posts */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "0.5rem 0.75rem",
          flexWrap: "wrap",
          gap: "0.25rem",
          position: "sticky",
          top: "60px", // sits just below the page header
          zIndex: 10,
        }}
      >
        {toolbarGroups.map((group, gi) => (
          <div
            key={gi}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.1rem",
              paddingRight: gi < toolbarGroups.length - 1 ? "0.75rem" : "0",
              marginRight: gi < toolbarGroups.length - 1 ? "0.5rem" : "0",
              borderRight:
                gi < toolbarGroups.length - 1
                  ? "1px solid var(--border)"
                  : "none",
            }}
          >
            {group.map(({ cmd, icon, title }) => (
              <button
                key={cmd}
                type="button"
                title={title}
                onMouseDown={(e) => {
                  e.preventDefault(); // Critical — prevents editor from losing focus
                  handleFormat(cmd);
                }}
                style={{
                  width: "30px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                  border: "1px solid transparent",
                  borderRadius: "3px",
                  cursor: "pointer",
                  color: "var(--muted)",
                  transition:
                    "color 0.15s ease, background 0.15s ease, border-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--fg)";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--bg)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "var(--border)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--muted)";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "none";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "transparent";
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* ── Editable area ─────────────────────────────────────────
          IMPORTANT: No dangerouslySetInnerHTML here.
          Initial content is set via useEffect + ref.
          This prevents React from resetting the DOM (and cursor) on every keystroke.
      ─────────────────────────────────────────────────────────── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder || "Start writing..."}
        style={{
          minHeight: "520px",
          padding: "1.75rem 2rem",
          outline: "none",
          fontSize: "1rem",
          lineHeight: 1.85,
          color: "var(--fg)",
          fontFamily: "'Inter', sans-serif",
        }}
      />

      <style>{`
        [contenteditable] { position: relative; }
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: var(--muted);
          pointer-events: none;
          position: absolute;
          top: 1.75rem;
          left: 2rem;
        }
        [contenteditable] h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.65rem; font-weight: 600;
          margin: 2.5rem 0 0.75rem; color: var(--fg);
          letter-spacing: -0.015em; line-height: 1.2;
        }
        [contenteditable] h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 600;
          margin: 2rem 0 0.6rem; color: var(--fg);
        }
        [contenteditable] p { margin-bottom: 1rem; color: var(--muted); }
        [contenteditable] a { color: var(--accent); text-decoration: underline; }
        [contenteditable] strong { color: var(--fg); font-weight: 600; }
        [contenteditable] em { font-style: italic; }
        [contenteditable] code {
          background: var(--surface); border: 1px solid var(--border);
          padding: 0.15rem 0.4rem; border-radius: 3px;
          font-size: 0.86em; font-family: 'Fira Code', monospace; color: var(--fg);
        }
        [contenteditable] pre {
          background: var(--dark-bg); color: #E5E7EB;
          padding: 1.25rem 1.5rem; border-radius: 6px;
          overflow-x: auto; margin: 1.5rem 0;
          font-size: 0.86rem; line-height: 1.75;
          border: 1px solid var(--dark-border); font-family: 'Fira Code', monospace;
        }
        [contenteditable] pre code { background: none; border: none; padding: 0; color: inherit; }
        [contenteditable] ul, [contenteditable] ol {
          padding-left: 1.5rem; margin-bottom: 1.25rem; color: var(--muted);
        }
        [contenteditable] li { margin-bottom: 0.4rem; line-height: 1.75; }
        [contenteditable] blockquote {
          border-left: 3px solid var(--accent);
          padding: 0.75rem 1.25rem; margin: 1.5rem 0;
          background: var(--surface); border-radius: 0 4px 4px 0;
          font-style: italic; color: var(--muted);
          font-family: 'Playfair Display', serif; font-size: 1.05rem;
        }
        [contenteditable] img {
          max-width: 100%; border-radius: 6px;
          border: 1px solid var(--border); margin: 1rem 0; display: block;
        }
        [contenteditable] hr {
          border: none; border-top: 1px solid var(--border); margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
