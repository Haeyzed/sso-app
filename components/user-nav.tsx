'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LOGOUT_URL } from '@/lib/apiEndPoints';
import myAxios from '@/lib/axios.config';
import { type getDictionary } from '@/lib/dictionary';
import { Loader2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMediaQuery } from '@/hooks/use-media-query';

interface UserNavProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['userNav'];
  user: CustomUser;
}

export function UserNav({ user, dictionary }: UserNavProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [logoutOpen, setLogOutOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await myAxios.get(LOGOUT_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });

      if (response?.status === 200) {
        setLogOutOpen(false);
        await signOut({
          callbackUrl: '/login',
          redirect: true
        });
        toast.success(dictionary?.logout?.successMessage, {
          description: response?.data?.message
        });
      } else {
        toast.error(dictionary?.logout?.errorMessage?.default, {
          description: response?.data?.message
        });
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error(dictionary?.logout?.errorMessage?.default, {
          description: error.response?.data?.message
        });
      } else if (error.response?.status === 422) {
        toast.error(dictionary?.logout?.errorMessage?.default, {
          description: dictionary?.logout?.errorMessage?.validation
        });
      } else {
        toast.error(dictionary?.logout?.errorMessage?.default, {
          description: dictionary?.logout?.errorMessage?.network
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <>
        {isDesktop ? (
          <Dialog open={logoutOpen} onOpenChange={setLogOutOpen}>
            <DialogContent className='sm:max-w-[425px] bg-card'>
              <DialogHeader>
                <DialogTitle>{dictionary?.logout?.dialog?.title}</DialogTitle>
                <DialogDescription>
                  {dictionary?.logout?.dialog?.description}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <div className='flex justify-end space-x-4'>
                  <Button
                    variant='destructive'
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        {dictionary?.logout?.dialog?.confirmSubmittingButton}
                      </>
                    ) : (
                      dictionary?.logout?.dialog?.confirmButton
                    )}
                  </Button>
                  <DialogClose>
                    <Button>{dictionary?.logout?.dialog?.closeButton}</Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={logoutOpen} onOpenChange={setLogOutOpen}>
            <DrawerContent className='bg-card'>
              <DrawerHeader className='text-left'>
                <DrawerTitle>{dictionary?.logout?.dialog?.title}</DrawerTitle>
                <DrawerDescription>
                  {dictionary?.logout?.dialog?.description}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className='pt-2'>
                <div className='flex justify-end space-x-4'>
                  <Button
                    variant='destructive'
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        {dictionary?.logout?.dialog?.confirmSubmittingButton}
                      </>
                    ) : (
                      dictionary?.logout?.dialog?.confirmButton
                    )}
                  </Button>
                  <DrawerClose asChild>
                    <Button>{dictionary?.logout?.dialog?.closeButton}</Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>{user?.name}</p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                {dictionary?.profile}
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {dictionary?.settings}
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLogOutOpen(true)}>
              {dictionary?.logout?.logoutButton}
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}
