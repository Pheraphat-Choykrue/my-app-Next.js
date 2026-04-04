"use client";

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";


export default function SignUpPage() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
            <FieldGroup>
              <Controller name="name" control={form.control} render={({field, fieldState})=>{
                return <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input placeholder="Enter your name" {...form} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              }}/>
              <Controller name="email" control={form.control} render={({field, fieldState})=>{
                return <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input placeholder="Enter your email" {...form} type="email" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              }}/>
              <Controller name="password" control={form.control} render={({field, fieldState})=>{
                return <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input placeholder="********" {...form} type="password" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              }}/>

              <Button>Sign Up</Button>
            </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}