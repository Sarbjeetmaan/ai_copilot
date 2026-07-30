import { Card } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  items: string[];
}

export default function FeedbackCard({
  title,
  items,
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="h-full rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm hover:shadow-lg">

        <h2 className="mb-6 text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>

        <div className="space-y-4">

          {items.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3"
            >

              <div className="mt-1 rounded-full bg-slate-100 p-1">

                <Check
                  size={14}
                  className="text-slate-600"
                />

              </div>

              <p className="leading-7 text-slate-600">
                {item}
              </p>

            </div>

          ))}

          {items.length === 0 && (

            <div className="flex items-center gap-2 text-slate-400">

              <ArrowRight size={16} />

              Nothing to show

            </div>

          )}

        </div>

      </Card>
    </motion.div>
  );
}