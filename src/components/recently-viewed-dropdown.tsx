"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { products as allProducts } from "@/data/products";
import { HistoryIcon } from "./icons";

const STORAGE_KEY = "stepforward-recently-viewed";

function loadIds(): string[] {
  try {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function RecentlyViewedDropdown() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCount(loadIds().length);
  }, []);

  useEffect(() => {
    if (!open) return;
    const ids = loadIds();
    setCount(ids.length);
    const resolved = ids
      .map((id) => allProducts.find((p) => p.id === id))
      .filter((p): p is Product => !!p);
    setItems(resolved);
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      <button
        aria-label="Recently viewed"
        className="p-1 hover:opacity-60 transition-opacity relative"
        onClick={() => setOpen((v) => !v)}
      >
        <HistoryIcon className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-charcoal text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full mt-3 w-72 bg-white border border-black/10 shadow-lg rounded-sm z-50",
          )}
        >
          <div className="px-4 py-3 border-b border-black/5">
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Recently Viewed
            </p>
          </div>

          {items.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              No recently viewed items yet.
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-black/5">
              {items.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                      <Image
                        src={product.colors[0]?.image || product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-charcoal truncate">{product.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {product.price.toLocaleString("pl-PL")} zł
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
