"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";

interface EditableSectionProps {
  id: string;
  title: string;
  defaultContent?: string;
  children: React.ReactNode;
  className?: string;
}

export default function EditableSection({
  id,
  title,
  children,
  className = "",
}: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasSavedContent, setHasSavedContent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const originalContentRef = useRef<string | null>(null);

  // Restore saved content from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`altoflow-section-${id}`);
    if (saved && sectionRef.current) {
      const innerDiv = sectionRef.current.querySelector("[data-editable-content]");
      if (innerDiv) {
        innerDiv.innerHTML = saved;
        setHasSavedContent(true);
      }
    }
  }, [id]);

  const toggleEdit = useCallback(() => {
    if (!isEditing) {
      // Store original content before editing
      if (sectionRef.current) {
        const innerDiv = sectionRef.current.querySelector("[data-editable-content]");
        if (innerDiv) {
          originalContentRef.current = innerDiv.innerHTML;
        }
      }
    }
    setIsEditing((prev) => !prev);
  }, [isEditing]);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    if (sectionRef.current) {
      const innerDiv = sectionRef.current.querySelector("[data-editable-content]");
      if (innerDiv) {
        const content = innerDiv.innerHTML;
        localStorage.setItem(`altoflow-section-${id}`, content);
        setHasSavedContent(true);
      }
    }
  }, [id]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    if (originalContentRef.current && sectionRef.current) {
      const innerDiv = sectionRef.current.querySelector("[data-editable-content]");
      if (innerDiv) {
        innerDiv.innerHTML = originalContentRef.current;
      }
    }
  }, []);

  const handleReset = useCallback(() => {
    localStorage.removeItem(`altoflow-section-${id}`);
    setHasSavedContent(false);
    // Reload the page to restore original content
    window.location.reload();
  }, [id]);

  return (
    <section
      id={id}
      className={`relative group transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edit Controls */}
      <div
        className={`no-print fixed z-50 flex items-center gap-2 px-3 py-2 glass rounded-full shadow-lg transition-all duration-200 ${
          isHovered || isEditing
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{
          top: "1rem",
          right: "1rem",
        }}
      >
        <span className="text-xs font-medium text-muted font-mono">
          {title}
        </span>
        <div className="w-px h-4 bg-line" />

        {hasSavedContent && !isEditing && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 transition-colors"
            aria-label="Restaurar conteúdo original"
          >
            Restaurar
          </button>
        )}

        {!isEditing ? (
          <button
            onClick={toggleEdit}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label={`Editar seção ${title}`}
          >
            <Pencil size={12} />
            Editar
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
              aria-label="Salvar edições"
            >
              <Check size={12} />
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
              aria-label="Cancelar edições"
            >
              <X size={12} />
              Cancelar
            </button>
          </>
        )}
      </div>

      {/* Content Area */}
      <div ref={sectionRef} className="relative">
        <div
          data-editable-content
          contentEditable={isEditing}
          suppressContentEditableWarning
          className={`transition-all duration-200 ${
            isEditing
              ? "ring-2 ring-primary/20 ring-offset-4 ring-offset-white rounded-lg"
              : ""
          } ${hasSavedContent && !isEditing ? "after:absolute after:top-2 after:right-2 after:text-[10px] after:text-orange-400 after:font-mono after:content-['editado'] after:opacity-40" : ""}`}
        >
          {children}
        </div>
      </div>

      {/* Edit mode indicator */}
      {isEditing && (
        <div className="no-print mt-4 px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-lg">
          <p className="text-xs text-muted font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Modo de edição ativo — clique no texto para editar diretamente
          </p>
        </div>
      )}
    </section>
  );
}
