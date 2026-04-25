export default function Footer() {
  return (
    <footer className="w-full border-t border-foreground/10 mt-auto py-8 glass">
      <div className="container mx-auto px-4 text-center text-sm text-foreground/70">
        <p>&copy; {new Date().getFullYear()} EverythingAboutTime. All rights reserved.</p>
      </div>
    </footer>
  );
}
