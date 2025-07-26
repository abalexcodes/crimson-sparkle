import { Button } from "@/components/ui/button";
import { ExpandedTabs } from "@/components/ui/expanded-tabs";
import type { TabItem } from "@/components/ui/expanded-tabs";
import { RiMenu3Line, RiCloseLine, RiHomeLine, RiCodeSSlashLine, RiProjectorLine, RiContactsLine } from "@remixicon/react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems: TabItem[] = [
    { title: 'Home', icon: RiHomeLine },
    { title: 'Skills', icon: RiCodeSSlashLine },
    { title: 'Projects', icon: RiProjectorLine },
    { title: 'Contact', icon: RiContactsLine },
  ];

  const navItemsWithIds = [
    { title: 'Home', icon: RiHomeLine, id: 'hero' },
    { title: 'Skills', icon: RiCodeSSlashLine, id: 'skills' },
    { title: 'Projects', icon: RiProjectorLine, id: 'projects' },
    { title: 'Contact', icon: RiContactsLine, id: 'contact' },
  ];

  const handleTabClick = (title: string) => {
    const item = navItemsWithIds.find(nav => nav.title === title);
    if (item) {
      scrollToSection(item.id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold text-primary hover:scale-105 transition-smooth"
          >
            John.Dev
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <ExpandedTabs 
              tabs={navItems}
              onTabClick={handleTabClick}
              activeColor="text-primary"
            />
            
            <Button 
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground transition-smooth ml-4"
              onClick={() => scrollToSection('contact')}
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg animate-fade-in">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {navItemsWithIds.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 w-full text-left text-foreground hover:text-primary transition-smooth py-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </button>
              ))}
              
              <Button 
                variant="outline"
                className="w-full hover:bg-primary hover:text-primary-foreground transition-smooth"
                onClick={() => scrollToSection('contact')}
              >
                Let's Talk
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;