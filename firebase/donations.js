// /firebase/donations.js
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from './config';

export const donationOperations = {
  // Create a new money donation
  createMoneyDonation: async (donationData) => {
    try {
      const docRef = await addDoc(collection(db, 'donationsMoney'), {
        ...donationData,
        createdAt: serverTimestamp(),
        status: 'completed'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  },

  // Get total donations amount
  getTotalDonations: async () => {
    try {
      const q = query(
        collection(db, 'donationsMoney'),
        where('status', '==', 'completed')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.reduce((total, doc) => {
        return total + (doc.data().amount || 0);
      }, 0);
    } catch (error) {
      console.error('Error getting total donations:', error);
      throw error;
    }
  }
};