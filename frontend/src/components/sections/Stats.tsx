import { motion } from "framer-motion";

const stats = [
  {
    number: "25K+",
    label: "Resumes Analyzed",
  },
  {
    number: "96%",
    label: "ATS Accuracy",
  },
  {
    number: "8K+",
    label: "Jobs Matched",
  },
  {
    number: "4.9★",
    label: "User Rating",
  },
];

export default function Stats() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
            }}
            viewport={{ once: true }}
            className="rounded-2xl border p-8 text-center shadow-sm"
          >
            <h2 className="text-5xl font-black text-cyan-500">
              {item.number}
            </h2>

            <p className="mt-3 text-muted-foreground">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}