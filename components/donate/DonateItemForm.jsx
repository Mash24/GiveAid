// /components/donate/DonateItemForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { donationOperations } from '../../firebase/firestore';
import { uploadImage } from '../../firebase/storage';
import { dropoffLocations } from '../../utils/dropoffLocations';
import ProtectedRoute from '../layout/ProtectedRoute';

// Form validation schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  category: yup.string().required('Category is required'),
  condition: yup.string().required('Condition is required'),
  ageSuitability: yup.string().required('Age suitability is required'),
  pickupOption: yup.string().required('Pickup option is required'),
  location: yup.string().when('pickupOption', {
    is: 'pickup',
    then: yup.string().required('Location is required'),
    otherwise: yup.string().notRequired()
  }),
  dropoffLocation: yup.string().when('pickupOption', {
    is: 'dropoff',
    then: yup.string().required('Drop-off location is required'),
    otherwise: yup.string().notRequired()
  }),
  images: yup.array().max(3, 'Maximum 3 images allowed')
});

const categories = [
  'Clothes',
  'Books',
  'Shoes',
  'Electronics',
  'Furniture',
  'Toys',
  'Other'
];

const conditions = [
  'New',
  'Like New',
  'Good',
  'Fair',
  'Worn'
];

const ageSuitabilities = [
  'Baby',
  'Child',
  'Teen',
  'Adult',
  'All Ages'
];

const DonateItemForm = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      pickupOption: 'pickup',
      images: []
    }
  });

  const pickupOption = watch('pickupOption');

  const onSubmit = async (data) => {
    if (!user) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Upload images first
      const imageUrls = await Promise.all(
        data.images.map((file, index) => {
          setUploadProgress(((index + 1) / data.images.length) * 100);
          return uploadImage(file, user.uid);
        })
      );

      // Prepare donation data
      const donationData = {
        userId: user.uid,
        title: data.title,
        description: data.description,
        category: data.category,
        condition: data.condition,
        ageSuitability: data.ageSuitability,
        pickupOption: data.pickupOption,
        location: data.pickupOption === 'pickup' ? data.location : null,
        dropoffLocation: data.pickupOption === 'dropoff' ? data.dropoffLocation : null,
        images: imageUrls,
        status: 'pending'
      };

      // Create donation in Firestore
      await donationOperations.createDonation(donationData);

      // Reset form and redirect
      reset();
      router.push('/dashboard/donations');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Donate an Item</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register('category')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Condition</label>
            <select
              {...register('condition')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select condition</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
            {errors.condition && (
              <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
            )}
          </div>

          {/* Age Suitability */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age Suitability</label>
            <select
              {...register('ageSuitability')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select age suitability</option>
              {ageSuitabilities.map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
            {errors.ageSuitability && (
              <p className="mt-1 text-sm text-red-600">{errors.ageSuitability.message}</p>
            )}
          </div>

          {/* Pickup Option */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Option</label>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="pickup"
                  {...register('pickupOption')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Pick up from me</span>
              </label>
              <br />
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="dropoff"
                  {...register('pickupOption')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">I'll drop it off</span>
              </label>
            </div>
            {errors.pickupOption && (
              <p className="mt-1 text-sm text-red-600">{errors.pickupOption.message}</p>
            )}
          </div>

          {/* Location based on pickup option */}
          {pickupOption === 'pickup' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <input
                type="text"
                {...register('location')}
                placeholder="Enter your address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">Drop-off Location</label>
              <select
                {...register('dropoffLocation')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a drop-off location</option>
                {dropoffLocations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name} - {location.address}
                  </option>
                ))}
              </select>
              {errors.dropoffLocation && (
                <p className="mt-1 text-sm text-red-600">{errors.dropoffLocation.message}</p>
              )}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Images (max 3)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files).slice(0, 3);
                register('images').onChange({ target: { value: files } });
              }}
              className="mt-1 block w-full"
            />
            {errors.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Donation'}
            </button>
          </div>

          {/* Upload Progress */}
          {isSubmitting && uploadProgress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Uploading images... {Math.round(uploadProgress)}%
              </p>
            </div>
          )}
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default DonateItemForm;