import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const LOGO_URL = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1790490826/logo_yz7vqp.png`;

const DashboardLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card md:block">
        <DashboardSidebar />
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-background px-4 md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger aria-label="Open dashboard navigation">
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle>
                <img
                  src={LOGO_URL}
                  alt="Packet Picnic"
                  className="h-12 w-auto object-contain"
                />
              </SheetTitle>
            </SheetHeader>

            <DashboardSidebar
              onNavigate={() => setIsMenuOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <div className="ml-3">
          <img
            src={LOGO_URL}
            alt="Packet Picnic"
            className="h-10 w-auto object-contain"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;