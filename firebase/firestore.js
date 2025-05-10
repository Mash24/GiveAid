// /firebase/firestore.js
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where,
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from './config';
  
  // User Profile Operations
  export const userOperations = {
    // Get user profile
    getUserProfile: async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        return userDoc.exists() ? userDoc.data() : null;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
    },
  
    // Update user profile
    updateUserProfile: async (userId, data) => {
      try {
        await updateDoc(doc(db, 'users', userId), {
          ...data,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    }
  };
  
  // Donation Operations
  export const donationOperations = {
    // Create new donation
    createDonation: async (donationData) => {
      try {
        const donationRef = doc(collection(db, 'donations'));
        await setDoc(donationRef, {
          ...donationData,
          createdAt: serverTimestamp(),
          status: 'pending'
        });
        return donationRef.id;
      } catch (error) {
        console.error('Error creating donation:', error);
        throw error;
      }
    },
  
    // Get all donations (public)
    getAllDonations: async () => {
      try {
        const donationsQuery = query(collection(db, 'donations'));
        const snapshot = await getDocs(donationsQuery);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching donations:', error);
        throw error;
      }
    },
  
    // Get user's donations
    getUserDonations: async (userId) => {
      try {
        const donationsQuery = query(
          collection(db, 'donations'),
          where('userId', '==', userId)
        );
        const snapshot = await getDocs(donationsQuery);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching user donations:', error);
        throw error;
      }
    }
  };
  
  // Beneficiary Request Operations
  export const beneficiaryOperations = {
    // Create beneficiary request
    createRequest: async (requestData) => {
      try {
        const requestRef = doc(collection(db, 'beneficiaryRequests'));
        await setDoc(requestRef, {
          ...requestData,
          createdAt: serverTimestamp(),
          status: 'pending'
        });
        return requestRef.id;
      } catch (error) {
        console.error('Error creating beneficiary request:', error);
        throw error;
      }
    },
  
    // Get user's requests
    getUserRequests: async (userId) => {
      try {
        const requestsQuery = query(
          collection(db, 'beneficiaryRequests'),
          where('userId', '==', userId)
        );
        const snapshot = await getDocs(requestsQuery);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching user requests:', error);
        throw error;
      }
    }
  };
  
  // Blog Post Operations (Admin only)
  export const blogOperations = {
    // Create blog post
    createBlogPost: async (postData) => {
      try {
        const postRef = doc(collection(db, 'blogPosts'));
        await setDoc(postRef, {
          ...postData,
          createdAt: serverTimestamp(),
          published: false
        });
        return postRef.id;
      } catch (error) {
        console.error('Error creating blog post:', error);
        throw error;
      }
    },
  
    // Get all blog posts (public)
    getAllBlogPosts: async () => {
      try {
        const postsQuery = query(collection(db, 'blogPosts'));
        const snapshot = await getDocs(postsQuery);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
    }
  };
  
  // Impact Story Operations (Admin only)
  export const impactOperations = {
    // Create impact story
    createImpactStory: async (storyData) => {
      try {
        const storyRef = doc(collection(db, 'impactStories'));
        await setDoc(storyRef, {
          ...storyData,
          createdAt: serverTimestamp()
        });
        return storyRef.id;
      } catch (error) {
        console.error('Error creating impact story:', error);
        throw error;
      }
    },
  
    // Get all impact stories (public)
    getAllImpactStories: async () => {
      try {
        const storiesQuery = query(collection(db, 'impactStories'));
        const snapshot = await getDocs(storiesQuery);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching impact stories:', error);
        throw error;
      }
    }
  };
  
  // Admin Operations
  export const adminOperations = {
    // Check if user is admin
    isAdmin: async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        return userDoc.exists() && userDoc.data().isAdmin === true;
      } catch (error) {
        console.error('Error checking admin status:', error);
        throw error;
      }
    },
  
    // Get admin data
    getAdminData: async (docId) => {
      try {
        const adminDoc = await getDoc(doc(db, 'adminData', docId));
        return adminDoc.exists() ? adminDoc.data() : null;
      } catch (error) {
        console.error('Error fetching admin data:', error);
        throw error;
      }
    }
  };