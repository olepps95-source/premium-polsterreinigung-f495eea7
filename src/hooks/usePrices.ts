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
        .order('sort_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useAllPrices() {
  return useQuery({
    queryKey: ['prices', 'all'],
    queryFn: async (): Promise<Price[]> => {
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .order('sort_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdatePrice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, title, price, numeric_price, sort_order, is_active }: { 
      id: string; 
      title: string; 
      price: string;
      numeric_price: number;
      sort_order: number;
      is_active: boolean;
    }) => {
      const { error } = await supabase
        .from('prices')
        .update({ title, price, numeric_price, sort_order, is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    // Don't invalidate on individual mutations - let the caller handle batch invalidation
  });
}

// Batch update function that invalidates cache only once after all updates
export function useBatchUpdatePrices() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: Array<{ 
      id: string; 
      title: string; 
      price: string;
      numeric_price: number;
      sort_order: number;
      is_active: boolean;
    }>) => {
      // Execute all updates in parallel
      const results = await Promise.all(
        updates.map(({ id, title, price, numeric_price, sort_order, is_active }) =>
          supabase
            .from('prices')
            .update({ title, price, numeric_price, sort_order, is_active })
            .eq('id', id)
        )
      );
      
      // Check for any errors
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error(`${errors.length} update(s) failed`);
      }
    },
    onSuccess: () => {
      // Invalidate cache only once after all updates complete
      queryClient.invalidateQueries({ 
        queryKey: ['prices'],
        refetchType: 'active'
      });
    },
  });
}
