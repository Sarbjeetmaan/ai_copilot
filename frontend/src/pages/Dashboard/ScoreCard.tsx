import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type{ LucideIcon } from "lucide-react";

interface ScoreCardProps {
  title: string;
  value: number;
  suffix?: string;
  subtitle: string;
  icon: LucideIcon;
}

export default function ScoreCard({
  title,
  value,
  suffix = "%",
  subtitle,
  icon: Icon,
}: ScoreCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition-all hover:shadow-xl">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              {title}
            </p>

            <h2 className="mt-3 text-5xl font-bold tracking-tight text-slate-900">
              {value}
              <span className="text-2xl text-slate-500">
                {suffix}
              </span>
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-200 bg-slate-50 p-3">
            <Icon className="h-6 w-6 text-slate-700" />
          </div>

        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-100">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1 }}
            className="h-full rounded-full bg-linear-to-r from-slate-700 via-slate-600 to-sky-500"
          />

        </div>

      </Card>
    </motion.div>
  );
}