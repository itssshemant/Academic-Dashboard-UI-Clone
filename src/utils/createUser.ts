// Utility to create a user - can be called from browser console or component
import { projectId, publicAnonKey } from './supabase/info';

export async function createUser(email: string, password: string, name: string) {
  try {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-fa2e4b52/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({ email, password, name })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error creating user:', data.error);
      return { success: false, error: data.error };
    }

    console.log('User created successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error calling signup endpoint:', error);
    return { success: false, error: String(error) };
  }
}
