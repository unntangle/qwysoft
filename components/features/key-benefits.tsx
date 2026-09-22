import { Activity, Blocks, Code2, Layers, Plug, Rocket, Users, Workflow } from "lucide-react";
import { Container } from "@/components/ui/container";

const BENEFITS = [
  {
    icon: Layers,
    title: "Comprehensive solutions",
    body: "Complete solutions tailored to your business needs, with seamless results from planning to execution.",
  },
  {
    icon: Code2,
    title: "Expertise in application development",
    body: "High-performance, scalable applications built for modern business demands, with reliability, flexibility and innovation.",
  },
  {
    icon: Rocket,
    title: "Innovative pre-built platforms",
    body: "Ready-to-use platforms that streamline operations and accelerate growth.",
  },
  {
    icon: Users,
    title: "Experienced team",
    body: "A skilled team delivering innovative and reliable digital solutions.",
  },
  {
    icon: Blocks,
    title: "Scalable solutions",
    body: "Systems that grow with your business, so you scale operations without compromising performance or stability.",
  },
  {
    icon: Plug,
    title: "Seamless integration",
    body: "Connect your existing tools, third-party applications and workflows into one unified, efficient digital ecosystem.",
  },
  {
    icon: Workflow,
    title: "Process automation",
    body: "Intelligent automation that reduces manual effort, improves accuracy and speeds up business processes.",
  },
  {
    icon: Activity,
    title: "Real-time insights & control",
    body: "Monitor and manage your business with real-time dashboards and data-driven insights for faster, smarter decisions.",
  },
];

export function KeyBenefits() {
  return (
    <section id="benefits" className="py-24 sm:py-32" aria-labelledby="benefits-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="kicker mb-6">Why QWY</p>
            <h2 id="benefits-title" className="display display-md max-w-[14ch]">
              Key features and benefits
            </h2>
          </div>
          <p className="lede lg:col-span-5 lg:col-start-8">
            At QWY Software, we take pride in delivering top-notch services tailored to the unique needs of your business.
            Here&rsquo;s why businesses choose us.
          </p>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="border-t border-ink/12 pt-6">
              <span className="grid size-10 place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(255,31,107,0.12),rgba(90,10,166,0.14))] text-plum">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.015em]">{title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
