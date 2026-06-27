import { supabase } from './supabaseClient'

export async function fetchWatchlist(userId) {
  const { data, error } = await supabase
    .from('watchlist')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data.map((row) => row.stock)
}

export async function addStock(userId, stock) {
  const { error } = await supabase
    .from('watchlist')
    .insert({ owner_id: userId, stock })

  if (error) throw error
}

export async function removeStock(userId, stock) {
  const { error } = await supabase
    .from('watchlist')
    .delete()
    .eq('owner_id', userId)
    .eq('stock', stock)

  if (error) throw error
}
