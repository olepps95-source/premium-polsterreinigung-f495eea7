-- Add update policy for admin (identified by email)
-- This allows the specific admin email to update prices

CREATE POLICY "Admin can update prices"
ON public.prices
FOR UPDATE
USING (
  auth.jwt() ->> 'email' = 'olep.ps95@gmail.com'
)
WITH CHECK (
  auth.jwt() ->> 'email' = 'olep.ps95@gmail.com'
);

-- Also add insert and delete policies for completeness
CREATE POLICY "Admin can insert prices"
ON public.prices
FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'email' = 'olep.ps95@gmail.com'
);

CREATE POLICY "Admin can delete prices"
ON public.prices
FOR DELETE
USING (
  auth.jwt() ->> 'email' = 'olep.ps95@gmail.com'
);