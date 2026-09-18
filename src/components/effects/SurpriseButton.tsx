"use client";
import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";
import { effects } from "@/lib/catalog";
import { chooseLiveEffect } from "@/lib/search/discovery";
export function SurpriseButton({ prominent = false }: { prominent?: boolean }) {
  const router = useRouter();
  return (
    <button
      className={prominent ? "modic-action surprise-action" : "surprise-button"}
      onClick={() => {
        const effect = chooseLiveEffect(effects);
        if (effect) router.push("/effects/" + effect.slug);
      }}
    >
      <Shuffle size={17} aria-hidden="true" />
      Surprise me<span aria-hidden="true">↗︎</span>
    </button>
  );
}
