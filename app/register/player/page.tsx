'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../contexts/AuthContext'
import { 
  UserIcon, 
  PhotoIcon,
  CheckIcon,
  XMarkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const playerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  middleName: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  discipline: z.enum(['FOOTBALL', 'VOLLEYBALL', 'BASKETBALL', 'ATHLETICS', 'KICKBALL', 'FEMALE_SOCCER']),
  level: z.enum(['3rd Division', 'Second Division', 'First Division']),
  year: z.number().min(2024, 'Year must be 2024 or later'),
  group: z.enum(['A', 'B', 'C', 'D']),
  countyId: z.string().min(1, 'County is required'),
  pastClub: z.string().optional(),
  currentClub: z.string().optional(),
})

type PlayerFormData = z.infer<typeof playerSchema>

interface County {
  id: string
  name: string
}

export default function PlayerRegistrationPage() {
  const { user, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const [birthCertificate, setBirthCertificate] = useState<File | null>(null)
  const [birthCertificatePreview, setBirthCertificatePreview] = useState<string>('')
  const [medicalCertificate, setMedicalCertificate] = useState<File | null>(null)
  const [medicalCertificatePreview, setMedicalCertificatePreview] = useState<string>('')
  const [counties, setCounties] = useState<County[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      year: 2024,
    },
  })

  // Fetch counties on component mount
  useEffect(() => {
    fetchCounties()
  }, [])

  const fetchCounties = async () => {
    try {
      const response = await fetch('/api/counties')
      if (response.ok) {
        const data = await response.json()
        setCounties(data)
      }
    } catch (error) {
      console.error('Error fetching counties:', error)
    }
  }

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

  const handleBirthCertificateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBirthCertificate(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setBirthCertificatePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMedicalCertificateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setMedicalCertificate(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setMedicalCertificatePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadPhoto = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'player')

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

  const uploadBirthCertificate = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'birth_certificate')

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload birth certificate')
    }

    const data = await response.json()
    return data.url
  }

  const uploadMedicalCertificate = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'medical_certificate')

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload medical certificate')
    }

    const data = await response.json()
    return data.url
  }

  const onSubmit = async (data: PlayerFormData) => {
    if (!user) {
      toast.error('You must be logged in to register a player')
      return
    }

    if (!photo) {
      toast.error('Player photo is required')
      return
    }

    if (!birthCertificate) {
      toast.error('Birth Certificate, National ID, or Passport is required')
      return
    }

    if (!medicalCertificate) {
      toast.error('Medical Certificate is required')
      return
    }

    setIsSubmitting(true)

    try {
      let photoUrl = ''
      let birthCertificateUrl = ''
      let medicalCertificateUrl = ''

      if (photo) {
        photoUrl = await uploadPhoto(photo)
      }

      if (birthCertificate) {
        birthCertificateUrl = await uploadBirthCertificate(birthCertificate)
      }

      if (medicalCertificate) {
        medicalCertificateUrl = await uploadMedicalCertificate(medicalCertificate)
      }

      const playerData = {
        ...data,
        userId: user.id,
        photo: photoUrl,
        birthCertificate: birthCertificateUrl,
        medicalCertificate: medicalCertificateUrl,
      }

      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      })

      if (response.ok) {
        toast.success('Player registration submitted successfully!')
        reset()
        setPhoto(null)
        setPhotoPreview('')
        setBirthCertificate(null)
        setBirthCertificatePreview('')
        setMedicalCertificate(null)
        setMedicalCertificatePreview('')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to submit registration')
      }
    } catch (error) {
      console.error('Error submitting player registration:', error)
      toast.error('Failed to submit registration')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
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
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Login Required
            </h1>
            <p className="text-gray-600">
              You must be logged in to register a player.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Player Registration
            </h1>
            <p className="text-gray-600">
              Register a new player for the National County Sports Meet
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🏅 Register New Player
                </h2>
                <p className="text-gray-600">
                  Complete the form below to register a new player for NCSM 2025
                </p>
              </div>

              {/* Upload Player Photo */}
              <div>
                <label className="label">Upload Player Photo *</label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:border-blue-400 transition-colors">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Player photo preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PhotoIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <PhotoIcon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          Click to upload or drag and drop
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </label>
                      {photo && (
                        <button
                          type="button"
                          onClick={() => {
                            setPhoto(null)
                            setPhotoPreview('')
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                        >
                          <XMarkIcon className="w-4 h-4 mr-1" />
                          Remove photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Date of Birth *</label>
                  <input
                    {...register('dateOfBirth')}
                    type="date"
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">mm/dd/yyyy</p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Past Club</label>
                  <input
                    {...register('pastClub')}
                    className="input-field"
                    placeholder="Enter past club"
                  />
                </div>

                <div>
                  <label className="label">Current Club</label>
                  <input
                    {...register('currentClub')}
                    className="input-field"
                    placeholder="Enter current club"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Level *</label>
                  <select {...register('level')} className="input-field">
                    <option value="">Select Level</option>
                    <option value="3rd Division">3rd Division</option>
                    <option value="Second Division">Second Division</option>
                    <option value="First Division">First Division</option>
                  </select>
                  {errors.level && (
                    <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Discipline *</label>
                  <select {...register('discipline')} className="input-field">
                    <option value="">Select Discipline</option>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <label className="label">Group</label>
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

                <div>
                  <label className="label">County</label>
                  <select {...register('countyId')} className="input-field">
                    <option value="">Select county</option>
                    {counties.map((county) => (
                      <option key={county.id} value={county.id}>
                        {county.name}
                      </option>
                    ))}
                  </select>
                  {errors.countyId && (
                    <p className="text-red-500 text-sm mt-1">{errors.countyId.message}</p>
                  )}
                </div>
              </div>

              {/* Upload Player Birth Certificate or National ID or Passport */}
              <div>
                <label className="label">Upload Player Birth Certificate or National ID or Passport *</label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:border-blue-400 transition-colors">
                      {birthCertificatePreview ? (
                        <img
                          src={birthCertificatePreview}
                          alt="Document preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleBirthCertificateChange}
                        className="hidden"
                        id="birth-certificate-upload"
                      />
                      <label
                        htmlFor="birth-certificate-upload"
                        className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <DocumentTextIcon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          Click to upload or drag and drop
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </label>
                      {birthCertificate && (
                        <button
                          type="button"
                          onClick={() => {
                            setBirthCertificate(null)
                            setBirthCertificatePreview('')
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                        >
                          <XMarkIcon className="w-4 h-4 mr-1" />
                          Remove document
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Player Medical Certificate */}
              <div>
                <label className="label">Upload Player Medical Certificate *</label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:border-green-400 transition-colors">
                      {medicalCertificatePreview ? (
                        <img
                          src={medicalCertificatePreview}
                          alt="Medical certificate preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleMedicalCertificateChange}
                        className="hidden"
                        id="medical-certificate-upload"
                      />
                      <label
                        htmlFor="medical-certificate-upload"
                        className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                      >
                        <DocumentTextIcon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          Click to upload or drag and drop
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </label>
                      {medicalCertificate && (
                        <button
                          type="button"
                          onClick={() => {
                            setMedicalCertificate(null)
                            setMedicalCertificatePreview('')
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                        >
                          <XMarkIcon className="w-4 h-4 mr-1" />
                          Remove document
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center px-8 py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-5 h-5 mr-2" />
                      Submit Registration
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
