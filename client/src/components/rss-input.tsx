import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface RssInputProps {
  handleFeedAdd: (event: { url: string }) => void;
}

const formSchema = z.object({
  url: z.string().url(),
});

export default function RssInput({
  handleFeedAdd,
}: RssInputProps): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleFeedAdd(values);
    form.reset({ url: '' });
  }

  return (
    <div>
      <Label className="text-base">Enter RSS feed URL:</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="RSS-feed address here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add to list</Button>
        </form>
      </Form>
    </div>
  );
}
