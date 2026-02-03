-- Create app_role enum for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Only admins can insert roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can delete roles
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create prices table
CREATE TABLE public.prices (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    numeric_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on prices
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read prices (public data)
CREATE POLICY "Anyone can read prices"
ON public.prices
FOR SELECT
USING (true);

-- Policy: Only admins can insert prices
CREATE POLICY "Admins can insert prices"
ON public.prices
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can update prices
CREATE POLICY "Admins can update prices"
ON public.prices
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can delete prices
CREATE POLICY "Admins can delete prices"
ON public.prices
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_prices_updated_at
BEFORE UPDATE ON public.prices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial price data
INSERT INTO public.prices (id, title, price, numeric_price, sort_order) VALUES
('sessel', 'Sessel', '40 €', 40, 1),
('sofa-2', 'Sofa 2-Sitzer', '90 €', 90, 2),
('sofa-3', 'Sofa 3-Sitzer', '110 €', 110, 3),
('ecksofa', 'ECKCOUCH', '130 €', 130, 4),
('ecksofa-gross', 'ECKCOUCH, groß', '160 €', 160, 5),
('matratze-90', 'Matratze 90 cm', '60 €', 60, 6),
('matratze-140', 'Matratze 140 cm', '90 €', 90, 7),
('matratze-180', 'Matratze 180 cm', '120 €', 120, 8),
('bettrahmen', 'Bettrahmen / Bettpolster', '70 €', 70, 9),
('hocker-klein', 'Kleiner Hocker', '30 €', 30, 10),
('hocker-gross', 'Großer Hocker', '40 €', 40, 11),
('autositz', 'Autositz', '20 €', 20, 12),
('kuechenstuhl', 'Küchenstuhl', '15 €', 15, 13),
('buerostuhl', 'Bürostuhl', '20 €', 20, 14),
('teppich-klein', 'Teppich (bis 10 m²)', '10 € pro m²', 10, 15),
('teppich-gross', 'Teppich (über 10 m²)', 'Preis nach Absprache', 0, 16),
('geruchsentfernung', 'Geruchsentfernung', '30 € pro m²', 30, 17),
('trocknung', 'Vollständige Trocknung', '+30 %', 0, 18);