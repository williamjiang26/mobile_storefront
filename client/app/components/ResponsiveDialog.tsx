import { useMediaQuery } from "@/hooks/use-media-query";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ResponsiveDialog = ({
  children,
  isOpen,
  setIsOpen,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      // dialog
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={cn(
            "fixed left-[50%] top-[50%] ",
            "max-w-full sm:max-w-7xl sm:h-fit gap-3 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="bg-white p-5">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
