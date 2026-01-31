import { useContext, useState, useRef, useEffect } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { FilterContext } from "./FilterContext";
import { Country, State } from "country-state-city";

interface UfProps {
  uf: string;
  onUfChange: SetURLSearchParams;
}

export function FilterUf({ uf, onUfChange }: UfProps) {
  const { data } = useContext(FilterContext);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const comboboxRef = useRef<HTMLDivElement>(null);

  // Parse selected UFs - AGORA MULTIPLAS UFS
  const ufSelected = uf ? (uf.split(",")[0] !== "" ? uf.split(",") : []) : [];

  // Obter UF únicas com seu respectivo país
  const getUniqueUfsWithCountry = () => {
    if (!data) return [];

    const ufMap = new Map<string, string>();

    data.forEach((item) => {
      const ufCode = item.local?.uf;
      const countryCode = item.local?.country;

      if (ufCode && countryCode) {
        if (!ufMap.has(ufCode)) {
          ufMap.set(ufCode, countryCode);
        }
      }
    });

    // Converter map para array de objetos com uf, country e name
    return Array.from(ufMap.entries()).map(([ufCode, countryCode]) => {
      const stateName = getStateName(ufCode, countryCode);
      return {
        uf: ufCode,
        country: countryCode,
        name: stateName,
      };
    });
  };

  // Função para obter o nome do estado
  const getStateName = (ufCode: string, countryCode?: string) => {
    if (!countryCode || !ufCode) return ufCode;
    const state = State.getStateByCodeAndCountry(ufCode, countryCode);
    return state?.name || ufCode;
  };

  // Toggle UF selection (adicionar ou remover)
  const toggleUf = (ufCode: string) => {
    let updatedUfSelected;
    if (ufSelected.includes(ufCode)) {
      // Remover se já estiver selecionada
      updatedUfSelected = ufSelected.filter((e) => e !== ufCode);
    } else {
      // Adicionar se não estiver selecionada
      updatedUfSelected = [...ufSelected, ufCode];
    }

    onUfChange((params) => {
      if (updatedUfSelected.length > 0) {
        params.set("uf", updatedUfSelected.join(","));
      } else {
        params.delete("uf");
      }
      return params;
    });
  };

  // Clear all selections
  const clearAll = () => {
    onUfChange((params) => {
      params.delete("uf");
      return params;
    });
  };

  // Selecionar todos os estados filtrados
  const selectAllFiltered = () => {
    const allFilteredCodes = filteredUfs.map((item) => item.uf);
    const newSelection = [...new Set([...ufSelected, ...allFilteredCodes])];

    onUfChange((params) => {
      params.set("uf", newSelection.join(","));
      return params;
    });
  };

  // Desselecionar todos os estados filtrados
  const deselectAllFiltered = () => {
    const allFilteredCodes = filteredUfs.map((item) => item.uf);
    const newSelection = ufSelected.filter(
      (ufCode) => !allFilteredCodes.includes(ufCode),
    );

    onUfChange((params) => {
      if (newSelection.length > 0) {
        params.set("uf", newSelection.join(","));
      } else {
        params.delete("uf");
      }
      return params;
    });
  };

  // Filter UFs based on search term
  const allUfs = getUniqueUfsWithCountry().sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR"),
  );

  const filteredUfs = allUfs.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uf.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Verificar se todos os estados filtrados estão selecionados
  const allFilteredSelected =
    filteredUfs.length > 0 &&
    filteredUfs.every((item) => ufSelected.includes(item.uf));

  // Verificar se algum estado filtrado está selecionado
  const someFilteredSelected = filteredUfs.some((item) =>
    ufSelected.includes(item.uf),
  );

  // Close combobox when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Limpar busca quando fechar
  const handleToggle = () => {
    if (open) {
      setSearchTerm("");
    }
    setOpen(!open);
  };

  // Encontrar nome da UF pelo código
  const getUfName = (ufCode: string) => {
    const ufInfo = allUfs.find((item) => item.uf === ufCode);
    return ufInfo?.name || ufCode;
  };

  return (
    <div
      className="itenss"
      ref={comboboxRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "500px",
        margin: "1em auto",
      }}
    >
      {/* Botão principal */}
      <button
        type="button"
        onClick={handleToggle}
        className="mybtn"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75em 1em",
          backgroundColor: "var(--color-10)",
          color: "var(--color-5)",
          border: "0.3em solid var(--color-5)",
          borderRadius: "10em",
          fontSize: "1.25em",
          cursor: "pointer",
          transition: "all 0.2s",
          height: "2.5em",
          boxSizing: "border-box",
        }}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span
          style={{
            fontWeight: ufSelected.length > 0 ? "bold" : "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
            textAlign: "left",
            fontSize: "1em",
            paddingRight: "0.5em",
          }}
        >
          {ufSelected.length > 0
            ? `${ufSelected.length} ${ufSelected.length === 1 ? "UF selecionada" : "UFs selecionadas"}`
            : "Selecione as UFs"}
        </span>
        <svg
          style={{
            width: "1.2em",
            height: "1.2em",
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 0.5em)",
            left: 0,
            right: 0,
            backgroundColor: "var(--color-10)",
            border: "0.3em solid var(--color-5)",
            borderRadius: "1.5em",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 1000,
            maxHeight: "min(400px, 70vh)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "scaleIn 0.2s ease",
          }}
        >
          {/* Barra de busca */}
          <div
            style={{
              padding: "1em",
              position: "sticky",
              top: 0,
              backgroundColor: "var(--color-10)",
              borderBottom: "0.3em solid var(--color-5)",
              zIndex: 10,
            }}
          >
            <div className="search" style={{ width: "100%", fontSize: "1em" }}>
              <input
                type="search"
                placeholder="Buscar UF ou estado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "1em",
                  backgroundColor: "var(--color-10)",
                  color: "var(--color-5)",
                  border: "0.2em solid var(--color-5)",
                  borderRadius: "10em",
                  fontSize: "1em",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                autoFocus
              />
            </div>
          </div>

          {/* Contador de resultados e ações em lote */}
          <div
            style={{
              padding: "0.75em 1.5em",
              color: "var(--color-5)",
              fontSize: "0.9em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
          >
            <span>
              {searchTerm
                ? `${filteredUfs.length} resultado${filteredUfs.length !== 1 ? "s" : ""}`
                : `Total: ${allUfs.length} UFs`}
            </span>
            {searchTerm && filteredUfs.length > 0 && (
              <div style={{ display: "flex", gap: "0.5em" }}>
                <button
                  type="button"
                  onClick={
                    allFilteredSelected
                      ? deselectAllFiltered
                      : selectAllFiltered
                  }
                  className="mybtn-2"
                  style={{
                    padding: "0.3em 0.75em",
                    fontSize: "0.85em",
                    borderRadius: "10em",
                  }}
                >
                  {allFilteredSelected
                    ? "Desselecionar todos"
                    : "Selecionar todos"}
                </button>
              </div>
            )}
          </div>

          {/* Lista de opções */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              minHeight: "200px",
            }}
          >
            {filteredUfs.length === 0 ? (
              <div
                style={{
                  padding: "2em 1em",
                  textAlign: "center",
                  color: "var(--color-5)",
                  fontSize: "1.1em",
                }}
              >
                Nenhuma UF encontrada
              </div>
            ) : (
              filteredUfs.map((item) => (
                <div
                  key={item.uf}
                  onClick={() => toggleUf(item.uf)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1em 1.5em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: ufSelected.includes(item.uf)
                      ? "var(--color-5)"
                      : "transparent",
                    color: ufSelected.includes(item.uf)
                      ? "var(--color-10)"
                      : "var(--color-5)",
                    minHeight: "3.5em",
                  }}
                  role="option"
                  aria-selected={ufSelected.includes(item.uf)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1.5em",
                      height: "1.5em",
                      marginRight: "1em",
                      borderRadius: "0.3em",
                      border: "0.2em solid currentColor",
                      position: "relative",
                      flexShrink: 0,
                      backgroundColor: ufSelected.includes(item.uf)
                        ? "currentColor"
                        : "transparent",
                    }}
                  >
                    {ufSelected.includes(item.uf) && (
                      <svg
                        style={{
                          width: "1em",
                          height: "1em",
                          color: "var(--color-10)",
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: 0, // Previne overflow
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.1em",
                        marginBottom: "0.2em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.9em",
                        opacity: ufSelected.includes(item.uf) ? 0.9 : 0.7,
                      }}
                    >
                      {item.uf}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Botões de ação */}
          <div
            style={{
              padding: "1em",
              borderTop: "0.3em solid var(--color-5)",
              backgroundColor: "var(--color-10)",
              display: "flex",
              justifyContent: "space-between",
              gap: "0.75em",
            }}
          >
            <button
              type="button"
              onClick={clearAll}
              className="mybtn-2"
              style={{
                flex: 1,
                padding: "0.75em",
                backgroundColor: "var(--color-6)",
                color: "var(--color-5)",
                border: "none",
                borderRadius: "10em",
                fontSize: "1.1em",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5em",
              }}
              disabled={ufSelected.length === 0}
            >
              <svg
                style={{
                  width: "1.2em",
                  height: "1.2em",
                  opacity: ufSelected.length === 0 ? 0.5 : 1,
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpar tudo
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mybtn-2"
              style={{
                flex: 1,
                padding: "0.75em",
                backgroundColor: "var(--color-5)",
                color: "var(--color-10)",
                border: "none",
                borderRadius: "10em",
                fontSize: "1.1em",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5em",
              }}
            >
              <svg
                style={{
                  width: "1.2em",
                  height: "1.2em",
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Display das UFs selecionadas */}
      {ufSelected.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5em",
            marginTop: "1em",
            padding: "0.75em",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "1em",
            border: "0.2em solid var(--color-5)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              width: "100%",
              marginBottom: "0.5em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "var(--color-5)",
                fontWeight: "bold",
                fontSize: "1em",
              }}
            >
              UFs selecionadas:
            </span>
            <button
              type="button"
              onClick={clearAll}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-5)",
                cursor: "pointer",
                fontSize: "0.9em",
                textDecoration: "underline",
                padding: "0.25em 0.5em",
                borderRadius: "0.5em",
                transition: "background-color 0.2s",
              }}
              aria-label="Remover todas as seleções"
            >
              Limpar todas
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5em",
              width: "100%",
            }}
          >
            {ufSelected.map((ufCode) => (
              <div
                key={ufCode}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5em",
                  padding: "0.5em 0.75em",
                  backgroundColor: "var(--color-5)",
                  color: "var(--color-10)",
                  borderRadius: "10em",
                  fontSize: "0.95em",
                  fontWeight: "bold",
                }}
              >
                <svg
                  style={{
                    width: "1em",
                    height: "1em",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{getUfName(ufCode)}</span>
                <button
                  type="button"
                  onClick={() => toggleUf(ufCode)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: "1.2em",
                    lineHeight: "0.8",
                    padding: "0",
                    marginLeft: "0.25em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "1.2em",
                    height: "1.2em",
                    borderRadius: "50%",
                    transition: "background-color 0.2s",
                  }}
                  aria-label={`Remover ${getUfName(ufCode)}`}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
