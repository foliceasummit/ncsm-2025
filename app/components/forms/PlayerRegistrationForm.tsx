'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

const playerSchema = z.object({
  county: z.string().min(1, 'County is required'),
  nir: z.string().min(1, 'NIR/Passport number is required'),
  lastName: z.string().min(1, 'Last name is required'),
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  placeOfBirth: z.object({
    town: z.string().min(1, 'Town is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required')
  }),
  currentClub: z.object({
    name: z.string().min(1, 'Current club name is required'),
    division: z.string().min(1, 'Division is required'),
    year: z.string().min(1, 'Year is required')
  }),
  lastClub: z.object({
    name: z.string().optional(),
    division: z.string().optional(),
    year: z.string().optional()
  }),
  lastCounty: z.object({
    name: z.string().optional(),
    year: z.string().optional()
  }),
  documents: z.object({
    idCard: z.string().min(1, 'National ID/Passport is required'),
    medicalCertificate: z.string().min(1, 'Medical certificate is required')
  })
})

type PlayerFormData = z.infer<typeof playerSchema>

export default function PlayerRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [idPreview, setIdPreview] = useState<string>('')
  const [medicalPreview, setMedicalPreview] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema)
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'medical') => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (type === 'id') {
          setIdPreview(e.target?.result as string)
        } else {
          setMedicalPreview(e.target?.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: PlayerFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement API call to register player
      const response = await fetch('/api/players/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Player registered successfully!')
        reset()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to register player')
      }
    } catch (error) {
      toast.error('An error occurred while registering player')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">PLAYER&apos;S REGISTRATION FORM</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* NIR/Passport Number */}
        <div className="flex justify-end">
          <div className="w-1/3">
            <label className="label">NIR/Passport #</label>
            <input
              {...register('nir')}
              className="input-field"
              placeholder="Enter NIR/Passport number"
            />
            {errors.nir && (
              <p className="text-red-500 text-sm mt-1">{errors.nir.message}</p>
            )}
          </div>
        </div>

        {/* County */}
        <div>
          <label className="label">County *</label>
          <input
            {...register('county')}
            className="input-field"
            placeholder="Enter county name"
          />
          {errors.county && (
            <p className="text-red-500 text-sm mt-1">{errors.county.message}</p>
          )}
        </div>

        {/* Player's Name */}
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

        {/* Date of Birth */}
        <div>
          <label className="label">Date of Birth *</label>
          <input
            type="date"
            {...register('dateOfBirth')}
            className="input-field"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* Place of Birth */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Town *</label>
            <input
              {...register('placeOfBirth.town')}
              className="input-field"
              placeholder="Enter town"
            />
            {errors.placeOfBirth?.town && (
              <p className="text-red-500 text-sm mt-1">{errors.placeOfBirth.town.message}</p>
            )}
          </div>
          <div>
            <label className="label">City *</label>
            <input
              {...register('placeOfBirth.city')}
              className="input-field"
              placeholder="Enter city"
            />
            {errors.placeOfBirth?.city && (
              <p className="text-red-500 text-sm mt-1">{errors.placeOfBirth.city.message}</p>
            )}
          </div>
          <div>
            <label className="label">Country *</label>
            <input
              {...register('placeOfBirth.country')}
              className="input-field"
              placeholder="Enter country"
            />
            {errors.placeOfBirth?.country && (
              <p className="text-red-500 text-sm mt-1">{errors.placeOfBirth.country.message}</p>
            )}
          </div>
        </div>

        {/* Current Club */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Current Club *</label>
            <input
              {...register('currentClub.name')}
              className="input-field"
              placeholder="Enter current club"
            />
            {errors.currentClub?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.currentClub.name.message}</p>
            )}
          </div>
          <div>
            <label className="label">Division *</label>
            <input
              {...register('currentClub.division')}
              className="input-field"
              placeholder="Enter division"
            />
            {errors.currentClub?.division && (
              <p className="text-red-500 text-sm mt-1">{errors.currentClub.division.message}</p>
            )}
          </div>
          <div>
            <label className="label">Year *</label>
            <input
              {...register('currentClub.year')}
              className="input-field"
              placeholder="Enter year"
            />
            {errors.currentClub?.year && (
              <p className="text-red-500 text-sm mt-1">{errors.currentClub.year.message}</p>
            )}
          </div>
        </div>

        {/* Last Club */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Last Club</label>
            <input
              {...register('lastClub.name')}
              className="input-field"
              placeholder="Enter last club"
            />
          </div>
          <div>
            <label className="label">Division</label>
            <input
              {...register('lastClub.division')}
              className="input-field"
              placeholder="Enter division"
            />
          </div>
          <div>
            <label className="label">Year</label>
            <input
              {...register('lastClub.year')}
              className="input-field"
              placeholder="Enter year"
            />
          </div>
        </div>

        {/* Last County */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Last County</label>
            <input
              {...register('lastCounty.name')}
              className="input-field"
              placeholder="Enter last county"
            />
          </div>
          <div>
            <label className="label">Year</label>
            <input
              {...register('lastCounty.year')}
              className="input-field"
              placeholder="Enter year"
            />
          </div>
        </div>

        {/* Document Upload */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Upload National ID/Passport *</label>
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
            <label className="label">Upload Medical Certificate *</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, 'medical')}
              className="input-field"
            />
            {errors.documents?.medicalCertificate && (
              <p className="text-red-500 text-sm mt-1">{errors.documents.medicalCertificate.message}</p>
            )}
            {medicalPreview && (
              <img src={medicalPreview} alt="Medical Certificate Preview" className="mt-2 h-20 object-contain" />
            )}
          </div>
        </div>

        {/* Declaration */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            I hereby declare that the information being provided true to the best of my knowledge. 
            Any deceptive information shall automatically ban me from participating in the 2025/2026 
            National County Sports Meet. Further agree to abide by all rules and regulations of the tournament.
          </p>
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
