'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

const officialSchema = z.object({
  lastName: z.string().min(1, 'Last name is required'),
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  role: z.enum(['COACH', 'TEAM_MANAGER', 'MEDICAL_STAFF', 'ADMINISTRATOR']),
  sport: z.enum(['FOOTBALL', 'VOLLEYBALL', 'BASKETBALL', 'KICKBALL', 'ATHLETICS']),
  documents: z.object({
    idCard: z.string().min(1, 'ID Card is required'),
    qualification: z.string().optional()
  })
})

type OfficialFormData = z.infer<typeof officialSchema>

export default function OfficialRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [idPreview, setIdPreview] = useState<string>('')
  const [qualificationPreview, setQualificationPreview] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<OfficialFormData>({
    resolver: zodResolver(officialSchema)
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'qualification') => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (type === 'id') {
          setIdPreview(e.target?.result as string)
        } else {
          setQualificationPreview(e.target?.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: OfficialFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/officials/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Official registered successfully!')
        reset()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to register official')
      }
    } catch (error) {
      toast.error('An error occurred while registering official')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">OFFICIAL REGISTRATION FORM</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Last Name *</label>
            <input
              {...register('lastName')}
              className="input-field"
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label className="label">First Name *</label>
            <input
              {...register('firstName')}
              className="input-field"
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="label">Middle Name</label>
            <input
              {...register('middleName')}
              className="input-field"
              placeholder="Enter middle name"
            />
          </div>
        </div>

        {/* Role and Sport Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Role *</label>
            <select {...register('role')} className="input-field">
              <option value="">Select a role</option>
              <option value="COACH">Coach</option>
              <option value="TEAM_MANAGER">Team Manager</option>
              <option value="MEDICAL_STAFF">Medical Staff</option>
              <option value="ADMINISTRATOR">Administrator</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <div>
            <label className="label">Sport *</label>
            <select {...register('sport')} className="input-field">
              <option value="">Select a sport</option>
              <option value="FOOTBALL">Football</option>
              <option value="VOLLEYBALL">Volleyball</option>
              <option value="BASKETBALL">Basketball</option>
              <option value="KICKBALL">Kickball</option>
              <option value="ATHLETICS">Athletics</option>
            </select>
            {errors.sport && (
              <p className="text-red-500 text-sm mt-1">{errors.sport.message}</p>
            )}
          </div>
        </div>

        {/* Document Upload */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Upload ID Card *</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, 'id')}
              className="input-field"
            />
            {errors.documents?.idCard && (
              <p className="text-red-500 text-sm mt-1">{errors.documents.idCard.message}</p>
            )}
            {idPreview && (
              <img src={idPreview} alt="ID Preview" className="mt-2 h-20 object-contain" />
            )}
          </div>
          <div>
            <label className="label">Upload Qualification (Optional)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, 'qualification')}
              className="input-field"
            />
            {qualificationPreview && (
              <img src={qualificationPreview} alt="Qualification Preview" className="mt-2 h-20 object-contain" />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              'Submit Registration'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
