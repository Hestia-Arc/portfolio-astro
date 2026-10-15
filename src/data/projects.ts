export type SimpleProject = {
  name: string;
  kind: "flow" | "pulse" | "form";
  type: string;
  category?: "websites" | "web-apps" | "wordpress";
  description: string;
  tech: string[];
};

export const projects: SimpleProject[] = [
  { name: "Checkout Intelligence", kind: "flow", type: "Checkout optimization", description: "A concept for a focused workspace that brings tasks, teams, and progress together. Kanban boards turn complex workflows into clear, manageable steps.", tech: ["React", "TypeScript", "Tailwind CSS"] },
  { name: "Flow", kind: "flow", type: "Workflow management", category: "web-apps", description: "A concept for a focused workspace that brings tasks, teams, and progress together. Kanban boards turn complex workflows into clear, manageable steps.", tech: ["React", "TypeScript", "Tailwind CSS"] },
  { name: "Pulse", kind: "pulse", type: "Analytics dashboard", category: "web-apps", description: "A concept for turning business data into a clear picture. A considered dashboard brings key metrics and trends together to support informed decisions.", tech: ["React", "TypeScript", "Data visualization"] },
  { name: "Formly", kind: "form", type: "Interactive form builder", category: "websites", description: "A concept for creating forms that feel effortless. A simple builder pairs flexible fields with a clean, accessible experience for the people filling them out.", tech: ["React", "TypeScript", "Form validation"] },
  { name: "Gather", kind: "flow", type: "Community platform", category: "websites", description: "A concept for bringing people and shared interests together in a thoughtful community space.", tech: ["React", "TypeScript", "Accessible UI"] },
  { name: "Ledger", kind: "pulse", type: "Personal finance", category: "web-apps", description: "A concept for making everyday finances easier to understand, with a clear view of spending and savings.", tech: ["React", "TypeScript", "Charts"] },
  { name: "Nomad", kind: "form", type: "Travel planning", category: "wordpress", description: "A concept for organizing destinations, itineraries, and the small details of a great trip.", tech: ["React", "TypeScript", "Responsive design"] },
];

export default projects;
