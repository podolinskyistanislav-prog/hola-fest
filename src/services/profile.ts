import { supabase } from './supabase';

/** True when the handle is well-formed and not used by another profile. */
export async function checkHandleAvailable(handle: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('handle_available', { p_handle: handle });
  if (error) throw new Error('handle_check_failed');
  return data === true;
}
