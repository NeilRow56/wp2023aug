"use client"

import axios from "axios";
import { signIn, useSession } from 'next-auth/react'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input";
import { useAuthModal } from "@/hooks/use-auth-modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

type Variant = 'LOGIN' | 'REGISTER';

const FormSchema = z
  .object({
    name: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

export const AuthModal = () => {
    const session = useSession()
    const authModal = useAuthModal()
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (session?.status === 'authenticated') {
        router.push('/client')
      }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
      if (variant === 'LOGIN') {
        setVariant('REGISTER');
      } else {
        setVariant('LOGIN');
      }
    }, [variant]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });

    const onSubmit = async (values: z.infer<typeof FormSchema> ) => {
        
        // Register User

        setIsLoading(true);
  
        if (variant === 'REGISTER') {
          axios.post('/api/register', values)
          .then(() => signIn('credentials', {
            ...values,
            redirect: false,
          }))
          .then((callback) => {
            if (callback?.error) {
              toast.error('Invalid credentials!');
            }
    
            if (callback?.ok) {
              router.refresh();
              router.push('/client')
              toast.success('Account registered.');
                         

            }
          })
          .catch(() => toast.error('Something went wrong!'))
          .finally(() => setIsLoading(false))
        }
    
        if (variant === 'LOGIN') {
          signIn('credentials', {
            ...values,
            redirect: false
          })
          .then((callback) => {
            if (callback?.error) {
              toast.error('Invalid credentials!');
            }
    
            if (callback?.ok) {
              router.push('/client')
            }
          })
          .finally(() => setIsLoading(false))
        }


    }

    return (
        <Modal
   title="Signin"
   description="Signin to access client files"
   isOpen={authModal.isOpen}
   onClose={authModal.onClose}

   
   >
    <div>
    <div className="  py-2 pb-4">
    <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>

              {variant === 'REGISTER' && (
             <div className="p-3 ">    
              <FormField
            
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800" >Name</FormLabel>
                  <FormControl>
                    <Input  disabled={isLoading}  placeholder="Testing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            )}
            <div className="p-3">                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800">Email</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading}  placeholder="testing@bt.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

            </div>
            <div className="p-3"> 
                <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800">Password</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type='password'  placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="p-3"> 
                <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800">Confirm Password</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type='password'   placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button  variant="outline" onClick={authModal.onClose}>
                    Cancel
                  </Button>
                  
            <Button disabled={isLoading}  className="w-full bg-blue-800 hover:bg-blue-500" type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          
                </div>
              </form>
            </Form>

            <div className="mt-6">
            <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN' ? 'New to WPfile?' : 'Already have an account?'} 
          </div>
          <div 
            onClick={toggleVariant} 
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
            </div>
          </div>
        </div>
        </div>
   </Modal>
    )
   

}
