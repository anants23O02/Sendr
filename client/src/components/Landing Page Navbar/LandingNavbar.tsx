// components/Navbar.tsx
import Link from "next/link"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <header className="w-full bg-green-100 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-emerald-700">
          Brevo
        </Link>

        {/* Nav Links */}
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-8">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="#" className="text-sm font-semibold flex items-center gap-1">
                  Products 
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="#" className="text-sm font-semibold">
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="#" className="text-sm font-semibold flex items-center gap-1">
                  Resources 
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Globe className="h-4 w-4 text-emerald-800" />
          <Link href="/login" className="text-sm underline text-emerald-900">
            Log in
          </Link>
          <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
            Sign Up Free
          </Button>
          <Button variant="outline" className="border-emerald-700 text-emerald-900 hover:bg-emerald-200">
            Get a demo
          </Button>
        </div>
      </div>
    </header>
  )
}
