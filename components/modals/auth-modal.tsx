"use client"

import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from 'react';

import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input";
import { useAuthModal } from "@/hooks/use-auth-modal"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

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
    const authModal = useAuthModal()
    const [variant, setVariant] = useState<Variant>('LOGIN');

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
        console.log(values)
        // TODO Register User
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
                    <Input   placeholder="Testing" {...field} />
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
                        <Input  placeholder="testing@bt.com" {...field} />
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
                    <Input type='password'  placeholder="Enter your password" {...field} />
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
                    <Input type='password'   placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button variant="outline" onClick={authModal.onClose}>
                    Cancel
                  </Button>
                  
            <Button  className="w-full bg-blue-800 hover:bg-blue-500" type="submit">
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
