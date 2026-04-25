const fs = require('fs');
const path = require('path');

const tools = [
  'time-difference',
  'add-subtract-time',
  'countdown',
  'age-calculator',
  'sleep-calculator',
  'study-timer',
  'world-clocks',
  'pomodoro'
];

tools.forEach(tool => {
  const dir = path.join(__dirname, 'src', 'app', 'tools', tool);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `export const metadata = {
  title: "${tool.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Time is Everything",
  description: "A fast, modern ${tool.replace('-', ' ')} tool.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8 capitalize">${tool.replace('-', ' ')}</h1>
      <div className="glass rounded-xl p-8">
        <p className="text-foreground/70">Tool implementation coming soon.</p>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});
console.log('Done scaffolding tooling pages.');
