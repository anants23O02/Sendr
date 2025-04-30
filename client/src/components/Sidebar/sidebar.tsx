// components/Sidebar.tsx
'use client'

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Sidebar() {
  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link href="/" passHref>
                <NavigationMenuLink className="block px-2 py-1">Home</NavigationMenuLink>
              </Link>
              <Link href="/profile" passHref>
                <NavigationMenuLink className="block px-2 py-1">Profile</NavigationMenuLink>
              </Link>
              <Link href="/settings" passHref>
                <NavigationMenuLink className="block px-2 py-1">Settings</NavigationMenuLink>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen bg-white p-4">
        <NavigationMenu orientation="vertical">
          <NavigationMenuList className="flex flex-col space-y-2">
            <NavigationMenuItem>
              <Link href="/" passHref>
                <NavigationMenuLink className="block px-2 py-1">Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/profile" passHref>
                <NavigationMenuLink className="block px-2 py-1">Profile</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/settings" passHref>
                <NavigationMenuLink className="block px-2 py-1">Settings</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  )
}
