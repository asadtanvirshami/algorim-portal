// src/components/ProfileForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Input, Label, Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui'; // Adjust the path to match your Shadcn imports

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  profile_picture: FileList;
}

const UserProfile = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('role', data.role);
      if (data.profile_picture[0]) {
        formData.append('profile_picture', data.profile_picture[0]);
      }

      const response = await axios.post('/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      reset();
      setProfileImagePreview(null);
      alert('User created successfully!');
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to create user');
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <FormField>
        <FormItem>
          <Label>First Name</Label>
          <FormControl>
            <Input {...register('firstName', { required: 'First name is required' })} />
          </FormControl>
          <FormMessage>{errors.firstName?.message}</FormMessage>
        </FormItem>
      </FormField>

      <FormField>
        <FormItem>
          <Label>Last Name</Label>
          <FormControl>
            <Input {...register('lastName', { required: 'Last name is required' })} />
          </FormControl>
          <FormMessage>{errors.lastName?.message}</FormMessage>
        </FormItem>
      </FormField>

      <FormField>
        <FormItem>
          <Label>Email</Label>
          <FormControl>
            <Input type="email" {...register('email', { required: 'Email is required' })} />
          </FormControl>
          <FormMessage>{errors.email?.message}</FormMessage>
        </FormItem>
      </FormField>

      <FormField>
        <FormItem>
          <Label>Password</Label>
          <FormControl>
            <Input type="password" {...register('password', { required: 'Password is required' })} />
          </FormControl>
          <FormMessage>{errors.password?.message}</FormMessage>
        </FormItem>
      </FormField>

      <FormField>
        <FormItem>
          <Label>Role</Label>
          <FormControl>
            <Input {...register('role', { required: 'Role is required' })} />
          </FormControl>
          <FormMessage>{errors.role?.message}</FormMessage>
        </FormItem>
      </FormField>

      <FormField>
        <FormItem>
          <Label>Profile Picture</Label>
          <FormControl>
            <Input type="file" {...register('profile_picture')} onChange={handleImageChange} />
          </FormControl>
          {profileImagePreview && (
            <img src={profileImagePreview} alt="Profile Preview" className="w-24 h-24 mt-2 rounded-full object-cover" />
          )}
        </FormItem>
      </FormField>

      <Button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </Form>
  );
};

export default UserProfile;
