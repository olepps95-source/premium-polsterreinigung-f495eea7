import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Price {
  id: string;
  title: string;
  price: string;
  numeric_price: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function usePrices() {
  return useQuery({
    queryKey: ['prices'],
    queryFn: async (): Promise<Price[]> => {
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useAllPrices() {
  return useQuery({
    queryKey: ['prices', 'all'],
    queryFn: async (): Promise<Price[]> => {
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - prevent refetching too often
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
}

export function useUpdatePrice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, title, price, numeric_price }: { 
      id: string; 
      title: string; 
      price: string;
      numeric_price: number;
    }) => {
      const { data, error } = await supabase
        .from('prices')
        .update({ title, price, numeric_price })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (updatedPrice) => {
      // Update the cache optimistically instead of invalidating
      queryClient.setQueryData(['prices', 'all'], (old: Price[] | undefined) => {
        if (!old) return old;
        return old.map(p => p.id === updatedPrice.id ? updatedPrice : p);
      });
      queryClient.setQueryData(['prices'], (old: Price[] | undefined) => {
        if (!old) return old;
        return old.map(p => p.id === updatedPrice.id ? updatedPrice : p);
      });
    },
  });
}
