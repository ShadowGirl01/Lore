'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
];

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();

    return (
        <header className="w-full fixed z-50 bg-[var(--bg-primary)]">
            <div className="wrapper navbar-height py-4 flex items-center justify-between">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image
                        src="/assets/logo.png"
                        alt="Lore"
                        width={42}
                        height={26}
                    />
                    <span className="logo-text">Lore</span>
                </Link>

                <nav className="flex items-center gap-6">
                    {navItems.map(({ label, href }) => {
                        const isActive =
                            pathName === href ||
                            (href !== "/" && pathName.startsWith(href));

                        return (
                            <Link
                                key={label}
                                href={href}
                                className={cn(
                                    "nav-link-base",
                                    isActive
                                        ? "nav-link-active"
                                        : "text-black hover:opacity-70"
                                )}
                            >
                                {label}
                            </Link>
                        );
                    })}

                    <div className="flex gap-7.5 items-center">
                        <SignedOut>
                            <SignInButton mode="modal" />
                        </SignedOut>

                        <SignedIn>
                            <div className="nav-user-link">
                                <UserButton />
                                {user?.firstName && (
                                    <Link href="/subscriptions" className="nav-user-name">
                                        {user.firstName}
                                    </Link>
                                )}
                            </div>
                        </SignedIn>
                    </div>

                </nav>
            </div>
        </header>
    );
};

export default Navbar;