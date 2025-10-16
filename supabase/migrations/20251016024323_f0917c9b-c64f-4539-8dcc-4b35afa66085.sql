-- Add borrowed status to products
ALTER TABLE public.products 
ADD COLUMN is_borrowed BOOLEAN NOT NULL DEFAULT false;

-- Add borrow dates to interests
ALTER TABLE public.interests
ADD COLUMN borrow_start_date DATE,
ADD COLUMN borrow_end_date DATE;