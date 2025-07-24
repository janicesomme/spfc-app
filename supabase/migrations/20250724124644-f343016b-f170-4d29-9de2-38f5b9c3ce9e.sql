-- Enable public read access to latest_videos table
CREATE POLICY "Allow public read on latest_videos" 
ON public.latest_videos 
FOR SELECT 
USING (true);