"use client"
import { customerApi, jobsApi } from "@/lib/api";
import { Command } from "cmdk";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import {
    Search,
    LayoutDashboard,
    Users,
    Briefcase,
    Bell,
    Settings,
    Moon,
    Sun,
    User,
    CheckCircle2,
    ArrowRight
} from "lucide-react";

interface CommandMenuProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    // Seamless hook into React query in-memory cache for instant searching!
    const { data: customerData } = useQuery({
        queryKey: ['customers'],
        queryFn: customerApi.getCustomers,
        enabled: open
    })
    const { data: jobData } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => jobsApi.getJobs(),
        enabled: open
    })
    const customers = customerData?.customers || []
    const jobs = jobData?.jobs || []

    const runCommand = (command: () => void) => {
        onOpenChange(false)
        command()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 overflow-hidden max-w-2xl shadow-2xl rounded-xl border bg-card text-card-foreground">
                <DialogTitle className="sr-only">Search Command Menu</DialogTitle>

                <Command className="w-full bg-transparent flex flex-col">
                    {/* Search Input Bar */}
                    <div className="flex items-center border-b px-4 py-3 gap-3">
                        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                        <Command.Input
                            placeholder="Type a command or search customers and jobs..."
                            className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-muted-foreground"
                        />
                        <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                            ESC
                        </kbd>
                    </div>
                    {/* Results List */}
                    <Command.List className="max-h-96 overflow-y-auto p-2 text-sm">
                        <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                            No results found.
                        </Command.Empty>
                        {/* Section 1: Navigation */}
                        <Command.Group heading={<div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">Navigation</div>}>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/dashboard"))}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-accent hover:text-accent-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground outline-none"
                            >
                                <LayoutDashboard className="w-4 h-4 text-blue-500" />
                                <span>Dashboard</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/jobs"))}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-accent hover:text-accent-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground outline-none"
                            >
                                <Briefcase className="w-4 h-4 text-indigo-500" />
                                <span>Kanban Jobs Pipeline</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/customers"))}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-accent hover:text-accent-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground outline-none"
                            >
                                <Users className="w-4 h-4 text-emerald-500" />
                                <span>Customers Hub</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/reminders"))}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-accent hover:text-accent-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground outline-none"
                            >
                                <Bell className="w-4 h-4 text-amber-500" />
                                <span>Reminders & Alerts</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/settings"))}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-accent hover:text-accent-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground outline-none"
                            >
                                <Settings className="w-4 h-4 text-purple-500" />
                                <span>Account Settings</span>
                            </Command.Item>
                        </Command.Group>
                        {/* Section 2: Quick Theme Switcher */}
                        <Command.Group heading={<div className="px-2 pt-3 pb-1.5 text-xs font-semibold text-muted-foreground uppercase">Preferences</div>}>
                            <Command.Item
                                onSelect={() => runCommand(() => setTheme("dark"))}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-accent hover:text-accent-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground outline-none"
                            >
                                <Moon className="w-4 h-4 text-slate-400" />
                                <span>Switch to Dark Mode</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => setTheme("light"))}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-accent hover:text-accent-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground outline-none"
                            >
                                <Sun className="w-4 h-4 text-yellow-500" />
                                <span>Switch to Light Mode</span>
                            </Command.Item>
                        </Command.Group>
                        {/* Section 3: Live Customer Search Results */}
                        {customers.length > 0 && (
                            <Command.Group heading={<div className="px-2 pt-3 pb-1.5 text-xs font-semibold text-muted-foreground uppercase">Customers</div>}>
                                {customers.map((c: any) => (
                                    <Command.Item
                                        key={`cust-${c.id}`}
                                        value={`customer ${c.name} ${c.email}`}
                                        onSelect={() => runCommand(() => router.push(`/customers/${c.id}`))}
                                        className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-accent hover:text-accent-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground outline-none"
                                    >
                                        <div className="flex items-center gap-3 truncate">
                                            <User className="w-4 h-4 text-blue-600 shrink-0" />
                                            <span className="font-medium truncate">{c.name}</span>
                                            <span className="text-xs text-muted-foreground hidden sm:inline truncate">({c.email})</span>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        )}
                        {/* Section 4: Live Job Pipeline Search Results */}
                        {jobs.length > 0 && (
                            <Command.Group heading={<div className="px-2 pt-3 pb-1.5 text-xs font-semibold text-muted-foreground uppercase">Jobs Pipeline</div>}>
                                {jobs.map((j: any) => (
                                    <Command.Item
                                        key={`job-${j.id}`}
                                        value={`job ${j.title} ${j.status}`}
                                        onSelect={() => runCommand(() => router.push(`/jobs`))}
                                        className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer select-none hover:bg-accent hover:text-accent-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground outline-none"
                                    >
                                        <div className="flex items-center gap-3 truncate">
                                            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                                            <span className="font-medium truncate">{j.title}</span>
                                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase">{j.status.replace("_", " ")}</span>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        )}
                    </Command.List>
                </Command>
            </DialogContent>
        </Dialog>
    )

}