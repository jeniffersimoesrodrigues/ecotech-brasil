CREATE TABLE public.survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  q1 text NOT NULL, q2 text NOT NULL, q3 text NOT NULL, q4 text NOT NULL, q5 text NOT NULL,
  feedback text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fb_len CHECK (feedback IS NULL OR char_length(feedback) <= 1000),
  CONSTRAINT ans_len CHECK (char_length(q1)<=40 AND char_length(q2)<=40 AND char_length(q3)<=40 AND char_length(q4)<=40 AND char_length(q5)<=40)
);
GRANT INSERT ON public.survey_responses TO anon, authenticated;
GRANT ALL ON public.survey_responses TO service_role;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit" ON public.survey_responses FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.survey_stats()
RETURNS TABLE(question text, answer text, total bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT 'q1', q1, count(*) FROM survey_responses GROUP BY q1
  UNION ALL SELECT 'q2', q2, count(*) FROM survey_responses GROUP BY q2
  UNION ALL SELECT 'q3', q3, count(*) FROM survey_responses GROUP BY q3
  UNION ALL SELECT 'q4', q4, count(*) FROM survey_responses GROUP BY q4
  UNION ALL SELECT 'q5', q5, count(*) FROM survey_responses GROUP BY q5;
$$;
GRANT EXECUTE ON FUNCTION public.survey_stats() TO anon, authenticated;