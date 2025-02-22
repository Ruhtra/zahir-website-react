"use client";

import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowUpAZ,
  ArrowUpWideNarrow,
} from "lucide-react";
import { SetURLSearchParams } from "react-router-dom";

interface OrderProps {
  order: string;
  onOrderChange: SetURLSearchParams;
}

export function FilterOrder({ order, onOrderChange }: OrderProps) {
  function handleOrderChange(newOrder: string) {
    onOrderChange((params) => {
      //default value
      if (order == "" || order == null) order = "alphabetical";

      if (order === newOrder) {
        // Toggle direction if the same order type is selected
        params.set(
          "order",
          newOrder.startsWith("-") ? newOrder.slice(1) : `-${newOrder}`
        );
      } else {
        // Set new order type
        params.set("order", newOrder);
      }
      return params;
    });
  }

  const isChronological = order === "createdAt" || order === "-createdAt";
  const isAscending = !order.startsWith("-");

  return (
    <div className="itenss categories scroll-style" style={{flexWrap: 'nowrap'}}>
      <button
        className={`mybtn`}
        onClick={() => handleOrderChange("createdAt")}
        aria-pressed={isChronological}
      >
        <label
          htmlFor="createdOrder"
          className={` ${isChronological ? "marked" : ""}`}
        >
          {isChronological &&
            (isAscending ? (
              <ArrowDownWideNarrow className="icon-order" />
            ) : (
              <ArrowUpWideNarrow className="icon-order" />
            ))}
          Cronológica
        </label>
      </button>
      <button
        className={`mybtn ${!isChronological ? "" : ""}`}
        onClick={() => handleOrderChange("alphabetical")}
        aria-pressed={!isChronological}
      >
        <label
          htmlFor="alphabeticalOrder"
          className={` ${isChronological ? "" : "marked"}`}
        >
          {!isChronological &&
            (isAscending ? (
              <ArrowDownAZ className="icon-order" />
            ) : (
              <ArrowUpAZ className="icon-order" />
            ))}
          Alfabética
        </label>
      </button>
    </div>
  );
}
