"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import { HomePage } from "./_components/unauthenticated/homepage";

interface DashboardLayoutProps {
    children: React.ReactNode;
};

const DashboardLayout = ({
    children,
}: DashboardLayoutProps) => {
    return(
        <>
            <Authenticated>
                <main className="h-full">
                    <Sidebar />
                    <div className="pl-15 h-full">
                        <div className="flex gap-x-3 h-full">
                            <OrgSidebar />
                            <div className="h-full flex-1">
                                <Navbar />
                                {children}
                            </div>                    
                        </div>                
                    </div>            
                </main>
            </Authenticated>
            <Unauthenticated>
                <HomePage />
            </Unauthenticated>
        </>
    );
};

export default DashboardLayout;