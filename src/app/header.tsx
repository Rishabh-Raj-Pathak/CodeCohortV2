"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccountAction } from "./actions";
import LetterPullup from "@/components/ui/letter-pullup";
import { TbUserSearch } from "react-icons/tb";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link2"}>
            <Avatar className="">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* {session.data?.user?.name} */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className="mr-2" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="bg-gray-100 p-4 dark:bg-gray-900 z-10 relative rounded-xl shadow-[0_4px_10px_0_rgba(139,92,246,0.4),0_6px_15px_0_rgba(236,72,153,0.3)]">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/" 
          className="flex gap-2 items-center text-xl font-bold no-underline"
        >
          {/* <Image
            src="/icon.png"
            width="60"
            height="60"
            alt="the application icon of a magnifying glass"
          /> */}
          <LetterPullup words={"CodeCohort"} delay={0.05} />
          
        </Link>

        

        <nav className="flex gap-8 items-center">
  {isLoggedIn && (
    <>
      {/* Browse Link with Globe Icon */}
      <Link
        className="flex items-center text-black dark:text-gray-400 dark:hover:text-white hover:text-gray-700 transition-colors duration-200 ease-in-out"
        href="/browse"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zM12 3v18M3 12h18"
          />
        </svg>
        <span className="ml-3">Browse</span>
      </Link>

      {/* Your Rooms Link with Home Icon */}
      <Link
        className="flex items-center text-black dark:text-gray-400 dark:hover:text-white hover:text-gray-700 transition-colors duration-200 ease-in-out"
        href="/your-rooms"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 21.75v-3.75h3v3.75m-8.25 0h13.5c1.035 0 1.875-.84 1.875-1.875v-8.25c0-.621-.252-1.217-.7-1.65L13.5 3.375c-.72-.68-1.78-.68-2.5 0L2.575 10.975c-.448.433-.7 1.029-.7 1.65v8.25c0 1.035.84 1.875 1.875 1.875z"
          />
        </svg>
        <span className="ml-3">Your Rooms</span>
      </Link>
    </>
  )}
</nav>




        <div className="flex items-center">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn() } variant="link2">
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
        
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}