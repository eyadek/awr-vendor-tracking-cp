export async function updateTripStatus(id: string, status: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error('Failed to update trip status');
  }
}

export async function getTripById(id: string) {
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}`;
  const res = await fetch(url);
  const text = await res.text();
  try {
    const arr = JSON.parse(text);
    return Array.isArray(arr) ? arr[0] : arr;
  } catch (e) {
    console.error('getTripById: Failed to parse JSON. URL:', url, 'Response:', text);
    throw new Error('API did not return valid JSON');
  }
}