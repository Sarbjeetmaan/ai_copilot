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
    <section className="py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (

            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="
                rounded-3xl
                border
                bg-card/60
                p-8
                backdrop-blur-xl
                text-center
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              <h2 className="text-5xl font-black tracking-tight">
                {item.number}
              </h2>

              <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-sky-500" />

              <p className="mt-5 text-muted-foreground">
                {item.label}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}