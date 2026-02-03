import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Price {
  id: string;
  title: string;
  price: string;
  sort_order: number;
  is_active: boolean;
}

// Fetch only active prices (for public display)
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

// Fetch all prices (for admin)
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
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

// Update a single price
export function useUpdatePrice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (price: Partial<Price> & { id: string }) => {
      const { data, error } = await supabase
        .from('prices')
        .update(price)
        .eq('id', price.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch after successful update
      queryClient.invalidateQueries({ queryKey: ['prices'] });
    },
  });
}
