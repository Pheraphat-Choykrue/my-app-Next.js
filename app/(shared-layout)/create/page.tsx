"use client";

import { createPost } from "@/app/actions";
import { BlogSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreatePage({}) {
    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
          title: "",
          content: "",
          image: undefined,
        }
    });

    function onSubmit (values: z.infer<typeof BlogSchema>) {
        startTransition(async()=>{
            await createPost(values);
        })
    }
    return (
    <div className="py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create Page</h1>
            <p className="text-xl text-muted-foreground pt-4">Welcome to the create page! Here you can create new content and share it with the world.</p>
        </div>

        <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Create New Content</CardTitle>
                <CardDescription>Fill out the form below to create new content.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller name="title" control={form.control} render={({field, fieldState})=>{
                            return <Field>
                                <FieldLabel>Title</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Enter the title" {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        }}/>
                        <Controller name="content" control={form.control} render={({field, fieldState})=>{
                            return <Field>
                                <FieldLabel>Content</FieldLabel>
                                <Textarea aria-invalid={fieldState.invalid} placeholder="Enter the content" {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        }}/>
                         <Controller name="image" control={form.control} render={({field, fieldState})=>{
                            return <Field>
                                <FieldLabel>Image</FieldLabel>
                                <Input type="file" accept="image/*" aria-invalid={fieldState.invalid} placeholder="Upload an image" onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    field.onChange(file);
                                }} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        }}/>

                        <Button disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <span>Create</span>
                            )}
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    </div>   
    )
}