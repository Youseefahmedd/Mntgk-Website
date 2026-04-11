import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json([]);

    const { data, error } = await supabase
      .from('messages')
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
    const body = await request.json();
    const { name, email, phone, service_type, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    if (!supabase) {
      // Fallback: just acknowledge the message
      return NextResponse.json({ success: true, message: 'Message received (DB not configured)' }, { status: 201 });
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{ name, email, phone, service_type, message }])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
