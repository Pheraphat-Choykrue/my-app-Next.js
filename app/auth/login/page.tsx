"use client";

import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { is } from "zod/v4/locales";
import { Loader2 } from "lucide-react";


export default function LoginPage() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password: ""
        }
    });

    function onSubmit(data: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            await authClient.signIn.email({
            email: data.email,
            password: data.password,
            fetchOptions: {
              onSuccess: () => {
                  toast.success("Login successfully")
                  router.push("/")
                },
                onError: (error) => {                  
                  toast.error(error.error.message)
                }
            }
        });
    })
}
  return (
   <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to get started right away</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller name="email" control={form.control} render={({field, fieldState})=>{
                return <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} placeholder="Enter your email" {...field} type="email" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              }}/>
              <Controller name="password" control={form.control} render={({field, fieldState})=>{
                return <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} placeholder="********" {...field} type="password" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              }}/>

              <Button disabled={isPending}>{isPending ? (
                <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
                </>
              ) : (
                <span>Login</span>
              )}</Button>
            </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}