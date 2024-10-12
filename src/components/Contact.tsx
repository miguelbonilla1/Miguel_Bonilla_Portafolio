'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Correo electrónico inválido.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        alert('Mensaje enviado con éxito!')
        reset()
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error)
      alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className=" min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-24 px-6 sm:px-8 flex flex-col items-center justify-center">
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Let's talk about your next project!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xl font-medium mb-2">Name</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-xl font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-xl font-medium mb-2">Message</label>
            <textarea
              id="message"
              {...register('message')}
              rows={4}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Leave me a message"
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
          </div>
          <button 
            type="submit" 
            className=" text-xl w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-inter rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  )
}