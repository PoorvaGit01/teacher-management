import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import Header from "@/components/header";
import { Toaster } from "sonner";
import { TeacherProvider } from "@/hooks/useTeachers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduManage",
  description: "Modern teacher management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <TeacherProvider>
                <main className="flex-1 overflow-hidden">
                  <div className="flex ">
                    <Header />
                  </div>
                  {children}
                </main>
              </TeacherProvider>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
