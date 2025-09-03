'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../contexts/AuthContext'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'
import { 
  UserIcon, 
  PhotoIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const officialSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  middleName: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  discipline: z.enum(['FOOTBALL', 'VOLLEYBALL', 'BASKETBALL', 'ATHLETICS', 'KICKBALL', 'FEMALE_SOCCER']),
  position: z.string().min(1, 'Position is required'),
  currentCounty: z.string().min(1, 'Current county is required'),
  year: z.number().min(2024, 'Year must be 2024 or later'),
  group: z.enum(['A', 'B', 'C', 'D']),
})

type OfficialFormData = z.infer<typeof officialSchema>

export default function OfficialRegistrationPage() {
  const { user, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OfficialFormData>({
    resolver: zodResolver(officialSchema),
    defaultValues: {
      year: 2024,
    },
  })

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadPhoto = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'official')

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload photo')
    }

    const data = await response.json()
    return data.url
  }

  const onSubmit = async (data: OfficialFormData) => {
    if (!user) {
      toast.error('You must be logged in to register an official')
      return
    }

    setIsSubmitting(true)

    try {
      let photoUrl = ''
      if (photo) {
        photoUrl = await uploadPhoto(photo)
      }

      const officialData = {
        ...data,
        userId: user.id,
        photo: photoUrl,
      }

      const response = await fetch('/api/officials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(officialData),
      })

      if (response.ok) {
        toast.success('Official registration submitted successfully!')
        reset()
        setPhoto(null)
        setPhotoPreview('')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to submit registration')
      }
    } catch (error) {
      console.error('Error submitting official registration:', error)
      toast.error('Failed to submit registration')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Login Required
            </h1>
            <p className="text-gray-600">
              You must be logged in to register an official.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Official Registration
            </h1>
            <p className="text-gray-600">
              Register a new match official for the National County Sports Meet
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="label">Date of Birth *</label>
                    <input
                      {...register('dateOfBirth')}
                      type="date"
                      className="input-field"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Nationality *</label>
                    <input
                      {...register('nationality')}
                      className="input-field"
                      placeholder="Enter nationality"
                    />
                    {errors.nationality && (
                      <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Official Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Official Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Discipline *</label>
                    <select {...register('discipline')} className="input-field">
                      <option value="">Select discipline</option>
                      <option value="FOOTBALL">Football</option>
                      <option value="VOLLEYBALL">Volleyball</option>
                      <option value="BASKETBALL">Basketball</option>
                      <option value="ATHLETICS">Athletics</option>
                      <option value="KICKBALL">Kickball</option>
                      <option value="FEMALE_SOCCER">Female Soccer</option>
                    </select>
                    {errors.discipline && (
                      <p className="text-red-500 text-sm mt-1">{errors.discipline.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Position *</label>
                    <select {...register('position')} className="input-field">
                      <option value="">Select position</option>
                      <option value="Referee">Referee</option>
                      <option value="Assistant Referee">Assistant Referee</option>
                      <option value="Fourth Official">Fourth Official</option>
                      <option value="Line Judge">Line Judge</option>
                      <option value="Timekeeper">Timekeeper</option>
                      <option value="Scorer">Scorer</option>
                      <option value="Match Commissioner">Match Commissioner</option>
                    </select>
                    {errors.position && (
                      <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="label">Current County *</label>
                    <select {...register('currentCounty')} className="input-field">
                      <option value="">Select county</option>
                      <option value="Montserrado">Montserrado</option>
                      <option value="Nimba">Nimba</option>
                      <option value="Bong">Bong</option>
                      <option value="Lofa">Lofa</option>
                      <option value="Grand Bassa">Grand Bassa</option>
                      <option value="Margibi">Margibi</option>
                      <option value="Bomi">Bomi</option>
                      <option value="Grand Cape Mount">Grand Cape Mount</option>
                      <option value="River Cess">River Cess</option>
                      <option value="Sinoe">Sinoe</option>
                      <option value="Grand Gedeh">Grand Gedeh</option>
                      <option value="River Gee">River Gee</option>
                      <option value="Maryland">Maryland</option>
                      <option value="Grand Kru">Grand Kru</option>
                      <option value="Gbarpolu">Gbarpolu</option>
                    </select>
                    {errors.currentCounty && (
                      <p className="text-red-500 text-sm mt-1">{errors.currentCounty.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Year *</label>
                    <input
                      {...register('year', { valueAsNumber: true })}
                      type="number"
                      className="input-field"
                      min="2024"
                    />
                    {errors.year && (
                      <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Group *</label>
                    <select {...register('group')} className="input-field">
                      <option value="">Select group</option>
                      <option value="A">Group A</option>
                      <option value="B">Group B</option>
                      <option value="C">Group C</option>
                      <option value="D">Group D</option>
                    </select>
                    {errors.group && (
                      <p className="text-red-500 text-sm mt-1">{errors.group.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Official Photo
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Official photo preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PhotoIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="btn-outline cursor-pointer"
                      >
                        <PhotoIcon className="w-4 h-4 mr-2" />
                        Upload Photo
                      </label>
                      {photo && (
                        <button
                          type="button"
                          onClick={() => {
                            setPhoto(null)
                            setPhotoPreview('')
                          }}
                          className="ml-2 p-1 text-red-500 hover:text-red-700"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload a clear photo of the official. Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Submit Registration
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
