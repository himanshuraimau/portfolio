import { Terminal } from "lucide-react";
import { ProjectsContent } from "@/components/features/projects-content";
import { webProjects, deepCSProjects } from "@/lib/projects-data";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pb-20">

      {/* Header Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="container-custom">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
              <Terminal className="w-3 h-3" />
              <span>~/projects</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tight mb-6">
              Build <span className="text-muted-foreground">Log</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A collection of deployed applications, system experiments, and engineering challenges.
            </p>
          </div>
        </div>
        {/* Background decoration
         <div className="absolute top-0 right-0 -z-10 opacity-10">
            <Server size={400} strokeWidth={0.5} />
         </div> */}
      </section>

      <section className="container-custom space-y-32">
        <ProjectsContent
          webProjects={webProjects}
          deepCSProjects={deepCSProjects}
        />
      </section>
    </div>
  );
}