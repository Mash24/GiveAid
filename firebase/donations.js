// /firebase/donations.js
import { collection, addDoc, getDocs, query, where, sum } from 'firebase/firestore';
import { db } from './config';

export const donationOperations = {
  // Create a new money donation
  createMoneyDonation: async (donationData) => {
    try {
      const docRef = await addDoc(collection(db, 'moneyDonations'), {
        ...donationData,
        createdAt: new Date().toISOString(),
        status: 'pending', // pending, completed, failed
        paymentStatus: 'pending', // pending, paid, failed
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating money donation:', error);
      throw new Error('Failed to create donation. Please try again.');
    }
  },

  // Create a new item donation
  createItemDonation: async (donationData) => {
    try {
      const docRef = await addDoc(collection(db, 'itemDonations'), {
        ...donationData,
        createdAt: new Date().toISOString(),
        status: 'pending', // pending, accepted, rejected
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating item donation:', error);
      throw new Error('Failed to create item donation. Please try again.');
    }
  },

  // Get total donations amount
  getTotalDonations: async () => {
    try {
      const donationsRef = collection(db, 'moneyDonations');
      const q = query(donationsRef, where('status', '==', 'completed'));
      const querySnapshot = await getDocs(q);
      
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.paymentStatus === 'paid') {
          total += data.amount;
        }
      });
      
      return total;
    } catch (error) {
      console.error('Error getting total donations:', error);
      return 0;
    }
  },

  // Get user's donations
  getUserDonations: async (userId) => {
    try {
      const donationsRef = collection(db, 'moneyDonations');
      const q = query(donationsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const donations = [];
      querySnapshot.forEach((doc) => {
        donations.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return donations;
    } catch (error) {
      console.error('Error getting user donations:', error);
      throw new Error('Failed to fetch donations. Please try again.');
    }
  },

  // Update donation status
  updateDonationStatus: async (donationId, status, paymentStatus = null) => {
    try {
      const donationRef = doc(db, 'moneyDonations', donationId);
      const updateData = { status };
      if (paymentStatus) {
        updateData.paymentStatus = paymentStatus;
      }
      await updateDoc(donationRef, updateData);
    } catch (error) {
      console.error('Error updating donation status:', error);
      throw new Error('Failed to update donation status. Please try again.');
    }
  }
};