export async function getCustomer(query, variable = {}) {
  const response = await fetch(
    'https://school-demo120.myshopify.com/admin/api/2021-10/graphql.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variable }),
    },
  );
  return response.json();
}
