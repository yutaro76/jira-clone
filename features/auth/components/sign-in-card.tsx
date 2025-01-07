import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { loginSchema } from '../schemas';
import { useLogin } from '../api/use-login';

// loginSchemaができたためコメントアウト
// zodのバリデーションスキーマを定義
// const formSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(1, 'Required'),
// });

export const SignInCard = () => {
  const { mutate } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    // formSchemaでバリデーションを行う。
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
  };

  return (
    <Card className='w-full h-full mf:w-[487px] border-none shadow-none'>
      <CardHeader className='flex items-centerjustify-center text-center p-7'>
        <CardTitle className='text-2xl'>Sign In</CardTitle>
      </CardHeader>
      <div className='px-7 mb-2'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7'>
        {/* const formで決めたルールとdedaultValuesをFormに渡す */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='Enter email address'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='Enter password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} size='lg' className='w-full'>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7 flex flex-col gap-y-4'>
        <Button
          disabled={false}
          variant='secondary'
          size='lg'
          className='w-full'
        >
          <FcGoogle className='mr-2 size-5' />
          Login with Google
        </Button>
        <Button
          disabled={false}
          variant='secondary'
          size='lg'
          className='w-full'
        >
          <FaGithub className='mr-2 size-5' />
          Login with Github
        </Button>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7 flex items-center justify-center'>
        <p>
          Don&apos;t have an account? {''}
          <Link href='/sign-up'>
            <span className='text-blue-700'>Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
