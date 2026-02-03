-- ============================================
-- CLEAN RESET: Drop all existing objects
-- ============================================

-- Drop triggers first
DROP TRIGGER IF EXISTS update_prices_updated_at ON public.prices;

-- Drop RLS policies on prices
DROP POLICY IF EXISTS "Admins can delete prices" ON public.prices;
DROP POLICY IF EXISTS "Admins can insert prices" ON public.prices;
DROP POLICY IF EXISTS "Admins can update prices" ON public.prices;
DROP POLICY IF EXISTS "Anyone can read prices" ON public.prices;

-- Drop RLS policies on user_roles
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Drop tables
DROP TABLE IF EXISTS public.prices CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Drop enum
DROP TYPE IF EXISTS public.app_role;

-- ============================================
-- CREATE SIMPLE PRICES TABLE
-- ============================================

CREATE TABLE public.prices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;

-- Single policy: everyone can read
CREATE POLICY "Anyone can read prices"
ON public.prices
FOR SELECT
USING (true);

-- ============================================
-- INSERT INITIAL PRICE DATA
-- ============================================

INSERT INTO public.prices (id, title, price, sort_order, is_active) VALUES
  ('sessel', 'Sessel', '40 €', 1, true),
  ('sofa-2-sitzer', 'Sofa 2-Sitzer', '90 €', 2, true),
  ('sofa-3-sitzer', 'Sofa 3-Sitzer', '110 €', 3, true),
  ('eckcouch', 'Eckcouch', '130 €', 4, true),
  ('eckcouch-gross', 'Eckcouch groß', '160 €', 5, true),
  ('matratze-90', 'Matratze 90 cm', '60 €', 6, true),
  ('matratze-140', 'Matratze 140 cm', '90 €', 7, true),
  ('matratze-180', 'Matratze 180 cm', '120 €', 8, true),
  ('bettrahmen', 'Bettrahmen / Bettpolster', '70 €', 9, true),
  ('hocker-klein', 'Kleiner Hocker', '30 €', 10, true),
  ('hocker-gross', 'Großer Hocker', '40 €', 11, true),
  ('autositz', 'Autositz', '20 €', 12, true),
  ('kuechenstuhl', 'Küchenstuhl', '15 €', 13, true),
  ('buerostuhl', 'Bürostuhl', '20 €', 14, true),
  ('geruchsentfernung', 'Geruchsentfernung', '30 € pro m²', 15, true),
  ('trocknung', 'Vollständige Trocknung', '+30 %', 16, true);