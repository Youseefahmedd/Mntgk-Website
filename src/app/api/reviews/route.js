import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json([]);

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });

    const body = await request.json();
    const { data, error } = await supabase.from('reviews').insert([body]).select();
    if (error) throw error;
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });

    const body = await request.json();
    const { id, ...updates } = body;
    const { data, error } = await supabase.from('reviews').update(updates).eq('id', id).select();
    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
